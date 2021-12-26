import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShort'
})
export class TextShortPipe implements PipeTransform {

  totalTxt: number = 20;

  transform(value: any) {
    if(value.length > this.totalTxt){
      return `${value.substr(0, this.totalTxt)}....`;
    }
    return value;
  }

}
