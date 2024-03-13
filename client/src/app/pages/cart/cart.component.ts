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
import { Cart, CartItem } from '../../models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    // MatSidenavModule,
    // MatGridListModule,
    // MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    // MatExpansionModule,
    // MatTreeModule,
    // MatListModule,
    // MatToolbarModule,
    MatTableModule,
    // MatBadgeModule,
    // MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  // cart: Cart = { items: [] };

  // for now lets create a default cart
  cart: Cart = {
    items: [],
  };

  // displaying columns      string[] ki jagah we can write Array<string>
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  // This property will recieve cart array
  dataSource: Array<CartItem> = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  // getTotal(items: CartItem[]): number {
  //   return items.map((item)=>item.price*item.quantity)
  //   // and add all of them
  //   .reduce((prev,current)=>prev+current, 0)
  // }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
