import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';
import { Vibration } from '@ionic-native/vibration';
import { HeaderColor } from '@ionic-native/header-color';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Observable } from 'rxjs/Observable';
import { LoggingService } from './services/logging.service';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { SettingsService } from './services/settings.service';
import { TabsPage } from './pages/tabs/tabs';
import { LoginPage } from './pages/login/login';
import { WelcomePage } from './pages/welcome/welcome';
import { ChatService } from '../chat/services/chat.service';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage = WelcomePage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'TabsPage' },
    { title: 'Settings', component: 'SettingsPage' }
  ];

  logoutSuccessString: string;
  user$: Observable<User>;

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settingsService: SettingsService,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public loggingService: LoggingService,
    public userService: UserService,
    private badge: Badge,
    private vibration: Vibration,
    private headerColor: HeaderColor,
    private localNotifications: LocalNotifications,
    chatService: ChatService
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('cordova')) {
        // Header color
        headerColor.tint('E91E63');

        // Badges, Vibration, Notifications
        if (!badge.hasPermission()) {
          badge.registerPermission();
        }
        if (!localNotifications.hasPermission()) {
          localNotifications.registerPermission();
        }
        badge.clear();
        chatService.query().subscribe(() => {
          badge.increase(1);
          vibration.vibrate(500);
          localNotifications.isPresent(1).then(res => {
            if (!res) {
              localNotifications.schedule({
                id: 1,
                text: 'New messages in the chat',
                led: 'E91E63'
              });
            }
          });
        });
      }

      // App start
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

    this.user$ = this.userService.getUserState();
    // Handle auth state changes
    this.userService.getAuthState().subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.nav.setRoot(TabsPage);
        } else {
          this.nav.setRoot(LoginPage);
        }
      }
    );
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT', 'LOGOUT_SUCCESS']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
      this.logoutSuccessString = values['LOGOUT_SUCCESS'];
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
