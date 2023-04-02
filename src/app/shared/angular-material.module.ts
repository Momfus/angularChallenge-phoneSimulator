import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule { }
