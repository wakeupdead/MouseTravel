import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FIRST_RUN_PAGE, MAIN_PAGE, LOGIN_PAGE } from '../pages/pages';
import { Settings } from '../providers/providers';
import { Observable } from 'rxjs/Observable';
import { LoggingService } from './services/logging.service';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage = FIRST_RUN_PAGE;

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
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public loggingService: LoggingService,
    public userService: UserService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

    this.user$ = this.userService.getUserState();
    // Handle auth state changes
    this.userService.getAuthState().subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.nav.setRoot(MAIN_PAGE);
        } else {
          this.nav.setRoot(LOGIN_PAGE);
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
