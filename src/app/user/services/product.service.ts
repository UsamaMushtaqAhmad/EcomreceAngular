import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7087/api';

  constructor(private http: HttpClient) {}

  // ✅ Correct endpoint for categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category`);
  }

  // ✅ Correct endpoint for products by category
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }


  // product.service.ts
getHotSellers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/products/hotsellers`);
}

getNewArrivals(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/products/latest`);
}

}
