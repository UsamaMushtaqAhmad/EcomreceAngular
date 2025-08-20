import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false  // NgModule approach ke liye
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password || this.password !== this.confirmPassword || this.password.length < 6) {
      this.errorMessage = 'Form invalid! Check fields.';
      return;
    }

    this.isLoading = true;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registered! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed!';
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }
}