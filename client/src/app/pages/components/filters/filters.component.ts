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
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    // MatSidenavModule,
    // MatGridListModule,
    // MatMenuModule,
    // MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    MatExpansionModule,
    // MatTreeModule,
    MatListModule,
    // MatToolbarModule,
    // MatTableModule,
    // MatBadgeModule,
    // MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  categories = ['shoes', 'sports'];
  @Output() showCategory = new EventEmitter<string>();

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
