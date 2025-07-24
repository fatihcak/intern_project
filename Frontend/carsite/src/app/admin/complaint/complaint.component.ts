import { Component, Input, OnInit } from '@angular/core';

interface Message {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent implements OnInit {
  @Input() section: string = '';
  showModal: boolean = false;
  selectedMessage: string = '';

  showDeleteModal: boolean = false;
  messageToDeleteIndex: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 6;

  allMessages: Message[] = [];

  ngOnInit() {
    const exampleMessage: Message = {
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      message: 'Site hakkında bir şikayetim var...',
    };

    this.addMessage(exampleMessage);
    this.loadMessages();
  }

  loadMessages() {
    const storedMessages = localStorage.getItem('complaintMessages');
    if (storedMessages) {
      this.allMessages = JSON.parse(storedMessages);
    } else {
      this.allMessages = [];
    }
  }

  saveMessages() {
    localStorage.setItem('complaintMessages', JSON.stringify(this.allMessages));
  }

  get pagedMessages() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allMessages.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.allMessages.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  openMessage(message: string): void {
    this.selectedMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openDeleteModal(index: number): void {
    this.messageToDeleteIndex =
      index + (this.currentPage - 1) * this.itemsPerPage;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.messageToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.messageToDeleteIndex !== null) {
      this.allMessages.splice(this.messageToDeleteIndex, 1);
      this.saveMessages();

      if (this.pagedMessages.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
    this.closeDeleteModal();
  }

  addMessage(newMessage: Message): void {
    this.allMessages.unshift(newMessage); // en başa ekle
    this.saveMessages();
    this.currentPage = 1; // Yeni mesajı hemen göstermek için sayfayı 1 yap
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
