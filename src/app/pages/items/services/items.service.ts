import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemsService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Item>('items');

  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  query(params?: any): Observable<any[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
    })
  );
  }

  get(id): Observable<any> {
    return this.afs.doc<Item>('items/' + id).snapshotChanges().pipe(
        map(actions => {
          const data = actions.payload.data();
          const id = actions.payload.id;
          return { id, ...data};
      })
    );
  }

  add(item: Item) {
    item.createdAt = this.timestamp;
    item.updatedAt = this.timestamp;
    this.itemsCollection.add(item);
  }

  delete(item: Item) {
    this.itemDoc = this.afs.doc<Item>('items/' + item.id);
    this.itemDoc.delete();
  }

}
