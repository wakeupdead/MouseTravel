import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Items {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Item>('items');

    // log all changes in collection
    this.itemsCollection.auditTrail().subscribe(console.log);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  query(params?: any): Observable<Item[]> {
    return this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const meta = a.payload.doc.metadata;
        return { id, meta, ...data};
      });
    });
  }

  add(item: Item) {
    const timestamp = this.timestamp;
    this.itemsCollection.add({
      ...item,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

  delete(item: Item) {
    this.itemDoc = this.afs.doc<Item>('items/' + item.id);
    this.itemDoc.delete();
  }

}
