import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message';
import { UserService } from 'app/core/services/user.service';
import { ChatService } from '../services/chat.service';
import {auth, firestore} from 'firebase/app';

@Component({
  selector: 'app-page-chat',
  templateUrl: 'chat.html',
  styleUrls: ['chat.scss']
})
export class ChatPage {
  @ViewChild('content') content: Content;
  @ViewChild('textInput') textInput;

  public newMessageText = '';
  public messages$: Observable<ChatMessage[]>;
  public currentUserUid: string;

  constructor(
    public userService: UserService,
    public chatService: ChatService,
  ) {
    // this.currentUserUid = auth().currentUser.uid;
    this.messages$ = this.chatService.query();
  }

  ionViewDidLoad() {
    this.messages$ = this.chatService.query();
    // this.textInput.setFocus();


  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  addMessage() {
    if (this.newMessageText !== '') {
      this.chatService.add({
        message: this.newMessageText,
        author: auth().currentUser.uid,
        createdAt: this.timestamp});
      this.newMessageText = '';
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


}
