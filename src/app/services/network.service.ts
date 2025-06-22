import { Injectable, NgZone } from '@angular/core';
import {BehaviorSubject, fromEvent, map, merge, of} from 'rxjs';
import {AppConstant} from '../constants/app-constant';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(private ngZone: NgZone) {
    this.monitorNetwork();
  }

  private monitorNetwork() {
    this.ngZone.runOutsideAngular(() => {
      const online$ = fromEvent(window, AppConstant.ONLINE).pipe(map(() => true));
      const offline$ = fromEvent(window, AppConstant.OFFLINE).pipe(map(() => false));
      merge(online$, offline$, of(navigator.onLine)).subscribe(status => {
        if (typeof status === "boolean") {
          this.ngZone.run(() => this.onlineStatus$.next(status));
        }
      });
    });
  }

  get isOnline$() {
    return this.onlineStatus$.asObservable();
  }

  get isOnline() {
    return this.onlineStatus$.value;
  }
}
