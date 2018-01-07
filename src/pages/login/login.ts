import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User, LoggingService } from '../../providers/providers';
import { MAIN_PAGE } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // Our translated text strings
  private loginSuccessString: string;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public loggingService: LoggingService,
    public translateService: TranslateService) {

    this.translateService.get(['LOGIN_ERROR', 'LOGIN_SUCCESS']).subscribe((values) => {
      this.loginErrorString = values['LOGIN_ERROR'];
      this.loginSuccessString = values['LOGIN_SUCCESS'];
    });
  }

  // Attempt to login in through our User service
  login() {
    this.user.login().then((resp) => {
      this.navCtrl.setRoot(MAIN_PAGE);
      this.loggingService.log(this.loginSuccessString + resp.user.displayName, true);
    }, (err) => {
      // Unable to log in
      this.loggingService.logError(this.loginErrorString);
    });
  }
}
