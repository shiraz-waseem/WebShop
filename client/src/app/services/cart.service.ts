import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // default value empty. Now ab jab bhi add huty rhy gy is mein aty rhy gy and kahin bhi chae we will do subscribe and get
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}
  // once added we can successfully tells its added is lia import kia uske through

  addToCart(item: CartItem) {
    // Destructing and accessing behaviour subject with value
    const items = [...this.cart.value.items];

    // we want ke same product hu tw multiple time is ke andr add na krte rhy in items to quantity mein increment krdein
    const itemInCart = items.find((_item) => _item.id === item.id); // second is on addToCart mein jo item getting
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    // every component subscribe can get
    // this.cart.next{{items:items}};      just remove key as same ha
    this.cart.next({ items });
    // 3 arguments third one is object
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }
}
