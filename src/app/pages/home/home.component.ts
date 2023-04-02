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
  totalCount: number = 0;
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

  setContactList(pageIndex: number = 0, pageSize: number = 9) {
    this.contactService.getContacts(pageIndex, pageSize).subscribe((contacts: Contact[]) => {
      console.log(contacts);
      this.contactsList = contacts;
    });


    this.contactService.getTotalCount().subscribe( total => this.totalCount = total );
  }

  onPageChange(event: PageEvent): void {
    this.setContactList(event.pageIndex, event.pageSize);
  }
}
