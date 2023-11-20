import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { DataViewModule } from 'primeng/dataview';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log(data)
    })
  }
}
