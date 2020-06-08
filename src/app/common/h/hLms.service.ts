import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HLmsService {
  constructor(private httpClient: HttpClient) {}

  get(url: string) {
    return this.httpClient.get(url);
  }

  put(url: string, input: any) {
    return this.httpClient.put(url, input);
  }

  post(url: string, input: any) {
    return this.httpClient.post(url, input);
  }

  delete(url: string) {
    return this.httpClient.delete(url);
  }

  readBorrower(cardNumber) {
    let promise = new Promise((resolve, reject) => {
      this.get(`${environment.borrowerBackendUrl}/${cardNumber}`)
        .toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  readBookCopies() {
    let promise = new Promise((resolve, reject) => {
      this.get(`${environment.borrowerBackendUrl}${environment.copiesUri}`)
        .toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
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

  returnBook(loan: any) {
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .put(
          `${environment.borrowerBackendUrl}${environment.returnBookUri}`,
          loan
        )
        .toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  checkOutBook(loan: any) {
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .post(
          `${environment.borrowerBackendUrl}${environment.checkOutBookUri}`,
          loan
        )
        .toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  processLoan(loan: any) {
    loan.branchName = this.setBranchNameOf(loan);
    loan.bookTitle = this.setBookTitleOf(loan);
  }

  processBookCopy(bookRef: any) {
    bookRef.branchName = this.setBranchNameOf(bookRef);
    bookRef.bookTitle = this.setBookTitleOf(bookRef);
  }
}
