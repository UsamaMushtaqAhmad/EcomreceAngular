import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false  // NgModule approach ke liye

  // standalone: false ya remove kar dein - NgModule approach ke liye
})
export class LoginComponent {
  // Simple variables
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    public authService: AuthService,  // public banaya template mein use ke liye
    private router: Router
  ) {}

  onSubmit() {
    // Basic check
    if (!this.email || !this.password) {
      this.errorMessage = 'Wrong email or password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Login API call
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        // User save karna
        this.authService.saveUser(response.user);
        // Success message
        alert('Login successful!');
        // Redirect (abhi ke liye login page par hi rehenge)
        // this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email ya password!';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Logout function
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearUser();
        alert('Logout successful!');
      },
      error: () => {
        this.authService.clearUser();
        alert('Logged out!');
      }
    });
  }
}