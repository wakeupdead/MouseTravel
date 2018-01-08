import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';
import { firebaseConfig } from './app.firebase.config';
import { UserService } from './services/user.service';
import { LoggingService } from './services/logging.service';
import { AppStoreModule } from './store/app-store.module';
import { SettingsService } from './services/settings.service';
import { ApiService } from './services/api.service';
import { ChatModule } from '../chat/chat.module';
import { ItemsModule } from '../items/items.module';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { LoginPageModule } from './pages/login/login.module';
import { SettingsPageModule } from './pages/settings/settings.module';
import { WelcomePageModule } from './pages/welcome/welcome.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Factory to provide settings with default values
 * @param storage
 */
export function provideSettingsFactory(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new SettingsService(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // NGRX
    AppStoreModule,

    // App pages
    LoginPageModule,
    SettingsPageModule,
    TabsPageModule,
    WelcomePageModule,

    // feature modules
    ChatModule,
    ItemsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ApiService,
    UserService,
    LoggingService,
    { provide: SettingsService, useFactory: provideSettingsFactory, deps: [Storage] },

    Camera,
    SplashScreen,
    StatusBar,
    Facebook,

    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
