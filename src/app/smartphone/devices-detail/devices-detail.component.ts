import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-devices-detail',
  template: `
    <p class="text-center display-4">
      Now showing selected device details:
    </p>
    <br/>
    <ul class="list-group col-6 mx-auto" *ngIf="appendData && deviceDatas.id.length">
      <li class="list-group-item"><label class="h6 text-danger">Modal Number: </label><br/> {{deviceDatas.id}}</li>
      <li class="list-group-item"><label class="h6 text-danger">Modal Name:</label><br/> {{deviceDatas.name}}</li>
      <li class="list-group-item"><label class="h6 text-danger">Modal Descriptions:</label><br/> {{deviceDatas.desc | textShort}}</li>
      <li class="list-group-item"><label class="h6 text-danger">Modal Price:</label><br/> {{deviceDatas.price | currency }}</li>
      <li class="list-group-item"><label class="h6 text-danger">Modal Release Date:</label><br/> {{deviceDatas.updated}}</li>
      <li class="list-group-item border-0"><button class="btn btn-danger btn-sm float-right" (click)="clickOnBack()">Back</button></li>
    </ul>
  `,
  styles: []
})
export class DevicesDetailComponent implements OnInit {
 
  deviceDatas:any = {};
  id = this.routeActive.snapshot.params['id'];
  sessionData: any;
  appendData: boolean = false;

  constructor(private routeActive: ActivatedRoute, private route: Router, private api: ApiService, private location: Location) { }

  ngOnInit() {

    this.api.getDeviceDetails(this.id).subscribe((data: {}) => {
      this.deviceDatas = data;
      this.appendData = true;
      //console.log(this.deviceDatas);
    })

    this.sessionData = sessionStorage.getItem('CurrentUser');
    //let sessionDataGet = JSON.parse(this.sessionData);
    console.log('CurrentUser:', this.sessionData);
  }

  clickOnBack(){
    this.route.navigate(['/smartphone']);
    //this.location.back();
  }

}
