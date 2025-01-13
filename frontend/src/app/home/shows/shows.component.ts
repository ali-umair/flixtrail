import { Component, ElementRef, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CardComponent } from "../../ui/card.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shows',
  imports: [CardComponent, NgFor],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
    popularShows: any[] = [];
    onTheAirShows: any[] = [];
    topRatedShows: any[] = [];
  
    constructor(private tmdbService: TmdbService) { }
  
    ngOnInit(): void {
      this.tmdbService.getPopularShows().subscribe((response) => {
        this.popularShows = response.results;
      });
      this.tmdbService.getOnTheAirShows().subscribe((response) => {
        this.onTheAirShows = response.results;
      });
      this.tmdbService.getTopRatedShows().subscribe((response) => {
        this.topRatedShows = response.results;
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
}
