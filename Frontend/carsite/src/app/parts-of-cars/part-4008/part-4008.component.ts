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
  selector: 'app-part-4008',
  templateUrl: './part-4008.component.html',
  styleUrls: ['./part-4008.component.css'],
})
export class Part4008Component {
  searchQuery = '';
  products: Product[] = [
    {
      id: 1,
      name: 'FITPART - Polen Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/polen-filtresi-fitpart-fit04009075p.png',
      price: 150,
    },
    {
      id: 2,
      name: 'BSG - Vantilatör Kayış Gergi Rulmanı',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/vantilator-kayis-gergi-rulmani-bsg-bsg70615024.png',
      price: 200,
    },
    {
      id: 3,
      name: 'BSG - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-bsg-bsg-62-140-003.png',
      price: 120,
    },
    {
      id: 4,
      name: 'MAHER - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-grat-12200.png',
      price: 130,
    },
    {
      id: 5,
      name: 'MAHER - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-kruger-kof15001.png',
      price: 125,
    },
    {
      id: 6,
      name: 'KRUGER - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-kruger-kof18011.png',
      price: 140,
    },
    {
      id: 7,
      name: 'GRAT - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-maher-19758.png',
      price: 110,
    },
    {
      id: 8,
      name: 'KRUGER - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-phaff-dy877.png',
      price: 135,
    },
    {
      id: 9,
      name: 'WEGNA - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-wegna-wo1027.png',
      price: 145,
    },
    {
      id: 10,
      name: 'PHAFF - Yağ Filtresi',
      description: 'Ürün açıklaması buraya gelecek.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-musuru-maher-24614.png',
      price: 155,
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
    const quantity = product.quantity || 1; // Kullanıcının seçtiği miktar
    alert(`${quantity} adet "${product.name}" sepete eklendi.`);
    this.basketService.addToCart({ ...product, quantity }); // seçilen miktar gönderiliyor
    product.quantity = 1; // inputu sıfırla
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
