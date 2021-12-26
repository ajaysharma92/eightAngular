import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  empid: number;
  empName: string;
}

@Component({
  selector: 'app-form-data-delete',
  template: `
    <mat-card>
      <h1 mat-dialog-title><mat-icon color="warn" aria-hidden="true">delete_forever</mat-icon> Confirm Delete</h1>
      <mat-card-header>
        <mat-card-title><b>{{data.empName}}</b> with Id: <span class="text-danger">{{data.empid}}</span></mat-card-title>
      </mat-card-header>
      <mat-divider></mat-divider>
      <mat-card-actions class="text-right my-2">
        <button mat-raised-button [mat-dialog-close]="data.empid" color="warn">Confirm</button>
        <button mat-button (click)="onClose()">Cancel</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ['mat-icon{position: relative; top:5px} button{outline: none;}']
})
export class FormDataDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormDataDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() {
  }

  onClose(){
    this.dialogRef.close();
  }

}
