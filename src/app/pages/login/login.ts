import { Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { LoggingService } from 'app/core/services/logging.service';

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
})
export class LoginPage {

  constructor(
    public userService: UserService,
    public loggingService: LoggingService) {

  }

  // Attempt to login in through our User service
  login() {

    this.userService.loginFacebook().then((resp) => {
        this.loggingService.log('Logged in', true);
      }, (err) => {
        // Unable to log in
        this.loggingService.logError('Login error --> ' + JSON.stringify(err));
      });

  }

}
