import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { ItemsService } from './services/items.service';
import { ItemListPage } from './items/item-list/item-list';
import { ItemDetailPage } from './items/item-detail/item-detail';
import { ItemCreatePage } from './items/item-create/item-create';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', component: ItemListPage},
          { path: 'detail', component: ItemDetailPage},
          { path: 'create', component: ItemCreatePage}
        ]
      }
    ])
  ],
  declarations: [
    ItemListPage,
    ItemDetailPage,
    ItemCreatePage
  ],
  providers: [
    ItemsService
  ]
})
export class ItemsModule { }
