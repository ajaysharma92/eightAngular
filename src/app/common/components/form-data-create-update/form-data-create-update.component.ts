import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CountryList, Employee, Employeedata } from 'src/app/employees';

@Component({
  selector: 'app-form-data-create-update',
  templateUrl: './form-data-create-update.component.html',
  styleUrls: ['./form-data-create-update.component.css']
})
export class FormDataCreateUpdateComponent implements OnInit, OnDestroy {

  currentRoute: string;
  event$;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  genderList: string[] = ['male', 'female'];
  hide: boolean = true;
  empID: number = null;
  singleEmployee = [];
  singleEmployee2: Employeedata;
  countryList: CountryList;
  selectCountryList;

  //Employee Avatar
  empProfileImg: string = 'https://dummyimage.com/500x300/000/10a4e3';
  empProfileName: string = 'Employee Profile Name';

  constructor(private _router: Router, private api: ApiService, private _formBuilder: FormBuilder, private _routeActive: ActivatedRoute) { 
    this.event$ = this._router.events.subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
      }
    })
  }

  ngOnInit() {
    this.api.getCountryList2().subscribe((data: CountryList) => {
      this.countryList = data;
      this.selectCountryList = data.name;
    })
    this.empID = this._routeActive.snapshot['params'].id;
    if(this.empID){
      this.api.getEmployee(this.empID).subscribe((data: Employeedata) => {
        this.singleEmployee.push(data);
        this.singleEmployee2 = this.singleEmployee[0];
        console.log('get single employee', this.singleEmployee[0]);
        this.firstFormGroup = this._formBuilder.group({
          firstName: [data.fName],
          lastName: [data.lName],
          emailid: [data.emailid],
          gender: [data.gender],
          country: [data.location],
          profileimage: ['']
        });
        this.secondFormGroup = this._formBuilder.group({
          password: [data.password],
          repassword: [data.password],
          termAndCondition: [data.chkformtext],
          subscription: [data.chksubscribe]
        });
        this.empProfileImg = data.avatar;
        this.empProfileName = data.fName+ ' '+ data.lName;
      })
    }
    this.firstFormGroup = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailid: [''],
      gender: [''],
      country: [''],
      profileimage: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      password: [''],
      repassword: [''],
      termAndCondition: [false],
      subscription: [false]
    });
  }

  getCountryName(value){
    this.selectCountryList = this.search(value);
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) { 
    let filter = value.toLowerCase();
    console.log('asdasd---', filter);
    return this.selectCountryList.filter(option => option.toLowerCase().startsWith(filter));
    //return this.selectCountryList.filter()
  }

  redirectToTable(){
    this._router.navigate(['/apidata']);
  }

  ngOnDestroy(): void {
      this.api.subject$.next(false);
  }
}
