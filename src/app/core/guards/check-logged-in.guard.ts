import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebStorageService } from '../services/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoggedInGuard implements CanActivate {
  constructor(private WebStorageService: WebStorageService, private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {
    if (this.WebStorageService.checkUserIsLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }
  }

}
