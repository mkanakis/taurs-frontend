import { Component, OnInit, Input, Inject } from '@angular/core';
import { Room } from 'src/app/common/room';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;
  private title: string;
  private description: string;
  private link: any;
  private categoryId: string;
  private categories: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.description = data.description;
    this.link = data.link;
    this.categories = data.categories;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, [Validators.required]],
      description: [this.description, [Validators.required]],
      link: [this.link, [Validators.required]],
      categoryId: [, [Validators.required]]
    });
  }

  close() {
    console.log('close dialog');
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
