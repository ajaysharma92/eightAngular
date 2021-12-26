import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  serverStatus = 'Server is Deactivated';
  titlePara = 'No Server was created till now';
  allowUser = false;
  constructor() { 
    setTimeout(() => {
      this.allowUser = true;
      this.serverStatus = 'Server is Activated';
  }, 2000)
  }

  ngOnInit() {
  }

}
