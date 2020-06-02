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

  post(url: string, body: any = "") {
    return this.httpClient.post(url, body);
  }

  put(url: string, body: any = "") {
    return this.httpClient.put(url, body);
  }

  delete(url: string) {
    return this.httpClient.delete(url);
  }

  setBorrowerNameOf(input: any) {
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBorrowerUri}/${input.cardNo}`
      )
      .subscribe(
        (result: any[]) => (input.borrowerName = result[0].name),
        (error: any) => {
          input.borrowerName = "(error retrieving borrower name)";
          // do something with logger here
        }
      );
  }

  setBranchNameOf(input: any) {
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBranchUri}/${input.branchId}`
      )
      .subscribe(
        (result: any[]) => (input.branchName = result[0].branchName),
        (error: any) => {
          input.branchName = "(error retrieving branch name)";
          // do something with logger here
        }
      );
  }

  setBookTitleOf(input: any) {
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBookUri}/${input.bookId}`
      )
      .subscribe(
        (result) => (input.bookTitle = result[0].title),
        (error) => {
          input.bookTitle = "(error retrieving book title)";
          // do something with logger here
        }
      );
  }

  processLoan(loan: any) {
    loan.borrowerName = this.setBorrowerNameOf(loan);
    loan.branchName = this.setBranchNameOf(loan);
    loan.bookTitle = this.setBookTitleOf(loan);
  }
}
