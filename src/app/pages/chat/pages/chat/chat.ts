import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../../models/chat-message';
import * as firebase from 'firebase/app';
import { UserService } from '../../../app/services/user.service';
import { ChatService } from '../../services/chat.service';
import { Badge } from '@ionic-native/badge';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public platform: Platform,
    private badge: Badge,
    private localNotifications: LocalNotifications,
  ) {
    this.currentUserUid = firebase.auth().currentUser.uid;
    this.scrollToBottom();
  }

  ionViewDidLoad() {
    this.messages = this.chatService.query();
    // this.textInput.setFocus();

    if (this.platform.is('cordova')) {
      this.badge.clear();
      this.localNotifications.clear(1);
    }

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
    }, 500);
  }

}
