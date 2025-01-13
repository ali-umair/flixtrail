import { Routes } from '@angular/router';
import { LoginComponent } from './auth-screens/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { SignupComponent } from './auth-screens/signup.component';
import { MoviesComponent } from './home/movies/movies.component';
import { ShowsComponent } from './home/shows/shows.component';
import { DetailComponent } from './ui/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: SignupComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'tv',
        component: ShowsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'detail',
        component: DetailComponent,
        canActivate: [AuthenticationGuard]
    }
];
