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
  selector: 'app-part-avenger',
  templateUrl: './part-avenger.component.html',
  styleUrls: ['./part-avenger.component.css'],
})
export class PartAvengerComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 31,
      name: 'FROW - Hararet Müşürü ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hararet-musuru-frow-2821911005.png',
      price: 100,
    },
    {
      id: 32,
      name: 'KRUGER - Hava Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hava-filtresi-kruger-kaf32025.png',
      price: 120,
    },
    {
      id: 33,
      name: 'VOLLER - Hava Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hava-filtresi-voller-66130.png',
      price: 110,
    },
    {
      id: 34,
      name: 'AXAM - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-axam-0426113599.png',
      price: 90,
    },
    {
      id: 35,
      name: 'Fase - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-fase-22-225-025.png',
      price: 95,
    },
    {
      id: 36,
      name: 'KRUGER - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-kruger-kcf32014.png',
      price: 105,
    },
    {
      id: 37,
      name: 'FILTRON - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-filtron-op5401.png',
      price: 130,
    },
    {
      id: 38,
      name: 'KRAFTVOLL - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-kraftvoll-06020072eco.png',
      price: 125,
    },
    {
      id: 39,
      name: 'KRUGER - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-kruger-kof33001.png',
      price: 115,
    },
    {
      id: 40,
      name: 'Sakura - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-sakura-c-2105.png',
      price: 140,
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
