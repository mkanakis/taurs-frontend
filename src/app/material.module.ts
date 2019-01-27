import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatToolbar, MatToolbarModule, MatCardModule, MatIconModule, MatPaginatorModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatButtonToggleModule, MatProgressBarModule, MatSliderModule, MatDialog, MatDialogModule, MatChip, MatChipsModule } from "@angular/material";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSliderModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSliderModule,
    MatDialogModule,
    MatChipsModule
  ]
})
export class MaterialModule { }
