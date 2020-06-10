import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { RouterTestingModule } from "@angular/router/testing";
import { observable, from, of, Observable, throwError } from 'rxjs';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BranchesComponent } from './branches.component';
import { LmsService } from "../../../common/service/lms.service";
import { MockNgModuleResolver } from '@angular/compiler/testing';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("mock"));
}

describe('BranchesComponent', () => {
  let lmsService: LmsService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let fb: FormBuilder;
  let component: BranchesComponent;
  let fixture: ComponentFixture<BranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgMultiSelectDropDownModule,
        HttpClientTestingModule,
      ],
      declarations: [BranchesComponent],
      providers: [LmsService],
    })
      .compileComponents();
    lmsService = new LmsService(null);
    modalService = TestBed.get(NgbModal);
    fb = new FormBuilder();
    component = new BranchesComponent(lmsService, modalService, fb);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load branches on lifecycle method: onInit', () => {
    spyOn(component, "loadAllBranches");
    component.ngOnInit();
    expect(component.loadAllBranches).toHaveBeenCalled;
  });

  it('should load all branches on init', () => {
    const mockBranches = [
      {
        branchId: 1,
        branchName: "branch1",
        branchAddress: "address1",
        bookCopies: [
          {
            bookId: 1,
            branchId: 1,
            noOfCopies: 20
          }
        ]
      },
      {
        branchId: 2,
        branchName: "branch2",
        branchAddress: "address2",
        bookCopies: [
          {
            bookId: 2,
            branchId: 2,
            noOfCopies: 10
          }
        ]
      }
    ];
    spyOn(lmsService, "get").and.returnValue(of(mockBranches));
    component.ngOnInit();
    expect(component.branches).toEqual(mockBranches);
  });

  it("should create a new branch", () => {
    const newBranch = {
      branchName: "name",
      branchAddress: "address"
    }

    spyOn(lmsService, "post").and.returnValue(of(null));
    spyOn(lmsService, "get").and.returnValue(of(newBranch));

    component.open("updateBranchForm", newBranch);
    component.updateBranch();
    expect(component.branches).toEqual(newBranch);
  });

  it("should delete a branch", () => {
    const deleteBranch = {
      branchId: 1,
      branchName: "name",
      branchAddress: "address"
    }

    spyOn(lmsService, "get").and.returnValue(of(deleteBranch));
    spyOn(lmsService, "delete").and.returnValue(of(null));

    component.deleteBranch(2);
    expect(component.branches).toEqual(deleteBranch);
  });

  it("should update a branch with a new name", () => {
    component.initializeFormGroup();
    const mockUpdateBranch = [
      {
        branchId: 1,
        branchName: "branch",
        branchAddress: "Address"
      }
    ];

    spyOn(lmsService, "put").and.returnValue(of(null));
    spyOn(lmsService, "get").and.returnValue(of(mockUpdateBranch));

    component.open("updateAuthorModal", mockUpdateBranch);
    component.updateBranchForm.value.branchId = 1;
    component.updateBranchForm.value.branchName = "branch";
    component.updateBranchForm.value.branchAddress = "Address";

    component.updateBranch();
    expect(component.branches).toEqual(mockUpdateBranch);
  });
});
