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

import { LibrarianComponent } from './librarian.component';
import { LmsService } from "../../common/service/lms.service";
import { MockNgModuleResolver } from '@angular/compiler/testing';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("mock"));
}

describe('LibrarianComponent', () => {
  let lmsService: LmsService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let fb: FormBuilder;
  let component: LibrarianComponent;
  let fixture: ComponentFixture<LibrarianComponent>;

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
      declarations: [LibrarianComponent],
      providers: [LmsService],
    })
      .compileComponents();
    lmsService = new LmsService(null);
    modalService = TestBed.get(NgbModal);
    fb = new FormBuilder();
    component = new LibrarianComponent(lmsService, modalService, fb);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load branches and books on lifecycle method: init', () => {
    spyOn(component, "loadAllBranches");
    spyOn(component, "loadAllBooks");
    component.ngOnInit();
    expect(component.loadAllBranches).toHaveBeenCalled;
    expect(component.loadAllBooks).toHaveBeenCalled;
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

  it("should load all books from service", () => {
    const mockBooks = [
      { bookId: 1, title: "book1" },
      { bookId: 2, title: "book2" },
      { bookId: 3, title: "book3" },
      { bookId: 4, title: "book4" }
    ];

    spyOn(lmsService, "get").and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(lmsService).toBeTruthy();
    expect(component.totalBooks).toEqual(mockBooks);
  });

  it('should update branch details', () => {
    const newBranch = {
      branchId: 1,
      branchName: "name",
      branchAddress: "address"
    }

    spyOn(lmsService, "put").and.returnValue(of(null));
    spyOn(lmsService, "get").and.returnValue(of(newBranch));

    component.openUpdate("updateBranchForm", newBranch);
    component.updateBranch();
    expect(component.branches).toEqual(newBranch);
  });

  it('should add book copies', () => {

  });

  it('should remove book copies', () => {

  });
});
