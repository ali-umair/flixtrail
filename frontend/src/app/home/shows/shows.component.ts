import { Component, ElementRef, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CardComponent } from "../../ui/card.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shows',
  imports: [CardComponent, NgFor, FormsModule, NgClass, NgIf],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  baseImgURL: string = "https://image.tmdb.org/t/p/w1280";
  popularShows: any[] = [];
  topRatedShows: any[] = [];
  popularSelect: string = "8";
  baseLogoURL: string = "https://image.tmdb.org/t/p/w500"

  currentSlide = 0;

  logos = [
    { id: '337', name: 'Disney', src: '/logo-provider-337.png' },
    { id: '350', name: 'Apple TV', src: '/logo-provider-350.png' },
    { id: '8', name: 'Netflix', src: '/logo-provider-8.png' },
    { id: '1899', name: 'Max', src: '/logo-provider-1899.png' },
  ];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.tmdbService.getTopRatedShows().subscribe((response) => {
      this.topRatedShows = response.results;
    });
    this.tmdbService.getPopularShowsByProvider(this.popularSelect).subscribe((response) => {
      this.popularShows = response.results;
      this.popularShows.forEach(movie => {
        this.tmdbService.getAllImgesByShowId(movie.id).subscribe((response) => {
          let allLogos = response.logos;
          let logo = allLogos.find((logo: any) => logo.iso_639_1 == "en");

          if (logo) {
            movie.logo = logo.file_path;  // Assuming file_path contains the image URL
          }
        });
      });
    });
    this.autoSlide();
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  }

  onPopularChange(popularSelect: string) {
    this.popularSelect = popularSelect;
    this.tmdbService.getPopularShowsByProvider(popularSelect).subscribe((response) => {
      this.popularShows = response.results;
      this.popularShows.forEach(movie => {
        this.tmdbService.getAllImgesByShowId(movie.id).subscribe((response) => {
          let allLogos = response.logos;
          let logo = allLogos.find((logo: any) => logo.iso_639_1 == "en");

          if (logo) {
            movie.logo = logo.file_path;  // Assuming file_path contains the image URL
          }
        });
      });
    });
  }

  // onListTypeChange(listType: string) {
  //   this.listType = listType;
  // }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.popularShows.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.popularShows.length) % this.popularShows.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  autoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Auto-slide every 5 seconds
  }

  addToList() {
    console.log('Added to List: ', this.popularShows[this.currentSlide].title);
  }
}
