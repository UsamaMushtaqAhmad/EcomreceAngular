import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  activeTab: string = 'home';
  isMobileMenuOpen: boolean = false;
  isProfileOpen: boolean = false;
  cartCount: number = 3; // Example, backend se fetch karoge later

  constructor(public authService: AuthService, private router: Router) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isMobileMenuOpen = false; // Close mobile menu when navigating
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) this.isProfileOpen = false;
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.authService.logout(); // Local storage clear
        this.router.navigate(['/auth/login']);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown && !profileDropdown.contains(target)) {
      this.isProfileOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) this.isMobileMenuOpen = false;
  }
}
