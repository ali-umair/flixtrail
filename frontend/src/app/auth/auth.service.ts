import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    // googleLogin(googleToken: string) {
    //     // return this.http.post<{ jwt: string }>(`${environment.apiUrl}/auth/google/callback`, { token: googleToken }).subscribe(
    //     return this.http.get<{ jwt: string }>(`http://localhost:3000/auth/google/callback`).subscribe(
    //         (response: any) => {
    //             localStorage.setItem('jwt', response.jwt); // Store JWT in localStorage
    //         },
    //         (error) => {
    //             console.error('Login failed', error);
    //         }
    //     );
    // }

    googleLogin(googleToken: string) {
        const clientId = '951166348935-b4g8c973a0i7pgjtpdkcl9dvev4nq3v1.apps.googleusercontent.com';
        const redirectUri = encodeURIComponent('http://localhost:4400/auth/google/callback');
        const scope = encodeURIComponent('email profile');
        const responseType = 'code';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = googleAuthUrl; // Redirect user to Google
    }
}
