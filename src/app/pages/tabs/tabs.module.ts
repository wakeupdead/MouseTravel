import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TabsPage } from './tabs';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage
      }
    ])
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
