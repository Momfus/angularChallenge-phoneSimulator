import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: center;
      }

      a {
        color: white;
        margin-left: 0.2em;
        font-size: 1.25rem;
      }
  `
  ]
})
export class FooterComponent {

}
