import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OLmsService {
  constructor(private httpClient: HttpClient) { }

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

  getBorrower(input: any) {
    return this.httpClient.get(
      `${environment.adminBackendUrl}${environment.readBorrowerUri}/${input.cardNo}`
    );
  }

  getBranch(input: any) {
    return this.httpClient.get(
      `${environment.adminBackendUrl}${environment.readBranchUri}/${input.branchId}`
    );
  }

  getBook(input: any) {
    return this.httpClient.get(
      `${environment.adminBackendUrl}${environment.readBookUri}/${input.bookId}`
    );
  }

  processLoan(loan: any) {
    this.getBorrower(loan).subscribe(
      (borrower) =>
        (loan.borrowerName =
          borrower[0].name !== null
            ? borrower[0].name
            : "(borrower name not found)"),
      (error) => (loan.borrowerName = "(error retrieving borrower name)")
    );
    this.getBranch(loan).subscribe(
      (branch) =>
        (loan.branchName =
          branch[0].branchName !== null
            ? branch[0].branchName
            : "(branch name not found)"),
      (error) => (loan.branchName = "(error retrieving branch name)")
    );
    this.getBook(loan).subscribe(
      (book) => (loan.bookTitle = book[0].title),
      (error) => (loan.bookTitle = "(error retrieving book title)")
    );
  }
}
