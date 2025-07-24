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
  selector: 'app-part-guilia',
  templateUrl: './part-guilia.component.html',
  styleUrls: ['./part-guilia.component.css'],
})
export class PartGuiliaComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 101,
      name: 'EMA - Cam Su Motoru',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/cam-su-motoru-ema-mfk-wp2008.png',
      price: 100,
    },
    {
      id: 102,
      name: 'Rockswell - Cam Su Motoru',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/cam-su-motoru-rockswell-0240184.png',
      price: 110,
    },
    {
      id: 103,
      name: 'Herth Buss - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/hararet-musuru-herth-buss-70511517.png',
      price: 120,
    },
    {
      id: 104,
      name: 'Triton - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/hararet-musuru-triton-tmp0275t.png',
      price: 130,
    },
    {
      id: 105,
      name: 'Payen - Krank Keçesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/krank-kecesi-on-payen-rna5070.png',
      price: 140,
    },
    {
      id: 106,
      name: 'SKT - Krank Keçesi Ön',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/krank-kecesi-on-skt-040944v.png',
      price: 150,
    },
    {
      id: 107,
      name: 'OEK - Map Sensörü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/map-sensoru-oek-223650002r.png',
      price: 160,
    },
    {
      id: 108,
      name: 'Sardes - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/polen-filtresi-sardes-sc3182.png',
      price: 170,
    },
    {
      id: 109,
      name: 'Zenon - Sis Farı Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/sis-fari-on-sag-veya-sol-zenon-fi9516.png',
      price: 180,
    },
    {
      id: 110,
      name: 'Voller - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/yag-filtresi-voller-800.png',
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
