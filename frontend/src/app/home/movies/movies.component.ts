import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor } from '@angular/common';
import { CardComponent } from "../../ui/card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [NgFor, CardComponent, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  topRatedMovies: any[] = [];
  popularSelect: string = "8";

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.tmdbService.getPopularMovies().subscribe((response) => {
      this.popularMovies = response.results;
    });
    this.tmdbService.getTopRatedMovies().subscribe((response) => {
      this.topRatedMovies = response.results;
    });
    this.tmdbService.getPopularMoviesByProvider(this.popularSelect).subscribe((response) => {
      this.popularMovies = response.results;
    });
  }

  scrollLeft(carousel: HTMLDivElement): void {
    carousel.scrollBy({
      left: -900, // Adjust scroll amount as needed
      behavior: 'smooth',
    });
  }

  scrollRight(carousel: HTMLDivElement): void {
    carousel.scrollBy({
      left: 900, // Adjust scroll amount as needed
      behavior: 'smooth',
    });
  }

  onPopularChange() {
    this.tmdbService.getPopularMoviesByProvider(this.popularSelect).subscribe((response) => {
      this.popularMovies = response.results;
    });
  }
}
