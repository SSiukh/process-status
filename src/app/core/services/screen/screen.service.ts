import { inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, startWith } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private ngZone = inject(NgZone);
  private widthSubject = new BehaviorSubject<number>(this.getWidthSafely());
  width$ = this.widthSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      this.ngZone.runOutsideAngular(() => {
        fromEvent(window, 'resize')
          .pipe(
            debounceTime(100),
            map(() => window.innerWidth),
            startWith(window.innerWidth)
          )
          .subscribe((width) => {
            this.ngZone.run(() => this.widthSubject.next(width));
          });
      });
    }
  }

  private getWidthSafely(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1440;
  }

  get currentWidth(): number {
    return this.widthSubject.value;
  }
}
