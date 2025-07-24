import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  onSubmit(): void {
    if (!this.email || !this.email.includes('@')) {
      alert('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    alert('Şifre sıfırlama bağlantısı gönderildi: ' + this.email);
    // Buraya API isteği vs. ekleyebilirsin
    this.email = ''; // Formu temizlemek istersen
  }
}
