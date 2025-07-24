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
  selector: 'app-part-cross',
  templateUrl: './part-cross.component.html',
  styleUrls: ['./part-cross.component.css'],
})
export class PartCrossComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 71,
      name: 'Bitapart - Çamurluk Sinyali Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/camurluk-sinyali-sag-bitapart-bre309184.png',
      price: 100,
    },
    {
      id: 72,
      name: 'BSG - Çamurluk Sinyali Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/camurluk-sinyali-sag-bsg-bsg-25-810-009.png',
      price: 110,
    },
    {
      id: 73,
      name: 'Puga - Çamurluk Sinyali Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/camurluk-sinyali-sag-puga-pg-cms033.png',
      price: 120,
    },
    {
      id: 74,
      name: 'BSG - Çamurluk Sinyali Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/camurluk-sinyali-sol-bsg-bsg-25-810-008.png',
      price: 115,
    },
    {
      id: 75,
      name: 'PUGA - Çamurluk Sinyali Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/camurluk-sinyali-sol-puga-pg-cms034.png',
      price: 125,
    },
    {
      id: 76,
      name: 'FROW - Fren Hortumu Arka Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/fren-hortumu-arka-sag-veya-sol-frow-1941112006.png',
      price: 130,
    },
    {
      id: 77,
      name: 'AFT - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/krank-kecesi-on-aft-55186757.png',
      price: 140,
    },
    {
      id: 78,
      name: 'BGA - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/krank-kecesi-on-bga-os8321.png',
      price: 145,
    },
    {
      id: 79,
      name: 'Bitapart - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/krank-kecesi-on-bitapart-bfi231005.png',
      price: 150,
    },
    {
      id: 80,
      name: 'FIAT Orjinal - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Crosss_urun_resimleri/krank-kecesi-on-fiat-orjinal-55186757.png',
      price: 160,
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
