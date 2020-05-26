import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OLmsService {
  constructor(private httpClient: HttpClient) {}

  get(url: string) {
    return this.httpClient.get(url);
  }

  getBorrowerName(cardNo: number) {
    let name: any;
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBorrowersUri}/${cardNo}`
      )
      .subscribe(
        (result) => (name = result[0].name),
        (error) => {
          name = "(error retrieving borrower name)";
          // do something with logger here
        }
      );
    return name;
  }
}
