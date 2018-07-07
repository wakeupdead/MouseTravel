import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../../firebase.config';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { LoggingService } from './services/logging.service';
import { SharedModule } from '../shared/shared.module';
import { StateModule } from './state/state.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),

    SharedModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // NGRX
    StateModule,

    ApiService,
    UserService,
    LoggingService,

  ],
  declarations: [],
  entryComponents: [],
})
export class CoreModule {}
