import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable()
export class LoggingService {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  /* log(message: string, showToast: boolean) {
    console.log('LOG', message);
    if (showToast) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

  }

  logError(message: string) {
    console.log('LOG', message);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    // alert.present();
  } */

}
