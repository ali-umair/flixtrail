import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthComponent } from '../auth/auth.componen';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthenticationGuard } from '../guard/authentication.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'signin',
        component: AuthComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard]
    }
];
