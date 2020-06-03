import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LmsService } from "../../../common/service/lms.service";
import { environment } from "../../../environments/environment";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
// the library branch has book copies which the librarian can change 

export class BranchesComponent implements OnInit {
  branches: any;
  books: any;
  branchId: number;
  selectedBranch: any;
  branchName: string;
  branchAddress: string;
  totalBooks: any;

  private modalRef: NgbModalRef;
  closeResult: any; 
  searchString: any;
  updateBranchForm: FormGroup;
  searchBranchForm: FormGroup;
  dropdownSettings: any;
  errMsg: any;

  constructor(    
    private lmsService: LmsService,
    private modalService: NgbModal,
    private fb: FormBuilder
    ) {
      this.dropdownSettings = {
        singleSelection: false,
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

  updateBranch() {
    const branch = {
      branchId: this.updateBranchForm.value.branchId,
      branchName: this.updateBranchForm.value.branchName,
      branchAddress: this.updateBranchForm.value.branchAddress, 
    }
    if (!branch.branchId) {
      this.lmsService
      .post(`${environment.adminBackendUrl}${environment.createBranchURI}`, branch)
      .subscribe(
        (res) => {
          console.log(res);
          this.loadAllBranches();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.lmsService
      .put(`${environment.adminBackendUrl}${environment.updateBanchUri}`, branch)
      .subscribe(
        (res) => {
          console.log(res);
          this.loadAllBranches();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }

  deleteBranch(branch) {
    this.lmsService
    .delete(`${environment.adminBackendUrl}${environment.deleteBranchUri}/${branch}`)
    .subscribe(
      (res) => {
        this.loadAllBranches();
      },
      (error) => {
        console.log(error);
      }
    )
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
