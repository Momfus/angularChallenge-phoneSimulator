import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setToLoad(value: boolean, delay: number = 0) {
    setTimeout(() => {
      this.isLoading$.next(value);
    }, delay);
  }
}
