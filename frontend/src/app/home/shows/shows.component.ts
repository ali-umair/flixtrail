import { Component, ElementRef, ViewChild } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CardComponent } from "../../ui/card.component";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shows',
  imports: [CardComponent, NgFor, FormsModule],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
  popularShows: any[] = [];
  topRatedShows: any[] = [];
  popularSelect: string = "8";

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.tmdbService.getTopRatedShows().subscribe((response) => {
      this.topRatedShows = response.results;
    });
    this.tmdbService.getPopularShowsByProvider(this.popularSelect).subscribe((response) => {
      this.popularShows = response.results;
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
    this.tmdbService.getPopularShowsByProvider(this.popularSelect).subscribe((response) => {
      this.popularShows = response.results;
    });
  }
}
