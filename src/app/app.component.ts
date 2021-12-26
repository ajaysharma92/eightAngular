import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core'; 
import { ApiService } from './api.service';
import { Smartphone } from './smartphone';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private modalRef
  @ViewChild('myModal', {static: false}) myModal;

  serverStatus = 'Server is Deactivated';
  allowUser = false;
  twoWayBind:string;

  constructor(private api: ApiService, private modalService : ModalManager, private vcr : ViewContainerRef){
    this.modalService.setDefaults({
        title: "new modal",
        size: "sm",
        modalClass: 'mymodal',
        hideCloseButton: true,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: true,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
    this.modalService.setRootViewContainerRef(this.vcr);
  }

  onUpdateServerName(event : any){
    this.twoWayBind = (<HTMLInputElement>event.target).value;
  }

}
