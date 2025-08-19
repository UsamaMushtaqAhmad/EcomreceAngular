// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7087/api/Auth'; // Aapka backend URL
  public currentUser: any = null;

  constructor(private http: HttpClient) {
    // Page reload par user ko wapas set karna
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Register function
  register(name: string, email: string, password: string) {
    const userData = { name: name, email: email, password: password };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login function  
  login(email: string, password: string) {
    const userData = { email: email, password: password };
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Logout function
  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // User ko save karna
  saveUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  // Check karna user logged in hai ya nahi
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // User ko clear karna logout ke time
  clearUser() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}