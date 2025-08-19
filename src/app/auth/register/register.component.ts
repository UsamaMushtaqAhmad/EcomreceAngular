import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false  // NgModule approach ke liye
  // standalone: false ya remove kar dein - NgModule approach ke liye
})
export class RegisterComponent {
  // Simple variables
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    // Basic validation
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Sab fields fill karein!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password match nahi kar raha!';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password kam se kam 6 characters ka hona chahiye!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Register API call
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! Ab login kar sakte hain.';
        
        // Form clear karna
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        
        // 3 seconds baad login page par bhej dena
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed! Email already exist kar sakti hai.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}