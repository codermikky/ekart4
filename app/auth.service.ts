import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {UserService} from './user.service';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable< firebase.User >;
  constructor( private afAuth: AngularFireAuth, private route: ActivatedRoute, private userservice: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$() {
    return this.user$
      .switchMap(user => {
        if (user) {return this.userservice.get(user.uid);
        }

        return Observable.of(null);
      });
  }

}
