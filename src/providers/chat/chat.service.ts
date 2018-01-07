import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../../models/chat-message';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  private messagesCollection: AngularFirestoreCollection<ChatMessage>;
  private messageDoc: AngularFirestoreDocument<ChatMessage>;

  constructor(private readonly afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection<ChatMessage>('chatMessages', ref => ref.orderBy('createdAt'));

  }



  query(params?: any): Observable<any[]> {
    return this.messagesCollection.valueChanges();

  }

  add(item: ChatMessage) {
    this.messagesCollection.add(item);
  }


}
