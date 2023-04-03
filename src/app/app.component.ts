import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Phone Simulator - Angular Challenge';

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
