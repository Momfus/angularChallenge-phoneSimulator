import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Contact } from '../../models/contact.model';
import { ContactInfoService } from '../../services/contact-info.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  gridCols: number = 3;
  totalCount: number = 0;
  contactsList: Contact[] = [];

  pageCurrent = 0;
  pageSize = 9;


  constructor(
    private contactService: ContactInfoService,
  ) {}

  ngOnInit(): void {

    this.contactService.contacts$.subscribe(
      c => {
        this.setContactList(this.pageCurrent, this.pageSize);
      }
    );

  }


  setContactList(pageIndex: number = 0, pageSize: number = 9) {
    this.contactService.getContacts(pageIndex, pageSize).subscribe({
      next: (contacts: Contact[]) => {

        this.contactsList = contacts;

        if (this.contactsList.length === 0 && this.pageCurrent > 0) {
          this.pageCurrent--;
          this.paginator.pageIndex = this.pageCurrent;
          this.setContactList(this.pageCurrent, pageSize);
        }


        this.contactService.getTotalCount().subscribe( total => this.totalCount = total );

      },
      error: ( error: String) => {
        console.error(error);

      },
      complete: () => {



      }
    });


  }

  onPageChange(event: PageEvent): void {
    this.pageCurrent = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setContactList(this.pageCurrent, this.pageSize);
  }

  onContactEdit(contactID: string): void {
    console.log('EDIT')
  }

  onContactDelete(contactID: string): void {
    this.contactService.deleteContact(contactID);
  }
}
