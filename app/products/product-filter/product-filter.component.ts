import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProductsService} from '../../products.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<any>;
  constructor( private prouctservice: ProductsService) {
    this.categories$ = this.prouctservice.getCategories();
  }

  ngOnInit() {
  }

}
