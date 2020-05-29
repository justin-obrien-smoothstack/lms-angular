import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "getProperty",
})
export class GetPropertyPipe implements PipeTransform {
  transform(
    keys: any[],
    keyName: string,
    propertyName: string,
    mapping: any[],
    defaultValue?: any
  ): any[] {
    const output = [];
    let elementIndex: number;
    for (const key of keys) {
      elementIndex = mapping.findIndex((element) => element[keyName] === key);
      if (elementIndex === -1) output.push(defaultValue);
      else output.push(mapping[elementIndex][propertyName]);
    }
    return output;
  }
}
