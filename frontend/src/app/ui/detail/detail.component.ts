import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card.component";
import { TmdbService } from '../../services/tmdb.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GENRES_TV, GENRES_MOVIES } from '../../../../genres'
import { DomSanitizer } from '@angular/platform-browser';
import { VideoCardComponent } from "../video-card/video-card.component";

@Component({
  selector: 'app-detail',
  imports: [CardComponent, NgIf, NgFor, NgClass, VideoCardComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  baseImgURL: string = "https://image.tmdb.org/t/p/w1280";
  baseLogoURL: string = "https://image.tmdb.org/t/p/w300"
  baseStillURL: string = "https://image.tmdb.org/t/p/w300"
  baseYTThumbnailURL: string = "https://img.youtube.com/vi/"
  baseYTWatchURL: string = "https://www.youtube.com/watch?v="
  details: any = {};
  completeDetails: any = {};
  allLogos: any;
  titleLogo: any;
  userScore: number = 0;
  genreIds: number[] = [];
  genreNames: (string | undefined)[] = [];
  selectedSeason: any = {};
  seasonNumber: number = 1;
  trailersYT: any[] = [];
  teasersYT: any[] = [];
  featurettesYT: any[] = [];
  mediaType: string = "";

  constructor(private tmdbService: TmdbService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.details = history.state.data; // Access the passed data
    this.mediaType = this.details.media_type ? this.details.media_type : history.state.mediaType
    this.userScore = Math.ceil(this.details.vote_average * 10);
    this.genreIds = this.details.genre_ids;
    this.mediaType == "tv" ? this.genreNames = this.mapGenreIdsToNames(this.genreIds, GENRES_TV) : this.genreNames = this.mapGenreIdsToNames(this.genreIds, GENRES_MOVIES);
    if (this.mediaType == "tv") {
      this.tmdbService.getShowDetails(this.details.id).subscribe((response) => {
        this.completeDetails = response;
      });
      this.tmdbService.getAllImgesByShowId(this.details.id).subscribe((response) => {
        this.allLogos = response.logos;
        this.titleLogo = this.allLogos.find((logo: any) => logo.iso_639_1 == "en");
      });
      this.tmdbService.getSeasonDetails(this.details.id, this.seasonNumber).subscribe((response) => {
        this.selectedSeason = response;
      });
    }
    else if (this.mediaType == "movie") {
      this.tmdbService.getMovieDetails(this.details.id).subscribe((response) => {
        this.completeDetails = response;
      });
      this.tmdbService.getAllImgesByMovieId(this.details.id).subscribe((response) => {
        this.allLogos = response.logos;
        this.titleLogo = this.allLogos.find((logo: any) => logo.iso_639_1 == "en");
      });
      this.tmdbService.getMovieVideos(this.details.id).subscribe((response) => {
        this.trailersYT = response.results.filter((video: any) => video.type == "Trailer" && video.site == "YouTube");
        this.teasersYT = response.results.filter((video: any) => video.type == "Teaser" && video.site == "YouTube");
        this.featurettesYT = response.results.filter((video: any) => video.type == "Featurette" && video.site == "YouTube");
      });
    }
  }

  ngAfterViewChecked() {
    console.log('View Checked');
  }

  mapGenreIdsToNames(ids: number[], genreMap: any[]): (string | undefined)[] {
    return ids
      .map((id) => genreMap.find((genre) => genre.id === id)?.name)
      .filter((name) => name); // Filter out undefined names
  }

  selectSeason(event: any) {
    const target = event.currentTarget as HTMLElement;
    const seasonNumber: any = target.getAttribute('data-season-number');
    this.seasonNumber = parseInt(seasonNumber);
    this.tmdbService.getSeasonDetails(this.details.id, this.seasonNumber).subscribe((response) => {
      this.selectedSeason = response;
    });
    // this.seasonNumber = event;
  }
}
