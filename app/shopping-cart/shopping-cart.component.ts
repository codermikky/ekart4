import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
count: number;
cart;
productArray: Array<any> = [];
  constructor( private shoppincartservice: ShoppingCartService) {
  }

  async ngOnInit() {
   let cart$ =  await this.shoppincartservice.getCart();
     cart$.subscribe(
      cart => {
     this.updatecart(cart);
        this.count = 0;
        for ( let productid in cart.items ) {
          this.count += cart.items[productid].quantity;
        }
      }
     );
  }

  updatecart(cart) {
 this.cart = cart.items;
 for ( let x in this.cart) {
   this.productArray.push(this.cart[x].product);
 }
  }

}
