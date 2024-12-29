import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flixtrail';

  constructor(private http: HttpClient) { }

  sendRequest() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yLnVtYWlyLmFsaTNAZ21haWwuY29tIiwic3ViIjoibXIudW1haXIuYWxpM0BnbWFpbC5jb20iLCJpYXQiOjE3MzUxNTQzMDksImV4cCI6MTczNTE1NzkwOX0.3TghHrIB5bkAQ5fBjjs1w_hGibmy17EpDumuxR1lE64"; // Store this token after login
    this.http.get('http://localhost:3000/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).subscribe(data => {
      console.log(data);
    });
  }
}
