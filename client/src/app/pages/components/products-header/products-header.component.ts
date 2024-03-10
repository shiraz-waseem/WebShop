import { Component, EventEmitter, Output } from '@angular/core';
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

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [
    // MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    // MatExpansionModule,
    // MatTreeModule,
    // MatListModule,
    // MatToolbarModule,
    // MatTableModule,
    // MatBadgeModule,
    // MatSnackBarModule,
  ],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css',
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 5;

  // return void means not going to return anything
  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    // updating with new sort
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
