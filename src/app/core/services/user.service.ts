import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../models/user';
import { Platform } from '@ionic/angular';
import {auth} from 'firebase/app';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  private usersCollectionSub: any;
  private userDoc: AngularFirestoreDocument<User>;
  private usersListSnapshot: User[];

  private currentUserDetails: firebase.User = undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    // loggingService: LoggingService
    // private facebook: Facebook,
    private platform: Platform
  ) {


      this.usersCollection = this.afs.collection<User>('appUsers');
      afAuth.authState.subscribe(
        (user) => {
          if (user) {
            this.currentUserDetails = user;
            console.log('Logged User: ', this.currentUserDetails);
            this.addUserProfile(user);

            this.usersCollectionSub = this.usersCollection.valueChanges().subscribe(res => {
              console.log('User profiles:', res);
              this.usersListSnapshot = res;
            });
          } else {
            if (this.usersCollectionSub) { this.usersCollectionSub.unsubscribe(); }
          }
        });


   }

  addUserProfile(user: firebase.User) {
    // add user to users table to store photo URL
    this.afs.collection<User>('appUsers', ref => ref.where('uid', '==', user.uid))
    .ref.get()
    .then(res => {
      if (res.size === 0) {
        this.usersCollection.add({
          uid: user.uid,
          photoURL: user.providerData[0].photoURL,
          displayName: user.displayName });
      }
    });
  }

  getUserProfile(uid: string): User {
    return this.usersListSnapshot != undefined ?
      this.usersListSnapshot.find(value => value.uid === uid) :
      undefined;
  }

  getUserProfilesList(): Observable<User[]> {
    return this.usersCollection.valueChanges();
  }

  loginFacebook() {

    /* if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else { */
      return this.afAuth.auth
        .signInWithPopup(new auth.FacebookAuthProvider());
    /* } */

    // this.afAuth.auth
    //   .signInWithRedirect(new firebase.auth.FacebookAuthProvider());

    // this.afAuth.auth.getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     let token = result.credential.accessToken;
    //   }
    //   // The signed-in user info.
    //   let user = <firebase.User>result.user;

    //   this.addUserProfile(user);

    //   return user.displayName;

    // }).catch(function(error) {
    //   // Handle Errors here.
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
    //   // The email of the user's account used.
    //   let email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   let credential = error.credential;

    //   // this.loggingService.logError(error);
    //   console.log(error);
    // });
    // return undefined;
  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {

    return this.afAuth.auth.signOut();
  }

  getUserState(): Observable<User> {
    return this.afAuth.user.pipe(map(x => {
      if (x) {
        return {
          uid: x.uid,
          photoURL: x.providerData[0].photoURL,
          displayName: x.displayName
        };
      }
      return undefined;
    }));
  }

  getAuthState() {
    return this.afAuth.user.pipe(map(x => {
      return (x) ? true : false;
    }));
  }

  getUserDetails() {
    return this.currentUserDetails;
  }
}
