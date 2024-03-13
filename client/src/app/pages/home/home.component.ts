import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsHeaderComponent } from '../components/products-header/products-header.component';
import { FiltersComponent } from '../components/filters/filters.component';
import { ProductBoxComponent } from '../components/product-box/product-box.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

// itni items per row and : utni height
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
// object has id number that is key and its value is number

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatGridListModule,
    // MatMenuModule,
    MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    // MatExpansionModule,
    // MatTreeModule,
    // MatListModule,
    // MatToolbarModule,
    // MatTableModule,
    // MatBadgeModule,
    // MatSnackBarModule,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols]; // now height is 335 as cols is 3 but neeche once you update yahan sy bhi update
  count = '12';
  sort = 'desc';
  // value is string
  category: string | undefined;

  // Once we destroy it finishs we dont want any memory leaks
  productsSubscription: Subscription | undefined;

  products: Product[] | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  // get products
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
