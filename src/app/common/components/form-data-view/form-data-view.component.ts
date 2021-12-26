import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Employeedata } from 'src/app/employees';

export interface DialogData {
  empid: number;
}

@Component({
  selector: 'app-form-data-view',
  template: `
      <mat-card class="w-100" *ngIf="employeeData; else spinnerSection">
        <mat-card-header>
          <div mat-card-avatar class="example-header-image img-thumbnail" [ngClass]="{'male-profile' : employeeData.gender === 'male', 'female-profile' : employeeData.gender === 'female'}"></div>
          <mat-card-title>{{employeeData.fName}} {{employeeData.lName}}</mat-card-title>
          <mat-card-subtitle>{{employeeData.emailid}}</mat-card-subtitle>
        </mat-card-header>
        <mat-dialog-content>
        <mat-card-content>
          <div class="row mx-0">
           <div class="col-md-6 col-sm-12 col-xs-12">
             <mat-list>
               <mat-list-item><b class="pr-2">Gender:</b>  {{employeeData.gender}}</mat-list-item>
               <mat-list-item><b class="pr-2">Location:</b>  {{employeeData.location}}</mat-list-item>
               <mat-list-item><b class="pr-2">Avail Services:</b>  {{employeeData.chkformtext ? 'Yes' : 'No'}}</mat-list-item>
               <mat-list-item><b class="pr-2">Premium User:</b>  {{employeeData.chksubscribe ? 'Yes' : 'No'}}</mat-list-item>
               <mat-list-item><b class="pr-2">Joined On:</b>  {{employeeData.createdAt | date}}</mat-list-item>
               <mat-list-item><b class="pr-2">Passcode:</b>  <span class="text-danger">{{employeeData.password | hidePassCode}}</span></mat-list-item>
             </mat-list>
           </div>
           <div class="col-md-6 col-sm-12 col-xs-12">
           <img [src]="employeeData.avatar" class="img-fluid" [alt]="employeeData.fName + '' + employeeData.lName "/>
           </div>
          </div>
        </mat-card-content>
        </mat-dialog-content>
        <mat-divider></mat-divider>
        <mat-card-actions class="text-right">
          <button mat-raised-button color="primary" (click)="editEmpData()" [mat-dialog-close]="true">Edit Data</button>
          <button mat-raised-button color="warn" (click)="closeDialog()">Close</button>
        </mat-card-actions>
      </mat-card>
      <ng-template #spinnerSection>
        <mat-spinner></mat-spinner>
      </ng-template>
  `,
  styles: ['.example-header-image{width:60px;height:60px;border-radius:50%;background-position: center;background-size: cover}  .example-header-image.male-profile{background-image: url(../../../../assets/images/male-profile-placehoder.jpg)} .example-header-image.female-profile{background-image: url(../../../../assets/images/female-profile-placehoder.jpg)}']
})
export class FormDataViewComponent implements OnInit {
  
  employeeData: Employeedata;

  constructor(public dialogRef: MatDialogRef<FormDataViewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private api: ApiService, private _router: Router) { }

  ngOnInit() {
    this.api.getEmployee(this.data.empid).subscribe((data: Employeedata) => {
      this.employeeData = data;
    })
  }

  editEmpData(){
    this.api.subject$.next(true);
    this._router.navigate(['apidata/addemp']);
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
