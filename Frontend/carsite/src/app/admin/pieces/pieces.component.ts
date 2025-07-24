import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css'],
})
export class PiecesComponent implements OnInit {
  modalVisible = false;
  isEditMode = false;
  showDeleteModal = false;
  partIdToDelete: string | null = null;
  currentPage = 1;
  itemsPerPage = 6;
  errorMessage = '';

  parts: {
    id: string;
    name: string;
    brand: string;
    price: string;
    quantity: number;
  }[] = [];

  selectedPart = {
    id: '',
    name: '',
    brand: '',
    quantity: '',
    price: '',
  };

  oldId: string | null = null; // Düzenleme öncesi eski ID'yi tutar

  ngOnInit() {
    const storedParts = localStorage.getItem('parts');
    if (storedParts) {
      this.parts = JSON.parse(storedParts);
    } else {
      this.parts = [];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('parts', JSON.stringify(this.parts));
  }

  // En küçük boş ID'yi bul (1'den başlayarak)
  private findNextAvailableId(): string {
    const ids = this.parts.map((p) => +p.id).sort((a, b) => a - b);
    let nextId = 1;
    for (const id of ids) {
      if (id === nextId) {
        nextId++;
      } else if (id > nextId) {
        break;
      }
    }
    return nextId.toString();
  }

  get totalPages(): number {
    return Math.ceil(this.parts.length / this.itemsPerPage);
  }

  get paginatedParts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.parts.slice(start, start + this.itemsPerPage);
  }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.parts.length);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openModal(part?: any) {
    this.errorMessage = '';

    if (part) {
      this.isEditMode = true;
      this.selectedPart = { ...part };
      this.oldId = part.id; // eski ID'yi sakla
    } else {
      this.isEditMode = false;
      this.oldId = null;
      this.selectedPart = {
        id: this.findNextAvailableId(),
        name: '',
        brand: '',
        quantity: '',
        price: '',
      };
    }
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.errorMessage = '';
  }

  saveChanges() {
    this.errorMessage = '';

    // Fiyat sadece tam sayı olmalı
    if (!/^\d+$/.test(this.selectedPart.price)) {
      this.errorMessage = 'Fiyat kısmına sadece tam sayı girilebilir.';
      return;
    }

    // ID çakışması kontrolü
    const duplicate = this.parts.find(
      (p) => p.id === this.selectedPart.id && p.id !== this.oldId
    );

    if (duplicate) {
      this.errorMessage =
        'Bu ID zaten başka bir parçaya ait. Lütfen farklı bir ID girin.';
      return;
    }

    if (this.isEditMode) {
      // Düzenleme modunda eski ID ile parçayı bul ve güncelle
      if (!this.oldId) {
        this.errorMessage = 'Eski ID bilgisi bulunamadı.';
        return;
      }

      const oldIndex = this.parts.findIndex((p) => p.id === this.oldId);

      if (oldIndex > -1) {
        this.parts[oldIndex] = {
          ...this.selectedPart,
          quantity: Number(this.selectedPart.quantity),
        };
      } else {
        // Eski ID yoksa parçayı ekle
        this.parts.push({
          ...this.selectedPart,
          quantity: Number(this.selectedPart.quantity),
        });
      }
    } else {
      // Yeni ürün ekle
      this.parts.push({
        ...this.selectedPart,
        quantity: Number(this.selectedPart.quantity),
      });
    }

    // ID'ye göre sıralama
    this.parts.sort((a, b) => Number(a.id) - Number(b.id));

    this.saveToLocalStorage();
    this.closeModal();
  }

  openDeleteModal(id: string) {
    this.partIdToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.partIdToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.partIdToDelete !== null) {
      this.parts = this.parts.filter((p) => p.id !== this.partIdToDelete);
      this.saveToLocalStorage();
      this.closeDeleteModal();
    }
  }
}
