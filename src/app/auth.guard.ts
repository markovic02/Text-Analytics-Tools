import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {ConfigurationService} from "./services/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private configService:ConfigurationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canActivate');
    if(this.configService.getToken() == ''){
      this.router.navigate(['configuration'])

    }
    else
      localStorage.setItem('token', '2ec628b455624edebc54215b2ea58e20');

    return true;
  }

}
