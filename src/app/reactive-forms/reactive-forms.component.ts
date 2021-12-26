import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  reativeForm: FormGroup;

  ngOnInit() {
    //this.reativeForm = this.fb.group({})
  }

  /*onSubmit(data){
    console.log(data);
  }*/

}
