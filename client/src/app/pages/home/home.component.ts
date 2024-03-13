import { Component, OnInit } from '@angular/core';
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

// itni items per row and : utni height
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
// object has id number that is key and its value is number

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols]; // now height is 335 as cols is 3 but neeche once you update yahan sy bhi update
  count = '12';
  sort = 'desc';
  // value is string
  category: string | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    // this.getProducts();
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
}
