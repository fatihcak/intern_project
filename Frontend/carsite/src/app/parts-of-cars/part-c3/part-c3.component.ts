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
  selector: 'app-part-c3',
  templateUrl: './part-c3.component.html',
  styleUrls: ['./part-c3.component.css'],
})
export class PartC3Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 41,
      name: 'Sbarut - Cam Açma Düğmesi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/cam-acma-dugmesi-sbarut-310002.png',
      price: 100,
    },
    {
      id: 42,
      name: 'CDF - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-cdf-116v.png',
      price: 80,
    },
    {
      id: 43,
      name: 'Corteco - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-corteco-49472012.png',
      price: 90,
    },
    {
      id: 44,
      name: 'ELRING - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-elring-403730.png',
      price: 95,
    },
    {
      id: 45,
      name: 'ELWIS Royal - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-elwis-royal-1642657.png',
      price: 110,
    },
    {
      id: 46,
      name: 'GLYCO - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-glyco-r5030676750.png',
      price: 85,
    },
    {
      id: 47,
      name: 'PAYEN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-payen-r5030676750.png',
      price: 88,
    },
    {
      id: 48,
      name: 'REINZ - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-reinz-703351200.png',
      price: 92,
    },
    {
      id: 49,
      name: 'TOPRAN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-topran-100-254.png',
      price: 87,
    },
    {
      id: 50,
      name: 'TOPRAN - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-topran-107-502.png',
      price: 89,
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
