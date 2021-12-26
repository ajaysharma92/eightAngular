import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceGuard implements CanActivate {

  constructor(private route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let deviceNameChk = sessionStorage.getItem('CurrentUser');

    if(deviceNameChk !== "" && deviceNameChk !== undefined && deviceNameChk !== null) return true;
    else this.route.navigate(['/smartphone']);
    return false;
  }
  
}
