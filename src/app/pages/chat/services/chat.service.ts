import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat-message';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {

  private messagesCollection: AngularFirestoreCollection<ChatMessage>;
  private messageDoc: AngularFirestoreDocument<ChatMessage>;

  constructor(private readonly afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection<ChatMessage>('chatMessages', ref => ref.orderBy('createdAt'));

  }



  query(params?: any): Observable<any[]> {
    // return this.messagesCollection.valueChanges();
    return this.messagesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
    })
  }

  add(item: ChatMessage) {
    this.messagesCollection.add(item);
  }


}
