import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./nav/navbar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flixtrail';
  showNavbar = true;
  authenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and update the `showNavbar` flag
        this.showNavbar = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }

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
