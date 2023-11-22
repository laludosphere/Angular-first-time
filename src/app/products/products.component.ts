import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'app/interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  sortField: string;
  sortOrder: any;
  sortOptions = [];
  sortKey: string;
  searchValue: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      const options = Object.keys(data.data[0])
      const optionsString = options.filter(op => typeof data.data[0][op] === 'string')
      this.sortOptions = optionsString;

    })
  }

  onSearchInputChange() {
    if (this.searchValue) {
      if (this.sortKey) {
        // Si sortKey est défini, filtre uniquement sur les valeurs de la sortKey
        this.products = this.products.filter(product =>
          typeof product[this.sortKey] === 'string' &&
          product[this.sortKey].toLowerCase().includes(this.searchValue.toLowerCase())
        );
      } else {
        // Si sortKey n'est pas défini, filtre sur toutes les valeurs de chaque produit
        this.products = this.products.filter(product =>
          Object.values(product).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(this.searchValue.toLowerCase())
          )
        );
      }
    } else {
      // Si la valeur de recherche est vide, réinitialisez la liste des produits (chargez la liste complète)
      this.loadProducts();
    }
  }
  

  onSortChange(event){
    if(event.value === this.sortKey){
      
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
    });
  }
}
