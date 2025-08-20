import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Router add kiya

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7087/api/Auth';
  private tokenKey = 'authToken';
  private userKey = 'currentUser';

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.saveTokenAndUser(response.token, response.user);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const userData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        this.saveTokenAndUser(response.token, response.user);
        // Role-based redirect
        const user = response.user;
        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearStorage())
    );
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  private saveTokenAndUser(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}