import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-phonechild',
  template: `
    <b>{{phoneCount}}</b><br/>
    <button class="btn btn-sm mt-2" (click)="tableShowHide()" [ngClass]="toggle ? 'btn-danger' : 'btn-success'"><i class="fa" [ngClass]="toggle ? 'fa-eye-slash' : 'fa-eye'"></i> {{toggle ? 'Hide' : 'Show'}} Data</button>
    <br/>
    {{servicesMessg}}
  `,
  styles: []
})
export class PhonechildComponent implements OnInit {

  @Input() phoneCount:number;
  @Output() showHideEvent = new EventEmitter<boolean>();

  toggle:boolean = false;
  servicesMessg:string;

  constructor(private api:ApiService) {
    
  }

  ngOnInit() {
    this.api.currentMessage.subscribe(message => this.servicesMessg = message);
    this.toggle = JSON.parse(sessionStorage.getItem('toggleKey'));
  }

  tableShowHide(){
    this.toggle = !this.toggle;
    sessionStorage.setItem('toggleKey', JSON.stringify(this.toggle));
    this.showHideEvent.emit(this.toggle);
    
    /*if(){
      this.toggle = false;
    }
    else{
      this.toggle = true;
    }*/
    
    //let finalKey:any = sessionStorage.setItem('toggleKey', this.toggle.toString());
    //finalKey == "true" ? true : false;
    //console.log(finalKey);
  }

}
