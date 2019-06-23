import {ShoppincartItem } from './shoppincart';
export class ShoppingCart {
  dateCreated ?: number;
  count: number;
  items: ShoppincartItem[];
  constructor( items){
    this.items = items;
  }
  totalItems() {
    let count = 0;
    for ( let productid in this.items ) {
      count += this.items[productid].quantity;
    }
    return count;
  }
}
