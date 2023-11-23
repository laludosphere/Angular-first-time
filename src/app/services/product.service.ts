import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from 'app/interfaces/products.interface';
import { catchError, map, concatMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }

  addProduct(newProduct: Product): Observable<any> {
    return this.http.post(this.apiUrl, newProduct);
  }

  updateProduct(updatedProduct: Product): Observable<any> {
    const updateUrl = `${this.apiUrl}/${updatedProduct.id}`;
    return this.http.put(updateUrl, updatedProduct);
  }

  deleteProduct(productId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${productId}`;
    return this.http.delete(deleteUrl);
  }

 
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
