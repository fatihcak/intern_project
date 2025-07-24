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
  selector: 'app-part-sedan',
  templateUrl: './part-sedan.component.html',
  styleUrls: ['./part-sedan.component.css'],
})
export class PartSedanComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 121,
      name: 'GVA - Çamurluk Sinyali Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/camurluk-sinyali-sag-gva-2029672.png',
      price: 100,
    },
    {
      id: 122,
      name: 'PUGA - Çamurluk Sinyali Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/camurluk-sinyali-sag-puga-pg-cms033.png',
      price: 110,
    },
    {
      id: 123,
      name: 'Ayhanoto - Çamurluk Sinyali Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/camurluk-sinyali-sol-ayhanoto-a7665.png',
      price: 120,
    },
    {
      id: 124,
      name: 'Dekar - Çamurluk Sinyali Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/camurluk-sinyali-sol-dekar-dk0303.png',
      price: 130,
    },
    {
      id: 125,
      name: 'PUGA - Çamurluk Sinyali Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/camurluk-sinyali-sol-puga-pg-cms034.png',
      price: 115,
    },
    {
      id: 126,
      name: 'FROW - Fren Hortumu Arka Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/fren-hortumu-arka-sag-veya-sol-frow-1941112006.png',
      price: 140,
    },
    {
      id: 127,
      name: 'AFT - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/krank-kecesi-on-aft-55186757.png',
      price: 150,
    },
    {
      id: 128,
      name: 'BGA - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/krank-kecesi-on-bga-os8321.png',
      price: 155,
    },
    {
      id: 129,
      name: 'Bitapart - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/krank-kecesi-on-bitapart-bfi231005.png',
      price: 160,
    },
    {
      id: 130,
      name: 'FIAT Orjinal - Krank Kecesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/FIAT_Egea_Sedan_urun_resimleri/krank-kecesi-on-fiat-orjinal-55186757.png',
      price: 200,
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
