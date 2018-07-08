import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-item-detail',
  templateUrl: 'item-detail.html',
  styleUrls: ['item-detail.scss'],
})
export class ItemDetailPage {

  public item$: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) { }

  ionViewWillEnter() {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.itemsService.get(params.get('id'));
      }));
  }


  /**
   * Delete an item from the list of items.
   */
  deleteItem() {
    // this.itemsService.delete(this.item);
    // this.navCtrl.pop();
  }

}
