import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Contact } from '../../models/contact.model';
import { ContactInfoService } from '../../services/contact-info.service';
import { LoadingService } from '../../services/loading.service';
import { FormContactComponent } from '../../components/form-contact/form-contact.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
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
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((c) => {
      this.setContactList(this.pageCurrent, this.pageSize);
    });
  }

  setContactList(pageIndex: number = 0, pageSize: number = 9) {
    this.loadingService.setToLoad(true);
    this.contactService.getContacts(pageIndex, pageSize).subscribe({
      next: (contacts: Contact[]) => {
        this.contactsList = contacts;

        if (this.contactsList.length === 0 && this.pageCurrent > 0) {
          this.pageCurrent--;
          this.paginator.pageIndex = this.pageCurrent;
          this.setContactList(this.pageCurrent, pageSize);
        }

        this.contactService
          .getTotalCount()
          .subscribe((total) => (this.totalCount = total));
      },
      error: (error: String) => {
        console.error(error);
      },
      complete: () => {
        this.loadingService.setToLoad(false, 500); // Added to fake time loading to simulate http request
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageCurrent = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setContactList(this.pageCurrent, this.pageSize);
  }

  onContactEdit(contact: Contact): void {
    const dialogRef = this.dialog.open(FormContactComponent, {
      width: '400px',
      data: contact,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { nameContact: string; type: string }) => {
        if (result) {
          if (result.type === 'edit') {
            this.snackBarContactNotification(result.nameContact, 'updated');
          } else {
            this.snackBarContactNotification(result.nameContact, 'deleted');
          }
        }
      });
  }

  onContactDelete(contactID: string): void {
    this.contactService.deleteContact(contactID);
  }

  snackBarContactNotification(name: string, action: string) {
    this.snackBar.open(`Contact "${name} " ${action}`, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
