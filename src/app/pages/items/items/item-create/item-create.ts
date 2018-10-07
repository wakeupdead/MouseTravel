import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { Capacitor, Plugins, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-page-item-create',
  templateUrl: 'item-create.html',
  styleUrls: ['item-create.scss'],
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  public isReadyToSave: boolean;

  public item: any;

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public modalCtrl: ModalController
  ) {

    this.form = fb.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  getPicture() {

    const isAvailable = Capacitor.isPluginAvailable('Camera');
    const { Camera } = Plugins;

    if (!isAvailable) {
      // Have the user upload a file instead
      this.fileInput.nativeElement.click();
    } else {
      // Otherwise, make the call:
      Camera.getPhoto({
          quality: 100,
          resultType: CameraResultType.Base64
      }).then((result) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + result.base64Data });
      }).catch((err) => {
          console.log(err);
          console.log('Sorry pal, not going to happen');
      });
    }

  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      const imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')';
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.modalCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    /* if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value); */
  }
}
