import { Component } from '@angular/core';
import { BasketService, Product as BasketProduct } from '../../basket.service';
import { Router } from '@angular/router';
interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

@Component({
  selector: 'app-part-astra',
  templateUrl: './part-astra.component.html',
  styleUrls: ['./part-astra.component.css'],
})
export class PartAstraComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 21,
      name: 'AVORTEX - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-avortex-296.png',
      price: 100,
    },
    {
      id: 22,
      name: 'ZEGEN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-corteco-49472013.png',
      price: 110,
    },
    {
      id: 23,
      name: 'KRAFTVOLL - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-elring-403730.png',
      price: 120,
    },
    {
      id: 24,
      name: 'TOPRAN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-elwis-royal-1642657.png',
      price: 130,
    },
    {
      id: 25,
      name: 'KRAFTVOLL -Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-kraftvoll-12010285.png',
      price: 140,
    },
    {
      id: 26,
      name: 'ELWIS ROYAL - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-kraftvoll-12010337.png',
      price: 150,
    },
    {
      id: 27,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-payen-pa5041.png',
      price: 160,
    },
    {
      id: 28,
      name: 'PAYEN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-skt-4s021v.png',
      price: 170,
    },
    {
      id: 29,
      name: 'ELRING - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-skt-4s025v.png',
      price: 180,
    },
    {
      id: 30,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-topran-107-502.png',
      price: 190,
    },
  ];

  filteredProducts: Product[] = [...this.products];

  onSearch() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  constructor(private basketService: BasketService, private router: Router) {}

  addToCart(product: Product) {
    const quantity = product['quantity'] || 1;
    alert(`${quantity} adet "${product.name}" sepete eklendi.`);
    this.basketService.addToCart(product);
  }

  goToBasket() {
    this.router.navigate(['/basket']);
  }
  selectedProduct: Product | null = null;

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}
