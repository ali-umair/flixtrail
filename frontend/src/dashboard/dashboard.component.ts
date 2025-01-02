import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    google: any;

    constructor(private router: Router, private http: HttpClient) { }

    ngOnInit(): void { }

    logout() {
        window.localStorage.clear();
        this.router.navigate([""]);
    }

    fetchAllMovies() {
        this.http.get('http://localhost:3000/movies').subscribe((response: any) => {
            console.log(response);
        });
    }
}