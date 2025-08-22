import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: false
})
export class ProductsComponent implements OnInit {
  categoriesWithProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategoriesWithProducts();
  }

  loadCategoriesWithProducts() {
    this.productService.getCategories().subscribe(cats => {
      this.categoriesWithProducts = []; // reset
      cats.forEach((cat: any) => {
        this.productService.getProductsByCategory(cat.categoryId).subscribe(products => {
          this.categoriesWithProducts.push({
            ...cat,
            products: products
          });
        });
      });
    });
  }
}
