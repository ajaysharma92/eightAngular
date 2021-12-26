import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apidata',
  templateUrl: './apidata.component.html',
  styleUrls: ['./apidata.component.css']
})
export class ApidataComponent implements OnInit {
  sub :any;
  UrlTxt:any;
  tabsContents = [{
    templateDriven : 'Template Driven Forms' , 
    reactiveForms : 'Reactive Forms'
  }]
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.UrlTxt = params.id;
    });*/
  }

}
