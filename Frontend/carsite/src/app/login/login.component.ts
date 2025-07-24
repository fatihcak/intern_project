// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    // Admin için fake login
    if (this.username === 'admin' && this.password === 'admin') {
      this.authService.loginAsAdmin();

      // BehaviorSubject güncellemesi (loginAsAdmin içinde zaten var, burada garanti için)
      this.authService.setUserRole('admin');

      alert('Giriş başarılı!');
      this.router.navigate(['/brands']);

      this.username = '';
      this.password = '';
      return;
    }

    // Diğer kullanıcılar için gerçek login
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        alert('Giriş başarılı!');

        // Backend’den gelen role yoksa default 'user' diye set edelim
        this.authService.setUserRole('user');

        this.router.navigate(['/brands']);
        this.username = '';
        this.password = '';
      },
      error: () => {
        alert('Geçersiz kimlik bilgileri');
      },
    });
  }
}
