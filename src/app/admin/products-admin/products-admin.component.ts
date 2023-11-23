import { Component, OnInit } from '@angular/core';
import { Product } from 'app/interfaces/products.interface';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
  private apiUrl = 'assets/products.json';
  products: Product[] = [];
  visible: boolean = false;

  newProduct: Product = {
    id: 0,
    code: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    inventoryStatus: '',
    category: '',
    image: '',
    rating: 0
  };

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
   
  }
  getProducts(){
    this.productService.getProducts().subscribe(
      (res: Product[]) => {
        this.products = res["data"];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      () => {
        alert('Le produit a été ajouté avec succès.');
        this.visible = false;
        this.getProducts();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }

  updateProduct(product: Product) {
    this.newProduct = { ...product };
  }

  deleteProduct(product: Product) {
    console.log(product.name)
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer le produit "${product.name}" ?`);

    if (confirmDelete) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          alert('Le produit a été supprimé avec succès.');
          this.getProducts();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit:', error);
        }
      );
    }
  }

  showDialog() {
    this.visible = true;
  }


}
