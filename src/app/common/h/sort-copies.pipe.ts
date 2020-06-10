import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortCopiesByTitle",
})
export class SortCopiesByTitlePipe implements PipeTransform {
  transform(items: any[], term, filterMetadata): any {
    if (term) {
      let filteredArray = items.filter(
        (item) =>
          item.bookTitle.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
      filterMetadata.count = filteredArray.length;
      return filteredArray;
    } else {
      filterMetadata.count = items.length;
      return items;
    }
  }
}

@Pipe({
  name: "sortCopiesByBranch",
})
export class SortCopiesByBranchPipe implements PipeTransform {
  transform(items: any[], term, filterMetadata): any {
    console.log(term);
    if (term === "All Branches") {
      filterMetadata.count = items.length;
      return items;
    }

    if (term) {
      let filteredArray = items.filter(
        (item) => item.branchName.indexOf(term) !== -1
      );
      filterMetadata.count = filteredArray.length;
      return filteredArray;
    } else {
      return items;
    }
  }
}
