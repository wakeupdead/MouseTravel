import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'List',
      url: '/items',
      icon: 'list'
    },
    {
      title: 'Chat',
      url: '/chat',
      icon: 'chatbubbles'
    },
    {
      title: 'Settings',
      url: '/tabs',
      icon: 'cog'
    }
  ];

  public user$: Observable<User>;

  constructor(
    private router: Router,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();

    // Handle auth state changes
    this.userService.getAuthState().subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/chat');
        } else {
          this.router.navigateByUrl('/login');
        }
      }
    );

    this.user$ = this.userService.getUserState();
  }

  initializeApp() {
    this.statusBar.styleDefault();

      const isAvailable = Capacitor.isPluginAvailable('SplashScreen');

      if (!isAvailable) {
        // ...
      } else {
        SplashScreen.hide();
      }


      // this.user$ = this.userService.getUserState();
  }


  logout() {
    this.userService.logout().then(function() {
      // Sign-out successful.
      // this.loggingService.log(this.logoutSuccessString, true);
    }).catch(function(error) {
      // An error happened.
      this.loggingService.logError(error);
    });

  }
}
