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
  products$!: Observable<Product[]>; 
  private productSettings = new BehaviorSubject<Settings>({ limit: 12, skip: 0 }); 

  constructor(private productService: ProductService) {

    this.products$ = this.productSettings.pipe(

      concatMap((settings) =>
        this.productService.getProducts(settings).pipe(
          map((response) => response.products)
        )
      ),

      scan<Product[], Product[]>(
        (allProducts, newProducts) => [...allProducts, ...newProducts],
        [] 
      ),

      takeWhile((allProducts) => allProducts.length % 12 === 0, true)
    );
  }


  loadMore(): void {
    const currentSettings = this.productSettings.value;
    this.productSettings.next({
      ...currentSettings,
      skip: currentSettings.skip + currentSettings.limit,
    });
  }
}
