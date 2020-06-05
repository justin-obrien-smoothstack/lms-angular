import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LmsService } from "../../common/service/lms.service";
import { environment } from "../../environments/environment";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})

// the librarian has the right to change the  number of copies held by a branch at any given time. 
export class LibrarianComponent implements OnInit {
  branches: any;
  branchId: number;
  bookId: number;
  noOfCopies: number;
  branchName: string;
  branchAddress: string;
  selectedBranch: any;
  bookCopies: any;
  books: any;
  totalBooks: any;

  private modalRef: NgbModalRef;
  closeResult: any;
  searchString: any;
  updateBranchForm: FormGroup;
  addBookCopiesForm: FormGroup;
  searchBranchForm: FormGroup;
  dropdownSettings: any;
  errMsg: any;
  constructor(
    private lmsService: LmsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: "bookId",
      textField: "title",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    }
  }


  ngOnInit() {
    this.loadAllBranches();
    this.loadAllBooks();
    this.initializeFormGroup();
  }

  loadAllBranches() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBanchUri}`)
      .subscribe(
        (res) => {
          this.branches = res;
          this.branches.forEach(branch => {
            branch.books = [];
            branch.bookCopies.forEach(element => {
              branch.books.push({
                title: element.title,
                noOfCopies: element.noOfCopies,
              });
            });
          });
        },
        (error) => {
          debugger;
        }
      );
  }

  loadAllBooks() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBookUri}`)
      .subscribe(
        (res) => {
          this.totalBooks = res;

        },
        (error) => {
          debugger;
        }
      );
  }

  initializeFormGroup() {
    this.updateBranchForm = new FormGroup({
      branchName: new FormControl(this.branchName, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      branchAddress: new FormControl(this.branchAddress, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      bookId: new FormControl(this.bookId),
      noOfCopies: new FormControl(this.noOfCopies),
      branchId: new FormControl(this.branchId),
      books: new FormControl(this.books),
    });
  }


  updateBranch() {
    const branch = {
      branchId: this.updateBranchForm.value.branchId,
      branchName: this.updateBranchForm.value.branchName,
      branchAddress: this.updateBranchForm.value.branchAddress,
    }
    this.lmsService
      .put(`${environment.libUrl}${environment.updateBanchUri}`, branch)
      .subscribe(
        (res) => {
          console.log(res);
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      );
  }


  openUpdate(content, obj) {
    if (obj !== null) {
      //this is edit/update mode
      this.updateBranchForm = this.fb.group({
        branchId: obj.branchId,
        branchName: obj.branchName,
        branchAddress: obj.branchAddress,
      });
    }

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = `Dismissed`;
      }
    );
  }

  openAdd(content, obj) {
    if (obj !== null) {
      this.addBookCopiesForm = this.fb.group({
        books: [obj.books],
        bookId: obj.bookCopies.bookId,
        branchId: obj.branchId,
        noOfCopies: obj.bookCopies.noOfCopies,
        bookCopies: obj.bookCopies,
      })
    }

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = `Dismissed`;
      }
    );
  }

  updateBookCopies() {
    const bookCopies = {
      books: this.addBookCopiesForm.value.books,
      bookId: this.addBookCopiesForm.value.bookId,
      branchId: this.addBookCopiesForm.value.bookCopies.branchId,
      noOfCopies: this.addBookCopiesForm.value.noOfCopies,
    }
    bookCopies.bookId = bookCopies.books[0].bookId;
    this.lmsService
      .put(`${environment.libUrl}${environment.updateBanchUri}/${bookCopies.branchId}/copies`, bookCopies)
      .subscribe(
        (res) => {
          console.log(res);
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      )
  }


}
