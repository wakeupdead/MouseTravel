import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'list'
    },
    {
      title: 'Chat',
      url: '/chat',
      icon: 'list'
    }
  ];

  public user$: Observable<User>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();

    // Handle auth state changes
    this.userService.getAuthState().subscribe(
      /* (isAuthenticated) => {
        if (isAuthenticated) {
          this.nav.setRoot(TabsPage);
        } else {
          this.nav.setRoot(LoginPage);
        }
      } */
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.user$ = this.userService.getUserState();
    });
  }


  logout() {
    this.userService.logout().then(function() {
      // Sign-out successful.
      // this.loggingService.log(this.logoutSuccessString, true);
    }).catch(function(error) {
      // An error happened.
      this.loggingService.logError(error);
    });
    // this.nav.setRoot(FIRST_RUN_PAGE);

  }
}
