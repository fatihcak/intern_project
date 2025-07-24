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
  selector: 'app-part-renegade',
  templateUrl: './part-renegade.component.html',
  styleUrls: ['./part-renegade.component.css'],
})
export class PartRenegadeComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 111,
      name: 'Frow - Fren Hortumu Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/fren-hortumu-on-sag-veya-sol-frow-3841112001.png',
      price: 500,
    },
    {
      id: 112,
      name: 'Zegen - Isıtma Bujisi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/isitma-bujisi-zegen-zgp046.png',
      price: 300,
    },
    {
      id: 113,
      name: 'Maher - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/polen-filtresi-maher-30281.png',
      price: 200,
    },
    {
      id: 114,
      name: 'Carringo - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-filtresi-carringo-75701.png',
      price: 250,
    },
    {
      id: 115,
      name: 'Grat - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-filtresi-grat-23203.png',
      price: 260,
    },
    {
      id: 116,
      name: 'Kruger - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-filtresi-kruger-kof18002.png',
      price: 270,
    },
    {
      id: 117,
      name: 'Kruger - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-filtresi-kruger-kof18005.png',
      price: 275,
    },
    {
      id: 118,
      name: 'Kruger - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-filtresi-maher-19728.png',
      price: 280,
    },
    {
      id: 119,
      name: 'Sagem - Yağ Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-musuru-sagem-70115.png',
      price: 320,
    },
    {
      id: 120,
      name: 'Zegen - Yağ Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_RENEGADE_urun_resimleri/yag-musuru-zegen-zms1013.png',
      price: 330,
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
