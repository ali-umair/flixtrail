import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card.component";
import { TmdbService } from '../../services/tmdb.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CardComponent, NgIf, NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  baseImgURL: string = "https://image.tmdb.org/t/p/w1280";
  baseLogoURL: string = "https://image.tmdb.org/t/p/w300"
  details: any = {};
  allLogos: any;
  titleLogo: any;
  userScore: number = 0;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.details = history.state.data; // Access the passed data
    this.userScore = Math.ceil(this.details.vote_average * 10);
    this.tmdbService.getAllImgesByShowId(this.details.id).subscribe((response) => {
      this.allLogos = response.logos;
      this.titleLogo = this.allLogos.find((logo: any) => logo.iso_639_1 == "en");
    });
  }
}
