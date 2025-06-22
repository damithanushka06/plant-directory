import { Injectable, NgZone } from '@angular/core';
import {BehaviorSubject, fromEvent, map, merge, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(private ngZone: NgZone) {
    this.monitorNetwork();
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
  }

  private monitorNetwork() {
    this.ngZone.runOutsideAngular(() => {
      const online$ = fromEvent(window, 'online').pipe(map(() => true));
      const offline$ = fromEvent(window, 'offline').pipe(map(() => false));
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

  private updateStatus(status: boolean): void {
    this.onlineStatus$.next(status);
  }
}
