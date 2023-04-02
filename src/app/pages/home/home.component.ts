import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Contact } from '../../models/contact.model';
import { ContactInfoService } from '../../services/contact-info.service';
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
  ) {}

  ngOnInit(): void {
    this.setContactList();
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
