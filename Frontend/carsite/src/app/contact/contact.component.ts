import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  onSubmit(form: NgForm) {
    if (!form.controls['email']?.valid) {
      alert('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
    if (form.valid) {
      alert('Mesajınız başarılı bir şekilde gönderildi');
      form.resetForm();
    }
  }
}
