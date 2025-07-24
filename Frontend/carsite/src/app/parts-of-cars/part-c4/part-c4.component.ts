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
  selector: 'app-part-c4',
  templateUrl: './part-c4.component.html',
  styleUrls: ['./part-c4.component.css'],
})
export class PartC4Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 51,
      name: 'FROW - Sol veya Sağ Arka Fren Hortumu',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/fren-hortumu-arka-sag-veya-sol-frow-2901112003.png',
      price: 250,
    },
    {
      id: 52,
      name: 'Sahin - Kol Yatak',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/kol-yatak-sahin-kl4344050.png',
      price: 120,
    },
    {
      id: 53,
      name: 'Maher - Radyatör Kapağı',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/radyator-kapagi-maher-09600.png',
      price: 80,
    },
    {
      id: 54,
      name: 'CDF - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-cdf-113v.png',
      price: 30,
    },
    {
      id: 55,
      name: 'Corteco - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-corteco-49472932.png',
      price: 35,
    },
    {
      id: 56,
      name: 'PSA Orjinal - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-psa-orjinal-095651.png',
      price: 50,
    },
    {
      id: 57,
      name: 'REINZ - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-reinz-703554800.png',
      price: 40,
    },
    {
      id: 58,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-skt-4s048v.png',
      price: 32,
    },
    {
      id: 59,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-skt-4s068v.png',
      price: 32,
    },
    {
      id: 60,
      name: 'FASE - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/yag-filtresi-fase-11-232-001.png',
      price: 60,
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
