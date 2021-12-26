import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAlphaUpper'
})
export class FirstAlphaUpperPipe implements PipeTransform {

  transform(value: string): any {
    if(value){
      let firstChar = value.slice(0, 1).toUpperCase();
      let exceptFirstChar = value.slice(1, value.length);
      return `${firstChar}${exceptFirstChar}`;
    }
    return value;
  }

}
