import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {NetworkService} from '../services/network.service';


@Injectable({ providedIn: 'root' })
export class NetworkGuard implements CanActivate {
  constructor(private networkService: NetworkService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.networkService.isOnline) {
      return true;
    } else {
      return this.router.createUrlTree(['/offline']);
    }
  }
}
