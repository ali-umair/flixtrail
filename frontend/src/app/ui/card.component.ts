import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [NgIf],
})
export class CardComponent implements OnInit {

    @Input() imageURL: string = "";
    @Input() badgeText: string = "";
    @Input() details: {} = {};
    @Input() size: string = "lg";

    baseImgURL: string = "https://image.tmdb.org/t/p/w500";

    constructor(private router: Router) { }

    ngOnInit(): void { }

    showDetails() {
        console.log(this.details);
        this.router.navigate(['/detail'], { state: { data: this.details } });
    }
}