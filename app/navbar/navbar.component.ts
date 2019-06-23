import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from '../model/AppUser';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   appUser: AppUser;
   shoppingCartNumberCount: number ;
  constructor( private auth: AuthService, private shoppingcartservice: ShoppingCartService ) {
    this.auth.appUser$.subscribe(user => this.appUser = user);
  }

  async ngOnInit() {
   let cart$ = await this.shoppingcartservice.getCart();
   cart$.subscribe(cart => {
     this.shoppingCartNumberCount = 0;
     for ( let productid in cart.items ) {
       this.shoppingCartNumberCount += cart.items[productid].quantity;
     }
   });
  }
  logout() {
    this.auth.logout();
  }
}
