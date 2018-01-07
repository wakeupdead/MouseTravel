import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';


@Injectable()
export class User {


  private user$: Observable<firebase.User>;
  private userDetails: firebase.User = undefined;


  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
    this.user$.subscribe(
            (user) => {
              if (user) {
                this.userDetails = user;
                console.log(this.userDetails);
              } else {
                this.userDetails = undefined;
              }
            }
          );
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
