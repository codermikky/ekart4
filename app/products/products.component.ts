import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../product';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../shopping-cart.service';
import {Subscription} from 'rxjs/Subscription';
import { ShoppingCart} from '../shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$: Observable<any>;
products: Array<Product> = [];
filteredProducts: Array<Product> = [];
categories$: Observable<any>;
cart ;

subscription: Subscription;
category: string;
  constructor(private prouctservice: ProductsService, private route: ActivatedRoute,
              private shoppingcartservice: ShoppingCartService ) {
  this.prouctservice.getProducts()
    .switchMap(
    products => {
      this.products = products;
      return route.queryParamMap;
    })
    .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ? this.products.filter(x => x.category === this.category)
          : this.products;
    });
  this.categories$ = this.prouctservice.getCategories();

  }
   async ngOnInit() {
  ( await this.shoppingcartservice.getCart()).subscribe( cart =>{
    this.cart = cart;
    this.shoppingcartservice.navbarCart = cart;
  });
  }
  addToCart(product: Product) {

    this.shoppingcartservice.addToCart(product);
      }
  getQuantity(p) {
    if ( !this.cart) {
      return 0;
    }
 let currentcart =  this.cart.items[p];
 return currentcart ? currentcart.quantity : 0;
  }
  removeFromCart(product) {
    this.shoppingcartservice.removeProduct(product);
  }


}
