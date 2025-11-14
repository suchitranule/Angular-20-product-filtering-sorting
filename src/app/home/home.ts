import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product-service';
import { TruncatePipe } from '../truncate-pipe';
import { Subscription } from 'rxjs';

interface product {
  id:number,
  title: string,
  description:string,
  price:number,
  category:string
}

@Component({
  selector: 'app-home',
  imports: [CommonModule , TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  public productService = inject(ProductService);
  private subscription:Subscription|undefined;
  public selectedCategory:string ="";
  public products:product[]=[];
  private allProduct:product[]=[];
  private sortColumDir:{[key:string]:boolean} = {'id':true,'title':true,'description':true,'price':true};


  ngOnInit() {
    this.subscription = this.productService.getProducts().subscribe((data)=> {
      this.products =data['products'];
      this.allProduct = this.products;
      console.log(this.products);
    });

   
  }

   onCategoryChange(event:Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const filteredData = this.allProduct.filter(item => item.category==selectedCategory);
    this.products=selectedCategory == 'All' ? this.allProduct: filteredData;
    console.log(selectedCategory);
  }

  sortColumn(col:string) {
    console.log(col);
    this.sortColumDir[col] = !this.sortColumDir[col];
    let sortValue = 1
    this.products.sort((a:any,b:any)=> {
      console.log(a[col]);
      
      sortValue =this.sortColumDir[col]? -1 : 1; 
      console.log(this.sortColumDir[col] , '', sortValue);
       // Handle numbers
    if (typeof a[col] === 'number' && typeof b[col] === 'number') {
      console.log("number");
      return (a[col] - b[col]) * sortValue;
    } else {
      a= a[col].toString().toLowerCase();
      b= b[col].toString().toLowerCase();
      console.log("string");
      return a.localeCompare(b)* sortValue; //handles string
    }
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
