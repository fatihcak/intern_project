import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  modalVisible = false;
  isEditMode = false;
  showPassword = false;
  showDeleteModal = false;
  selectedDeleteIndex: number | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  errorMessage = '';

  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
  }[] = [];

  selectedUser = {
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
  };

  oldId: string | null = null; // Düzenleme öncesi eski ID'yi tutar

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // En küçük boş ID'yi bul (1'den başlayarak)
  private findNextAvailableId(): string {
    const ids = this.users.map((u) => +u.id).sort((a, b) => a - b);
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  openModal(user?: any) {
    this.errorMessage = '';

    if (user) {
      this.isEditMode = true;
      this.selectedUser = { ...user };
      this.oldId = user.id; // eski ID'yi sakla
    } else {
      this.isEditMode = false;
      this.oldId = null;

      this.selectedUser = {
        id: this.findNextAvailableId(),
        name: '',
        email: '',
        role: 'Kullanıcı',
        password: '',
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!this.selectedUser.name.trim()) {
      this.errorMessage = 'İsim boş bırakılamaz.';
      return;
    }
    if (!emailRegex.test(this.selectedUser.email)) {
      this.errorMessage = 'Geçerli bir email giriniz.';
      return;
    }
    if (
      this.selectedUser.role !== 'Admin' &&
      this.selectedUser.role !== 'Kullanıcı'
    ) {
      this.errorMessage = 'Rol "Admin" veya "Kullanıcı" olmalıdır.';
      return;
    }

    // ID çakışması kontrolü
    const duplicate = this.users.find(
      (u) => u.id === this.selectedUser.id && u.id !== this.oldId
    );

    if (duplicate) {
      this.errorMessage =
        'Bu ID zaten başka bir kullanıcıda mevcut. Lütfen farklı bir ID girin.';
      return;
    }

    if (this.isEditMode) {
      if (!this.oldId) {
        this.errorMessage = 'Eski ID bilgisi bulunamadı.';
        return;
      }

      const oldIndex = this.users.findIndex((u) => u.id === this.oldId);

      if (oldIndex > -1) {
        this.users[oldIndex] = { ...this.selectedUser };
      } else {
        // Eski ID yoksa kullanıcıyı ekle
        this.users.push({ ...this.selectedUser });
      }
    } else {
      // Yeni kullanıcı ekle
      this.users.push({ ...this.selectedUser });
    }

    // ID'ye göre sıralama
    this.users.sort((a, b) => Number(a.id) - Number(b.id));

    this.saveToLocalStorage();
    this.closeModal();
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.users.length);
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

  openDeleteModal(index: number) {
    this.selectedDeleteIndex = index;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDeleteIndex = null;
  }

  confirmDelete() {
    if (this.selectedDeleteIndex !== null) {
      this.users.splice(this.selectedDeleteIndex, 1);
      this.saveToLocalStorage();
      this.closeDeleteModal();
    }
  }
}
