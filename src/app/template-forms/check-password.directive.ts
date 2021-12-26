import { Directive } from '@angular/core';
import { FormGroup, AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';

let isValid: boolean = false;

function validatePassword():ValidatorFn{
  return (control : AbstractControl) => {
    if (control && control instanceof FormGroup) {
      let group = control as FormGroup;
      if(group.controls['passwordA'] && group.controls['passwordB']){
        isValid = group.controls['passwordA'].value == group.controls['passwordB'].value;
      }
    }
    if(isValid){
      return null;
    }
    else{
      return {'passwordCheck' : 'failed'}
    }
  }
}

@Directive({
  selector: '[appCheckPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true}]
})
export class CheckPasswordDirective implements Validator{

  private valFn;
  constructor() {
    this.valFn = validatePassword();
  }

  validate(c: AbstractControl):ValidationErrors | null{
    return this.valFn(c);
  }

}
