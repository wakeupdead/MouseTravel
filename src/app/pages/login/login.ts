import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
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

