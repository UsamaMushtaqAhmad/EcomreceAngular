import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../user/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css'],
  standalone: false
})
export class ProductUploadComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: null,
    isHotSeller: false
  };

  selectedFile: File | null = null;
  categories: any[] = [];

  constructor(private productService: ProductService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('Name', this.product.name);
    formData.append('Description', this.product.description);
    formData.append('Price', this.product.price.toString());
    formData.append('Stock', this.product.stock.toString());
    formData.append('CategoryId', this.product.categoryId);
    formData.append('IsHotSeller', this.product.isHotSeller.toString());

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this.http.post('https://localhost:7087/api/products', formData)
      .subscribe({
        next: () => alert('✅ Product uploaded successfully'),
        error: () => alert('❌ Failed to upload product')
      });
  }
}
