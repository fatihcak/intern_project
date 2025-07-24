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
  selector: 'app-part-ds7',
  templateUrl: './part-ds7.component.html',
  styleUrls: ['./part-ds7.component.css'],
})
export class PartDs7Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 91,
      name: 'Ucel - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/amortisor-tabla-takozu-on-sag-veya-sol-ucel-41807.png',
      price: 500,
    },
    {
      id: 92,
      name: 'Zegen - Geri Vites Müşürü',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/geri-vites-musuru-zegen-zms1079.png',
      price: 250,
    },
    {
      id: 93,
      name: 'Corteco - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-corteco-49472888.png',
      price: 100,
    },
    {
      id: 94,
      name: 'Corteco - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-corteco-49472932.png',
      price: 100,
    },
    {
      id: 95,
      name: 'Elring - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-elring-582530.png',
      price: 120,
    },
    {
      id: 96,
      name: 'Reinz - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-reinz-70-38539-00.png',
      price: 110,
    },
    {
      id: 97,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-skt-4s-085-v.png',
      price: 90,
    },
    {
      id: 98,
      name: 'BSG - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-bsg-bsg70-116-001.png',
      price: 80,
    },
    {
      id: 99,
      name: 'BSG - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-bsg-bsg70140001.png',
      price: 85,
    },
    {
      id: 100,
      name: 'Fase - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-fase-11-232-001.png',
      price: 95,
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
