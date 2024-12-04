import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$!: Observable<Product[]>; // Observable for products
  private productSettings = new BehaviorSubject<Settings>({ limit: 12, skip: 0 }); // BehaviorSubject to manage settings

  constructor(private productService: ProductService) {
    // Create the stream for products
    this.products$ = this.productSettings.pipe(
      // Fetch products based on the current settings
      concatMap((settings) =>
        this.productService.getProducts(settings).pipe(
          map((response) => response.products)
        )
      ),
      // Accumulate all fetched products into a single array
      scan<Product[], Product[]>(
        (allProducts, newProducts) => [...allProducts, ...newProducts],
        [] // Start with an empty array
      ),
      // Stop fetching if no products are left
      takeWhile((allProducts) => allProducts.length % 12 === 0, true)
    );
  }

  // Method to load more products
  loadMore(): void {
    const currentSettings = this.productSettings.value;
    this.productSettings.next({
      ...currentSettings,
      skip: currentSettings.skip + currentSettings.limit,
    });
  }
}
