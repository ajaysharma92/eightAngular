import { Component, OnInit, Input } from '@angular/core';
import { Smartphone } from '../smartphone';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrls: ['./smartphone.component.css'],
  animations:[
    trigger('showHideState', [
      state('false', style({
        display: 'none',
        opacity: 0
      })),
      state('true' , style({
        opacity: 1,
        display: 'table'
      })),
      transition('true => false', animate('600ms ease-out')),
      transition('false => true', animate('600ms ease-in')),
    ])
  ]
})

export class SmartphoneComponent implements OnInit {

  serverStatus = 'Server is Deactivated';
  titlePara = 'No Server was created till now';
  allowUser = false;
  twoWayBind:string;
  smartphone: Smartphone[] = [];
  headers:any;
  deviceDatas:any = [];
  fromParent:number = 12345;
  //sessionKey = sessionStorage.getItem('toggleKey');
  toggle:boolean = false;

  constructor(private api: ApiService, private router : Router) {
    setTimeout(() => {
      this.allowUser = true;
      this.serverStatus = 'Server is Activated';
    }, 2000)

    this.getSmartPhones();
  }
  
  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('toggleKey'))){
      this.toggle = JSON.parse(sessionStorage.getItem('toggleKey'));
    }
    console.log(this.toggle);
    //this.fromParent = this.deviceDatas.length;
  }

  getSmartPhones(){
    this.api.getSmartPhone()
    .subscribe((data) => {
      this.deviceDatas = data;
      this.phoneListCount(this.deviceDatas.length);
    });
  }

  onSelect(smartphone){
    sessionStorage.setItem('CurrentUser', smartphone);
  }

  phoneListCount(phoneNumber){
    this.fromParent = phoneNumber;
  }

  receiveChildMessg($event){
    this.toggle = $event;
  }
  /*onSelect(smartphone){
    this.router.navigate(['/smartphone', smartphone.id]);
    console.log(smartphone.id);
  }
  onSelect(smartphone){
    this.router.navigate(['/smartphonedetail'], {queryParams: {smartdevice: JSON.stringify(smartphone)}});
  }*/
}
