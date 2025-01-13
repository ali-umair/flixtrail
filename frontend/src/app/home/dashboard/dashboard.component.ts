import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from "../../ui/card.component";
import { NgFor, NgIf } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [CardComponent, NgIf, NgFor],
})
export class DashboardComponent implements OnInit {
    
    @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

    showRightButton = false;
    searchResult: any[] = [];

    constructor(private tmdbService: TmdbService) { }

    ngOnInit(): void { }

    scrollLeft(): void {
        this.carousel.nativeElement.scrollBy({
            left: -300, // Adjust scroll amount as needed
            behavior: 'smooth'
        });
    }

    scrollRight(): void {
        this.carousel.nativeElement.scrollBy({
            left: 300, // Adjust scroll amount as needed
            behavior: 'smooth'
        });
    }

    searchMovies(target: any | null) {
        console.log(target?.value);
        this.tmdbService.searchMovies("batman begins").subscribe((res) => {
            this.searchResult = res.results;
        });
    }
}