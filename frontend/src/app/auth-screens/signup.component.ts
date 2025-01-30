import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GOOGLE_CLIENT_ID } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

declare const google: any;

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, NgIf],
    templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
    google: any;
    userName: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

    ngOnInit() {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: this.handleCredentialResponse.bind(this),
        });
        google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { theme: 'filled_black', size: 'large', logo_alignment: 'center', type: 'icon' } // Customize button style
        );
        // google.accounts.id.prompt(); // Optional: Auto-prompt for login
    }

    onGoogleSignIn() {
        google.accounts.id.prompt();
    }

    handleCredentialResponse(response: any) {
        const googleToken = response.credential;
        console.log('Google Token:', googleToken);
        this.loginWithGoogle(googleToken); // Send this token to the backend for JWT
    }

    loginWithGoogle(googleToken: string) {
        this.http.post('http://localhost:3000/auth/jwt', { token: googleToken }).subscribe((response: any) => {
            console.log(response);
            localStorage.setItem('token', response.jwt);
            this.router.navigate(["dashboard"]);
        });
    }

    register(form: NgForm) {
        console.log(form.value);
        this.http.post('http://localhost:3000/auth/register', { payload: form.value }).subscribe((response: any) => {
            console.log(response);
        });
    }
}