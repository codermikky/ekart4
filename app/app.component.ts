import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import { Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private auth: AuthService, private router: Router, private users: UserService ){
    this.auth.user$.subscribe(user => {
      if(!user) return;

        this.users.save(user);
        let returnUrl = localStorage.getItem('returnUrl');

        if (!returnUrl)return;

      this.router.navigateByUrl(returnUrl);
      localStorage.removeItem('returnUrl');
    });
  }
}
