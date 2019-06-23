import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms'
import {ProductsService} from '../../products.service';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';
import {Product} from '../../product';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  productForm: FormGroup;
  product: Product
  price: number;
  subscription: Subscription;
  id: string;
  constructor( private fb: FormBuilder, private productservice: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = this.productservice.getCategories();
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productservice.getProductById(this.id)
        .take(1).subscribe(x => {
          this.productForm.setValue(x, {onlySelf: true});
          this.product = x;
        }
      );
    }
      }

  ngOnInit() {
     this.updateChanges();
  }
  addNewProduct(product) {
   if (this.id) { this.productservice.updateProduct(product, this.id); }

   else this.productservice.createProduct(product);
    this.router.navigate(['/admin/products']);
  }
  createForm() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)] ],
      category: ['', Validators.required ],
      imageUrl: ['', Validators.required ]
    });
  }
  updateChanges() {
    const formChanges$ = this.productForm.valueChanges;


    this.subscription = formChanges$.subscribe(
      x => {
        this.product = x;
      }
    );
  }
  deleteProduct() {
    if (!confirm('are you sure you want to delete this product')) return;

      this.productservice.deleteProduct(this.id);
      this.router.navigate(['admin/products']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
