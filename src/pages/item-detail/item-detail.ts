import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: Item;

  constructor(public navCtrl: NavController, navParams: NavParams, public items: Items) {
    this.item = navParams.get('item') || items[0];
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem() {
    this.items.delete(this.item);
    this.navCtrl.pop();
  }

}
