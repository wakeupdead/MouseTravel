import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html'
})
export class PinPage {
  pin: string = '____';
  pinDisplay: string;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  inputNumber(digit:string):void {
    if (this.pin[0] != '_') {
      this.pin = '____';
    }
    this.pin = this.pin.substr(1,3) + digit;

  }

  login():void {
    this.navCtrl.setRoot(WelcomePage);
  }

}
