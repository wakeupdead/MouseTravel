import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../../models/chat-message';
import { ChatService, UserService } from '../../providers/providers';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild('content') content: Content;
  @ViewChild('textInput') textInput;

  newMessageText: string = '';
  messages: Observable<ChatMessage[]>;
  currentUserUid: any;

  constructor(public userService: UserService, public chatService: ChatService) {
    this.currentUserUid = firebase.auth().currentUser.uid;
    this.scrollToBottom();
  }

  ionViewDidLoad() {
    this.messages = this.chatService.query();
    // this.textInput.setFocus();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  addMessage() {
    if (this.newMessageText !== '') {
      this.chatService.add({
        message: this.newMessageText,
        author: firebase.auth().currentUser.uid,
        createdAt: this.timestamp});
      this.content.scrollToBottom();
      this.newMessageText = '';
      this.textInput.setFocus();
    }

  }

  getUserPhotoUrl(uid: string): string {
    let profile = this.userService.getUserProfile(uid);
    if (profile) {
      return profile.photoURL;
    }
    return undefined;
  }

  getUserDisplayName(uid: string): string {
    let profile = this.userService.getUserProfile(uid);
    if (profile) {
      return profile.displayName;
    }
    return undefined;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
