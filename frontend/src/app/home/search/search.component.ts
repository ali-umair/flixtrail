import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from "../../ui/card.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [NgIf, NgFor, CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  query: string = "";

  constructor(private tmdbService: TmdbService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params["query"];
      if (this.query) {
        this.tmdbService.searchMulti(this.query).subscribe(res => {
          this.searchResults = res.results;
        });
      }
    })
  }

  search(value: string) {
    // this.tmdbService.searchMulti(value).subscribe(res => {
    //   this.searchResults = res.results;
    // });
    this.router.navigate(['/search'], { queryParams: { query: value } });
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
