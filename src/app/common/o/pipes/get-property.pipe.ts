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
    entityNotFoundDefault?: any,
    propertyNotAssignedDefault?: any
  ): any[] {
    const output = [];
    let elementIndex: number, propertyValue: any;
    for (const key of keys) {
      elementIndex = mapping.findIndex(
        (element) =>
          element !== undefined && element !== null && element[keyName] === key
      );
      if (elementIndex === -1) {
        output.push(entityNotFoundDefault);
        continue;
      }
      propertyValue = mapping[elementIndex][propertyName];
      if (propertyValue === undefined || propertyValue === null) {
        output.push(propertyNotAssignedDefault);
        continue;
      }
      output.push(mapping[elementIndex][propertyName]);
    }
    return output;
  }
}
