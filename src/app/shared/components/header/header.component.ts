import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormContactComponent } from '../../../components/form-contact/form-contact.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .title {
        font-size: clamp(9pt, 1.5vw + 2pt, 20pt);
      }

      .spacer {
        flex: 1 1 auto;
      }

      .mat-toolbar button {
        font-size: clamp(9pt, 1.5vw + 2pt, 12pt);
        padding: 8px 16px; /* ajusta el tamaño del botón */
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  onDialogFormModal() {
    const dialogRef = this.dialog.open(FormContactComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { nameContact: string; type: string }) => {
        if (result && result.type === 'new') {
          this.snackBarContactAdded(result.nameContact);
        }
      });
  }

  snackBarContactAdded(name: string) {
    this.snackBar.open(`Contact "${name} " created`, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
