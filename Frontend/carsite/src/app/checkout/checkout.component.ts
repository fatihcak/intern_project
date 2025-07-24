import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  @ViewChild('paymentForm') paymentForm!: NgForm;

  paymentData = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  paymentSuccess = false;
  constructor(private basketService: BasketService) {}

  onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    // Konsola anlık kopyasını gönder
    console.log('Ödeme bilgileri:', { ...this.paymentData });

    setTimeout(() => {
      this.paymentSuccess = true;
      this.basketService.clearCart();

      this.paymentForm.resetForm({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
      });
    }, 1000);
  }

  formatCardNumber() {
    // Sadece rakamları al
    let rawValue = this.paymentData.cardNumber.replace(/\D/g, '');
    // 16 haneyi geçmesini engelle
    rawValue = rawValue.substring(0, 16);
    // 4'lü gruplara ayırıp boşlukla birleştir
    const formatted = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.paymentData.cardNumber = formatted;
  }

  formatExpiry() {
    let rawValue = this.paymentData.expiry.replace(/\D/g, '');
    if (rawValue.length > 4) {
      rawValue = rawValue.substring(0, 4);
    }
    if (rawValue.length > 2) {
      this.paymentData.expiry = rawValue.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else {
      this.paymentData.expiry = rawValue;
    }
  }
}
