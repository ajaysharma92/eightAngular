import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <div class="form-inline">
  <label for="exampleInputPassword1" class="mr-3">Age: </label>
  <button type="button" class="btn btn-warning btn-sm" (click)="onDecrement()" [disabled]="numCount === minNumber">-</button>
  <input type="text" class="font-weight-bold form-control-plaintext w-25 text-center" #counterInputVal [(ngModel)]="numCount" [disabled]="true"/>
  <button type="button" class="btn btn-success btn-sm" (click)="onIncrement()" [disabled]="numCount === maxNumber">+</button>
  <small class="text-danger">{{errMess}}</small>
  </div>
  `,
  styles: []
})
export class CounterComponent implements OnInit {
  
  @ViewChild('counterInputVal', {static: false}) counterInVal : ElementRef;
  @Input() minNumber: number;
  @Input() maxNumber: number;
  numCount: number;
  errMess: string;
  
  constructor() {}
  
  ngOnInit() {
    this.numCount = this.minNumber;
  }
  
  onIncrement(){
    //console.time();
    this.numCount++;
    //this.chkNumberValid(this.numCount, this.maxNumber, 'Max');
    if(this.numCount === this.maxNumber){
      this.errMess = 'Reach to Max Age Limit 30';
    }
    else{
      this.errMess = '';
    }
    //console.timeEnd();
  }

  onDecrement(){
    this.numCount--;
    console.log(this.counterInVal.nativeElement.value - 1);
    //this.chkNumberValid(this.numCount, this.minNumber, 'Min');
    if(this.numCount === this.minNumber){
      this.errMess = 'Reach to Min Age Limit 15';
    }
    else{
      this.errMess = '';
    }
  }

  /*chkNumberValid(i, j, k){
    if(i == j){
      alert(`Reach to ${k} Limit`);
    }
  }*/
}
