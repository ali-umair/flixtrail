import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    constructor(private authService: AuthService) { }

    onLoginWithGoogle() {
        // Call Google OAuth here and get the token (you could use the `gapi` library for this)
        alert("Google Sign In");
    }
}