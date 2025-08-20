import { Component } from '@angular/core';

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

  currentSlide = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
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
}
