import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../models/user';


@Injectable()
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;
  private usersListSnapshot: User[];

  private user$: Observable<firebase.User>;
  private userDetails: firebase.User = undefined;


  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('appUsers');
    this.usersCollection.valueChanges().subscribe(res => {
      console.log('User profiles:', res);
      this.usersListSnapshot = res;
    });

    this.user$ = afAuth.authState;
    this.user$.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('Logged User: ', this.userDetails);

          // add user to users table to store photo URL
          this.afs.collection<User>('appUsers', ref => ref.where('uid', '==', user.uid))
          .ref.get()
          .then(res => {
            if (res.empty) {
              this.usersCollection.add({
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName });
            }
          });

      }
      });



   }

  getUserProfile(uid: string): User {
    return this.usersListSnapshot.find(value => value.uid === uid);
  }

  login() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {

    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.user$;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
