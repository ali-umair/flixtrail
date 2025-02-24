import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [NgIf, NgClass],
})
export class CardComponent implements OnInit {

    @Input() imageURL: string = "";
    @Input() badgeText: string = "";
    @Input() details: {} = {};
    @Input() size: string = "lg";
    @Input() mediaType: string = "";
    @Input() seasonNumber: number = 0;
    @Input() totalEpisodes: number = 0;
    @Input() selectedSeason: any = {};

    baseImgURL: string = "https://image.tmdb.org/t/p/w500";

    constructor(private router: Router) { }

    ngOnInit(): void { }

    showDetails() {
        console.log(this.details);
        this.router.navigate(['/detail'], { state: { data: this.details, mediaType: this.mediaType } });
    }
}