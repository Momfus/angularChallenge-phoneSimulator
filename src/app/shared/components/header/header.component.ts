import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormAddContactComponent } from '../../../components/form-add-contact/form-add-contact.component';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  `
    .title {
      font-size: clamp(12pt, calc(1.5vw + 2pt), 20pt);
    }

    .spacer {
      flex: 1 1 auto;
    }
  `
  ]
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}


  onDialogFormModal() {
    const dialogRef = this.dialog.open(FormAddContactComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { contact: Contact }) => {
        if (result && result.contact) {
          this.snackBarContactAdded(result.contact);
        }
      });
  }


  snackBarContactAdded( contact: Contact ) {

    this.snackBar.open(
      `Contact "${contact.name} " created`,
      'Close',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );

  }
}
