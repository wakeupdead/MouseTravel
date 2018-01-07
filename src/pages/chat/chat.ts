import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }


}
