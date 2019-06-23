import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../products.service';
import {Observable} from 'rxjs/Observable';
import {Product} from '../../product';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  filteredProducts: Array<Product>;
  subscription: Subscription;
  constructor(private productservice: ProductsService) {
    this.subscription = this.productservice.getProducts().subscribe(
      products => this.filteredProducts = this.products = products
    )
  }

  ngOnInit() {  }

  search(word: string) {
      this.filteredProducts = (word) ? this.products.filter(x => x.title.toLowerCase().includes(word.toLowerCase())) :
      this.filteredProducts = this.products;
  }

  handleSortEvent(event) {
   switch (event) {
     case 'name': {
       this.filteredProducts.sort( (a, b) => {
         if (a.title > b.title) {
           return 1;
         }
         if (a.title < b.title) {
           return -1;
         }
       });
      break;
     }
     case 'low': {
       this.filteredProducts.sort( (a, b) => {
         if (a.price > b.price) {
           return 1;
         }
         if (a.price < b.price) {
           return -1;
         }
       });
       break;
     }
     case 'high': {
       this.filteredProducts.sort( (a, b) => {
         if (a.price < b.price) {
           return 1;
         }
         if (a.price > b.price) {
           return -1;
         }
       });
      break;
     }
   }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
