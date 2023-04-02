import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  contactList: Contact[] = [];

  onPageChange( event: PageEvent) {

  }

}
