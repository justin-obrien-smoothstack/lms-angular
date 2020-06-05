import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HLmsService } from "src/app/common/h/hLms.service";
import * as moment from "moment";
import { error } from "util";

@Component({
  selector: "app-borrower",
  templateUrl: "./borrower.component.html",
  styleUrls: ["./borrower.component.css"],
})
export class BorrowerComponent implements OnInit {
  // Borrower Login
  borrowerLogin = new FormGroup({
    cardNumber: new FormControl("", [
      Validators.min(1),
      Validators.pattern("^[0-9]*$"),
      Validators.required,
    ]),
  });
  loggedIn = false;
  borrower: any;
  borrowerNotFound = false;

  // Checkout Book Data
  availableBooks: any;
  branches = [];

  // Pagination
  page = 1;
  pageSize = 10;
  filterMetadata = { count: 0 };

  constructor(private lmsService: HLmsService) {}

  ngOnInit() {}

  onBorrowerLogin() {
    if (this.borrowerLogin.valid) {
      this.readBorrower(this.borrowerLogin.value.cardNumber);
    }
  }

  setupDashboard() {
    this.loadAllBooks();
    this.gatherLoanData();
    this.sortAllBranches();
  }

  gatherLoanData() {
    this.borrower.loans.forEach((element) => {
      this.lmsService.processLoan(element);
      element.dueDate = moment(element.dueDate).format("MM/DD/YYYY");
    });
  }

  sortAllBranches() {
    this.availableBooks.forEach((element) => {
      if (
        !this.branches.includes(element.branchName) &&
        element.branchName !== undefined
      ) {
        this.branches.push(element.branchName);
      }
    });
    this.changePaginationCount();
  }

  changePaginationCount() {
    this.filterMetadata.count = this.availableBooks.length;
  }

  // Functions using the service to get data from database
  readBorrower(cardNumber) {
    let borrowerPromise = this.lmsService.readBorrower(cardNumber);
    borrowerPromise
      .then((result) => {
        this.borrower = result;
        this.setupDashboard();
        this.loggedIn = true;
      })
      .catch((err) => {
        if (err.status == 404) {
          this.borrowerNotFound = true;
        }
      });
  }

  loadAllBooks() {
    let copiesPromise = this.lmsService.readBookCopies();
    copiesPromise
      .then((result) => {
        this.availableBooks = result;

        this.availableBooks.forEach((element) => {
          this.lmsService.processBookCopy(element);
        });
        this.changePaginationCount();
      })
      .catch((err) => {
        console.log(error);
      });
  }

  returnBook(loan) {
    let formattedLoan = {
      bookId: loan.bookId,
      branchId: loan.branchId,
      cardNo: loan.cardNo,
      dateOut: moment(loan.dateOut).format("YYYY-MM-DD HH:mm:ss").toString(),
    };
    let returnPromise = this.lmsService.returnBook(formattedLoan);

    returnPromise
      .then((result) => {
        this.readBorrower(this.borrower.cardNo);
      })
      .catch((error) => {
        console.log(error);
      });
    this.loadAllBooks();
  }

  checkOutBook(bookRef) {
    let newLoan = {
      bookId: bookRef.bookId,
      branchId: bookRef.branchId,
      cardNo: this.borrower.cardNo,
    };

    let checkOutPromise = this.lmsService.checkOutBook(newLoan);

    checkOutPromise
      .then((result) => {
        this.readBorrower(this.borrower.cardNo);
      })
      .catch((error) => {
        console.log(error);
      });
    this.loadAllBooks();
  }
}
