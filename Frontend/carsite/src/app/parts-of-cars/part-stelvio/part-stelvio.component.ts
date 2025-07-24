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
  selector: 'app-part-stelvio',
  templateUrl: './part-stelvio.component.html',
  styleUrls: ['./part-stelvio.component.css'],
})
export class PartStelvioComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 131,
      name: 'Facet - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/hararet-musuru-facet-73239.png',
      price: 500,
    },
    {
      id: 132,
      name: 'FAE - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/hararet-musuru-fae-33485.png',
      price: 520,
    },
    {
      id: 133,
      name: 'Herth Buss - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/hararet-musuru-herth-buss-70511517.png',
      price: 540,
    },
    {
      id: 134,
      name: 'Triton - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/hararet-musuru-triton-tmp0275t.png',
      price: 480,
    },
    {
      id: 135,
      name: 'Zegen - Hararet Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/hararet-musuru-zegen-zntc1034.png',
      price: 510,
    },
    {
      id: 136,
      name: 'GUA - Map Sensörü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/map-sensoru-gua-41578.png',
      price: 600,
    },
    {
      id: 137,
      name: 'Zegen - Map Sensörü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/map-sensoru-zegen-zmps1025.png',
      price: 620,
    },
    {
      id: 138,
      name: 'Sion - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/polen-filtresi-sion-sc5390.png',
      price: 150,
    },
    {
      id: 139,
      name: 'Zenon - Sis Farı Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/sis-fari-on-sag-veya-sol-zenon-fi9516.png',
      price: 800,
    },
    {
      id: 140,
      name: 'Voller - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa_romeo_stelvio/yag-filtresi-voller-800.png',
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
