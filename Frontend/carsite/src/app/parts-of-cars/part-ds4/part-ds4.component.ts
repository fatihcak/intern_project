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
  selector: 'app-part-ds4',
  templateUrl: './part-ds4.component.html',
  styleUrls: ['./part-ds4.component.css'],
})
export class PartDs4Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 81,
      name: 'Erastech - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/amortisor-tabla-takozu-on-sag-sol-erastech-14135.png',
      price: 500,
    },
    {
      id: 82,
      name: 'Ucel - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/amortisor-tabla-takozu-on-sag-veya-sol-ucel-41807.png',
      price: 520,
    },
    {
      id: 83,
      name: 'MGA - Fren Hortumu Arka Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/fren-hortumu-arka-sag-mga-51973.png',
      price: 300,
    },
    {
      id: 84,
      name: 'MGA - Fren Hortumu Ön Sağ',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/fren-hortumu-on-sag-mga-51971.png',
      price: 310,
    },
    {
      id: 85,
      name: 'CDF - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl: 'assets/parcalar/DS4_urun_resimleri/supap-lastigi-cdf-116v.png',
      price: 50,
    },
    {
      id: 86,
      name: 'Corteco - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-corteco-49472932.png',
      price: 55,
    },
    {
      id: 87,
      name: 'Reinz - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-reinz-70-38539-00.png',
      price: 60,
    },
    {
      id: 88,
      name: 'Reinz - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-reinz-703554800.png',
      price: 62,
    },
    {
      id: 89,
      name: 'SKT - Supap Lastiği',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-skt-4s048v.png',
      price: 58,
    },
    {
      id: 90,
      name: 'Fase - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/yag-filtresi-fase-11-232-001.png',
      price: 120,
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
