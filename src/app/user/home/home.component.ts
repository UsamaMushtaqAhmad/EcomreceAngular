import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slides = [
    { id: 1, img: 'assets/images/image1.jpg', text: 'Luxury Fashion' },
    { id: 2, img: 'assets/images/image2.jpg', text: 'New Arrivals' },
    { id: 3, img: 'assets/images/image4.jpg', text: 'Exclusive Deals' },
  ];

  hotSellers: any[] = [];
newArrivals: any[] = [];

  constructor(private productService: ProductService) {} // ✅ inject ProductService

  currentSlide = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
      this.loadHotSellers();
  this.loadNewArrivals();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000); // 5 sec delay for premium feel
  }

  stopAutoPlay() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  loadHotSellers() {
  this.productService.getHotSellers().subscribe(res => this.hotSellers = res);
}

loadNewArrivals() {
  this.productService.getNewArrivals().subscribe(res => this.newArrivals = res);
}
}
