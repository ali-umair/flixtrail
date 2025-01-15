import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-card',
  imports: [],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
  @Input() video: any = {};

  getThumbnailUrl(videoKey: string): string {
    return `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`;
  }

  openYouTube(videoKey: string): void {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(youtubeUrl, '_blank');
  }
}
