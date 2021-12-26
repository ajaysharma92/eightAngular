import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/api.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeeGuard implements CanActivateChild {
  enableManageEmp:boolean;

  constructor(private api: ApiService, private _router: Router, private alertservice: AlertService){}
   
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.api.subject$.subscribe((val: boolean) => this.enableManageEmp = val);
      console.log('manageGuard', this.enableManageEmp);
      if(this.enableManageEmp){
        return true
      }
      //return false;
      //console.log(state.url);
      //this._router.events.subscribe((res: NavigationCancel) => console.log(res));
      this.alertservice.info(`Can\'t Navigate to ${state.url.includes('addemp') ? 'Add Employee' : 'Edit Employee'}`, {autoClose: true, KeepAfterRouteChange: true})
      return this._router.navigate(['/apidata']);
  }
}
