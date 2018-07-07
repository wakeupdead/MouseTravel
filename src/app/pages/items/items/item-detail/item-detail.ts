import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-item-detail',
  templateUrl: 'item-detail.html',
  styleUrls: ['item-detail.scss'],
})
export class ItemDetailPage {

  public item: Item;

  constructor(private route: ActivatedRoute){

  }

  ionViewWillEnter() {
    let id = this.route.snapshot.paramMap.get('id');
    // this.item = this.todoService.getTodo(id);
  }


  /**
   * Delete an item from the list of items.
   */
  deleteItem() {
    // this.itemsService.delete(this.item);
    // this.navCtrl.pop();
  }

}
