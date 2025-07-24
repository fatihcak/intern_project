// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth/login';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'role';

  // Mevcut role bilgisini takip etmek için BehaviorSubject (localStorage'dan başlatılır)
  private userRoleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem(this.ROLE_KEY)
  );
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  isAdmin(): boolean {
    return localStorage.getItem(this.ROLE_KEY) === 'admin';
  }

  loginAsAdmin(): void {
    localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
    localStorage.setItem(this.ROLE_KEY, 'admin');
    this.userRoleSubject.next('admin'); // Rol bilgisini güncelle
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
          // Backend'den gelen role yoksa default 'user' koyabiliriz
          localStorage.setItem(this.ROLE_KEY, 'user');
          this.userRoleSubject.next('user'); // Rol bilgisini güncelle
        }
      })
    );
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Observable<any> {
    const useMock = true; // 👉 bunu false yapınca backend'e geçer

    if (useMock) {
      this.router.navigate(['/login']);
      return of({ token: 'fake-jwt-token' });
    } else {
      return this.http.post('https://localhost:5001/api/auth/register', user);
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Token varsa kullanıcı giriş yapmış demektir
  }

  logout() {
    this.removeToken();
    localStorage.removeItem(this.ROLE_KEY);
    this.userRoleSubject.next(null); // Rol bilgisini sıfırla
    this.router.navigate(['/login']);
  }

  // İstersen dışarıdan da rol bilgisini güncellemek için metod ekledim
  setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }
}

export { Router };
