import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, tap, delay } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal<boolean>(false);
  private tokenKey = 'sicas_auth_token';

  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialToken();
  }

  get isLoggedIn() {
    return this.loggedIn();
  }

  private checkInitialToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.loggedIn.set(true);
    }
  }

  login(usuario: string, senha: string): Observable<any> {
    if (environment.useMock) {
      // Mock login
      return of({ token: 'mock-jwt-token-12345' }).pipe(
        delay(1000), // Simulate network delay
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.loggedIn.set(true);
          this.router.navigate(['/dashboard']);
        })
      );
    } else {
      // Real API call
      return this.http.post<any>(`${environment.apiUrl}/auth/login`, { usuario, senha }).pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            this.loggedIn.set(true);
            this.router.navigate(['/dashboard']);
          }
        })
      );
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
