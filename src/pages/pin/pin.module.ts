import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PinPage } from './pin';

@NgModule({
  declarations: [
    PinPage,
  ],
  imports: [
    IonicPageModule.forChild(PinPage),
    TranslateModule.forChild()
  ],
  exports: [
    PinPage
  ]
})
export class PinPageModule { }
