import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ItemCreatePage } from '../item-create/item-create';

@Component({
  selector: 'app-page-item-list',
  templateUrl: 'item-list.html',
  styleUrls: ['item-list.scss'],
})
export class ItemListPage implements OnInit {

  public items$: Observable<Item[]>;

  constructor(
    public router: Router,
    public itemsService: ItemsService,
    public modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.items$ = this.itemsService.query();
  }


  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  async addItem() {
    const modal = await this.modalCtrl.create({
        component: ItemCreatePage
    });
    return await modal.present();

  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.itemsService.delete(item);
  }

}
