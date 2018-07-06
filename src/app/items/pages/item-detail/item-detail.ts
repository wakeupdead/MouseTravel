import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: Item;

  constructor(public navCtrl: NavController, navParams: NavParams, public itemsService: ItemsService) {
    this.item = navParams.get('item') || itemsService[0];
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem() {
    this.itemsService.delete(this.item);
    this.navCtrl.pop();
  }

}
