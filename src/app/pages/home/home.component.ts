import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Contact } from '../../models/contact.model';
import { ContactInfoService } from '../../services/contact-info.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gridCols: number = 3;
  contactsList: Contact[] = [];

  constructor(
    private contactService: ContactInfoService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.setContactList();

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.gridCols = 1;
      } else {
        this.gridCols = 3;
      }
    });

  }

  setContactList() {
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      console.log(contacts);
      this.contactsList = contacts;
    });
  }

  onPageChange(event: PageEvent) {}
}
