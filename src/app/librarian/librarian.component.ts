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
  constructor(private lmsService: LmsService,
    private modalService: NgbModal,
    private fb: FormBuilder
    ) {
      this.dropdownSettings = {
        singleSelection: false,
        idField: "bookId",
        textField: "title",
        inputField: "noOfCopies",
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
      .getAll(`${environment.adminUrl}${environment.readBanchesURI}`)
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
      .getAll(`${environment.adminUrl}${environment.readBooksURI}`)
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
      branchId: new FormControl(this.branchId),
    });
  }


  updateBranch() {
    const branch = {
      branchId: this.updateBranchForm.value.branchId,
      branchName: this.updateBranchForm.value.branchName,
      branchAddress: this.updateBranchForm.value.branchAddress, 
    }
    this.lmsService
    .postAll(`${environment.libUrl}${environment.updateBranchesURI}`, branch)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBookCopies(branch) {
    const bookCopies = {
      bookId: this.addBookCopiesForm.value.bookId,
      branchId: this.addBookCopiesForm.value.branchId,
      noOfCopies: this.addBookCopiesForm.value.noOfCopies,

    }
    this.lmsService
    .putAll(`${environment.libUrl}${environment.updateBranchesURI}/${branch}/copies`,bookCopies)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  open(content, obj) {
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

}
