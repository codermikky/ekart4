import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }
  getCategories() {
   return this.db.list('/categories', {query: {orderByChild: 'name'}
   });
  }
  createProduct(product) {
    this.db.list('/products').push(product);
  }
  getProducts() {
    return this.db.list('/products');
  }
  getProductById(productId) {
    return this.db.object('/products/' + productId);
  }
  updateProduct(product, productId){
   return this.db.object('/products/' + productId).update(product);
  }
  deleteProduct(productId){
    return this.db.object('/products/'+ productId ).remove();
  }
}
