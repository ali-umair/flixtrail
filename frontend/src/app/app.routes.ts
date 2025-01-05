import { Routes } from '@angular/router';
import { LoginComponent } from './auth-screens/login.component';
import { AuthComponent } from './auth/auth.componen';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { SignupComponent } from './auth-screens/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'signup',
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
    }
];
