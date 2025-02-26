import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [NgFor, FormsModule, NgClass, NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  baseImgURL: string = "https://image.tmdb.org/t/p/w1280";
  popularMovies: any[] = [];
  topRatedMovies: any[] = [];
  popularSelect: string = "8";
  baseLogoURL: string = "https://image.tmdb.org/t/p/w500"
  // listType: string = "Popular";

  currentSlide = 0;

  logos = [
    { id: '337', name: 'Disney', src: '/logo-provider-337.png' },
    { id: '350', name: 'Apple TV', src: '/logo-provider-350.png' },
    { id: '8', name: 'Netflix', src: '/logo-provider-8.png' },
    { id: '1899', name: 'Max', src: '/logo-provider-1899.png' },
  ];

  // listTypes: string[] = ['Popular', 'Trending', 'Top Rated', 'New'];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    // this.tmdbService.getPopularMovies().subscribe((response) => {
    //   this.popularMovies = response.results;
    // });
    this.tmdbService.getTopRatedMovies().subscribe((response) => {
      this.topRatedMovies = response.results;
    });
    this.tmdbService.getPopularMoviesByProvider(this.popularSelect).subscribe((response) => {
      this.popularMovies = response.results;
      this.popularMovies.forEach(movie => {
        this.tmdbService.getAllImgesByMovieId(movie.id).subscribe((response) => {
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

  // scrollLeft(carousel: HTMLDivElement): void {
  //   carousel.scrollBy({
  //     left: -900, // Adjust scroll amount as needed
  //     behavior: 'smooth',
  //   });
  // }

  // scrollRight(carousel: HTMLDivElement): void {
  //   carousel.scrollBy({
  //     left: 900, // Adjust scroll amount as needed
  //     behavior: 'smooth',
  //   });
  // }

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
    this.tmdbService.getPopularMoviesByProvider(popularSelect).subscribe((response) => {
      this.popularMovies = response.results;
      this.popularMovies.forEach(movie => {
        this.tmdbService.getAllImgesByMovieId(movie.id).subscribe((response) => {
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
    this.currentSlide = (this.currentSlide + 1) % this.popularMovies.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.popularMovies.length) % this.popularMovies.length;
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
    console.log('Added to List: ', this.popularMovies[this.currentSlide].title);
  }
}
