import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface product {
  id:number,
  title: string,
  description:string,
  price:number,
  category:string
}


@Injectable({
  providedIn: 'root',
})


export class ProductService {
  private url ="https://dummyjson.com/products";
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<{ products: product[] }>(this.url);
  }

  deleteProductById(id:number) {
    console.log(`$(this.url)/$(id)`);
    return this.http.delete(`$(this.url)/$(id)`);
  }
}
