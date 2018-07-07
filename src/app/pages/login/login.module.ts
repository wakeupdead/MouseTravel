import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
