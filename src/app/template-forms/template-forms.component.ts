import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, sample } from 'rxjs/operators';
import { User, Employee } from '../employees';
import { NgForm } from '@angular/forms';
import { AlertService } from '../common/alert/alert.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})

export class TemplateFormsComponent implements OnInit, AfterViewInit {

  @ViewChild('passwordA', {static: false}) passwordA: ElementRef<any>;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  
  countryLists:any;
  //model: any;
  model:any  = {}
  flagName: string;
  fName:string = 'Ajay';
  chkPassword:boolean = false;
  employeeLists: any;
  options = {
    autoClose: true,
    KeepAfterRouteChange: false
  }
  empDataSource: any;
  //const chkAgeMin:number = this.userAgeMin;

  constructor(private api : ApiService, private alertService: AlertService) { }
    
  empDisplayColumn = ['id', 'fName', 'usrLocation', 'chkSubTxt', 'action'];
  columns: any[] = [
    {
      name: 'id',
      title: 'S.No'
    },
    {
      name: 'fName',
      title: 'First Name'
    },
    {
      name: 'lName',
      title: 'Last Name'
    },
    {
      name: 'usrCountry',
      title: 'Location'
    },
    {
      name: 'chkSubTxt',
      title: 'Subscribe'
    }
  ];

  ngOnInit() {
    //this.model.passwordA = 12345;
    this.api.getCountryList2().subscribe(data => this.countryLists = data);
    this.model.usrCountry = "";
    
    this.callTblData();
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.passwordA);  
}
  onSubmit(event: NgForm) {
    //event.preventDefault();
    /**/
    this.api.createUserData(event.value).subscribe((data : {}) => {
      console.log('Template form data', data);
      //this.resetForm();
      this.callTblData();
    });
    //console.log(event.form.value);
    console.log(event.value);
    //console.log(this.model);
    //event.form.reset();
    this.resetForm(event);
    this.chkPassword = false;
    window.scrollTo(0, 0);
    this.alertService.success('Data Submitted Successfully', this.options);
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
  }

  setCountryFlag(value: string){
    this.flagName = value ? value.toLowerCase() : '';
    console.log(this.flagName);
  }

  comparePassword(){    
    let passwordA = document.getElementById('passwordA');
    let passwordB = document.getElementById('passwordB');
    if(this.model.passwordA === this.model.passwordB){
      this.chkPassword = true;
    }
    else{
      this.chkPassword = false;
    }
    /*if(passwordA.value === passwordB.value && !passwordB.value == ''){
      this.chkPassword = true;
    }
    else{
      this.chkPassword = false;
    }*/
  }

  resetForm(form?: NgForm){
    if(form != null) form.reset();
    this.model = {
      fName: '',
      lName: '',
      emailId: '',
      passwordA: '',
      passwordB: '',
      gender: '',
      usrCountry: '',
      chkFormTxt: false,
      chkSubTxt: false
    }
  }
  
  onView(empData, dataIndex){
    this.alertService.error(`View Data: ${empData} - Feature not implemented yet...`, this.options);
    console.log(dataIndex);
  }
  onDelete(empData, dataIndex){
    this.alertService.error(`Delete Data: ${empData} - Feature not implemented yet...`, this.options);
    console.log(dataIndex);
  }

  callTblData(){
    this.api.getEmpData().subscribe((data: {}) => {
      let listData = data as Array<object>;
      //this.employeeLists = listData;
      this.employeeLists = listData;
      //this.employeeLists = new MatTableDataSource(listData);
      
      console.log(this.employeeLists);
    })
  }

  drop(event:CdkDragDrop<string[]>){
    moveItemInArray(this.empDisplayColumn, event.previousIndex, event.currentIndex);
    console.log(this.empDisplayColumn);
  }
}
