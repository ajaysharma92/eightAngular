import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassCode'
})
export class HidePassCodePipe implements PipeTransform {

  transform(value: any): any {
    if(value && value !== undefined){
      let passCode = value.slice(-5, value.length);
      return `*******${passCode}`;
    }
    return 'No Passcode Available';
  }

}
