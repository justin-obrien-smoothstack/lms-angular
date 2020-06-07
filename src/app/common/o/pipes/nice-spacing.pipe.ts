import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "niceSpacing",
})
export class NiceSpacingPipe implements PipeTransform {
  transform(inputArray: any): any {
    let outputString = "";
    inputArray.forEach((inputElement) => (outputString += inputElement + ", "));
    return outputString.substring(0, outputString.length - 2);
  }
}
