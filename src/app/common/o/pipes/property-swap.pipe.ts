import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertySwap'
})
export class PropertySwapPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
