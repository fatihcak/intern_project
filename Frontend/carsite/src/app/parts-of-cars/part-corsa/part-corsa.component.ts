import { Component } from '@angular/core';
import { BasketService, Product as BasketProduct } from '../../basket.service';
import { Router } from '@angular/router';
interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity?: number; // ➕ Yeni alan: adet sayısı
}

@Component({
  selector: 'app-part-corsa',
  templateUrl: './part-corsa.component.html',
  styleUrls: ['./part-corsa.component.css'],
})
export class PartCorsaComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 61,
      name: 'AVORTEX - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-avortex-296.png',
      price: 100,
    },
    {
      id: 62,
      name: 'ELRING - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-elring-403730.png',
      price: 110,
    },
    {
      id: 63,
      name: 'ELWIS - Royal Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-elwis-royal-1642629.png',
      price: 120,
    },
    {
      id: 64,
      name: 'GLASER - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-glaser-p76662-00.png',
      price: 130,
    },
    {
      id: 65,
      name: 'GLYCO - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-glyco-rpa5041.png',
      price: 140,
    },
    {
      id: 66,
      name: 'KRAFTVOLL - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-kraftvoll-12010337.png',
      price: 150,
    },
    {
      id: 67,
      name: 'PAYEN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-payen-pa5041.png',
      price: 160,
    },
    {
      id: 68,
      name: 'REINZ - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-reinz-703130600.png',
      price: 170,
    },
    {
      id: 69,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-skt-4s025v.png',
      price: 180,
    },
    {
      id: 70,
      name: 'TOPRAN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-topran-107-502.png',
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
