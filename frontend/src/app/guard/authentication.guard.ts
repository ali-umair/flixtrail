import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';


@Injectable(
    { providedIn: 'root' }
)

export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (window.localStorage && window.localStorage.getItem("token")) {
            return true;
        } else {
            // alert("Kindly login!");
            // this.router.navigate(["/login"]);
            return true
        }
        return false;
    }
}