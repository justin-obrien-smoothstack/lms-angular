import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OLmsService {
  constructor(private httpClient: HttpClient) {}

  post(url: string, body: any = "") {
    return this.httpClient.post(url, body, { responseType: "text" });
  }

  get(url: string) {
    return this.httpClient.get(url);
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
        (borrowers: any[]) =>
          (input.borrowerName =
            borrowers[0].name !== null
              ? borrowers[0].name
              : "(borrower name not found)"),
        (error: any) => {
          input.borrowerName = "(error retrieving borrower name)";
        }
      );
  }

  setBranchNameOf(input: any) {
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBranchUri}/${input.branchId}`
      )
      .subscribe(
        (branches: any[]) =>
          (input.branchName =
            branches[0].branchName !== null
              ? branches[0].branchName
              : "(branch name not found)"),
        (error: any) => {
          input.branchName = "(error retrieving branch name)";
        }
      );
  }

  setBookTitleOf(input: any) {
    this.httpClient
      .get(
        `${environment.adminBackendUrl}${environment.readBookUri}/${input.bookId}`
      )
      .subscribe(
        (books) => (input.bookTitle = books[0].title),
        (error) => {
          input.bookTitle = "(error retrieving book title)";
        }
      );
  }

  processLoan(loan: any) {
    loan.borrowerName = this.setBorrowerNameOf(loan);
    loan.branchName = this.setBranchNameOf(loan);
    loan.bookTitle = this.setBookTitleOf(loan);
  }
}
