import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Product } from './product';
import { take } from 'rxjs/operator/take';
import {Observable} from 'rxjs/Observable';
import { ShoppingCart } from './shopping-cart';

@Injectable()
export class ShoppingCartService {
 navbarCart: any;
  constructor(private db: AngularFireDatabase) {
  }

  private createCartId() {
    return this.db.list('/shoppingcart').push(
      {dateCreated: new Date().getTime()}
    );
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateId();
    let items$ = this.db.object('/shoppingcart/' + cartId + '/items/' + product.$key);
    items$.take(1).subscribe(item => {
      items$.update({product: product, quantity: (item.quantity || 0) + 1});
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cId = await this.getOrCreateId();
    return this.db.object('/shoppingcart/' + cId).map(x => new ShoppingCart(x.items));
  }

  private async getOrCreateId(): Promise<string> {
    let k = localStorage.getItem('cartId');
    if (k) return k;

    let result = await this.createCartId();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async removeProduct(product: Product) {
    let cartId = await this.getOrCreateId();
    let items$ = this.db.object('/shoppingcart/' + cartId + '/items/' + product.$key);
    items$.take(1).subscribe(item => {
      items$.update({product: product, quantity: (item.quantity || 0) - 1});
    });
  }
}
