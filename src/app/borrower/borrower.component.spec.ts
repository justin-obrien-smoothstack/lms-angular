import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BorrowerComponent } from "./borrower.component";
import { HLmsService } from "../common/h/hLms.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  SortCopiesByBranchPipe,
  SortCopiesByTitlePipe,
} from "../common/h/sort-copies.pipe";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("BorrowerComponent", () => {
  let component: BorrowerComponent;
  let service: HLmsService;
  let fixture: ComponentFixture<BorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BorrowerComponent,
        SortCopiesByBranchPipe,
        SortCopiesByTitlePipe,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [HLmsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    service = new HLmsService(null);
    component = new BorrowerComponent(service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerComponent);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get a borrower", fakeAsync(() => {
    let mockBorrower = {
      cardNo: 3,
      name: "Esta Aldin",
      address: "570 Rowland Circle",
      phone: "906-381-0555",
      loans: [
        {
          bookId: 14,
          branchId: 1,
          cardNo: 3,
          dateOut: "2020-04-23T16:31:12.000Z",
          dueDate: "2020-05-14T09:11:47.000Z",
          dateIn: null,
        },
        {
          bookId: 15,
          branchId: 6,
          cardNo: 3,
          dateOut: "2020-04-27T16:38:08.000Z",
          dueDate: "2020-05-14T15:54:56.000Z",
          dateIn: null,
        },
        {
          bookId: 17,
          branchId: 6,
          cardNo: 3,
          dateOut: "2020-04-20T15:13:14.000Z",
          dueDate: "2020-04-23T18:42:22.000Z",
          dateIn: null,
        },
      ],
    };

    spyOn(service, "readBorrower").and.returnValue(
      Promise.resolve(mockBorrower)
    );
    component.readBorrower(3);
    tick();
    expect(service).toBeTruthy();
    expect(component.borrower).toEqual(mockBorrower);
  }));

  it("should be a valid login", () => {
    component.borrowerLogin.patchValue({ cardNumber: 23 });
    expect(component.borrowerLogin.valid).toBeTruthy();
  });

  it("should not be a valid login", () => {
    component.borrowerLogin.patchValue({ cardNumber: "f43" });
    expect(component.borrowerLogin.valid).toBeFalsy();
    component.borrowerLogin.patchValue({ cardNumber: 0 });
    expect(component.borrowerLogin.valid).toBeFalsy();
  });

  it("should sort branches", () => {
    component.availableBooks = [
      {
        bookId: 1,
        branchId: 1,
        noOfCopies: 0,
        branchName: "Central Park",
        bookTitle: "The Adventures of Huckleberry Finn",
      },
      {
        bookId: 1,
        branchId: 2,
        noOfCopies: 2,
        branchName: "Pflugerville",
        bookTitle: "The Adventures of Huckleberry Finn",
      },
      {
        bookId: 2,
        branchId: 1,
        noOfCopies: 1,
        branchName: "Central Park",
        bookTitle: "Pride and Prejudice",
      },
    ];
    component.sortAllBranches();
    expect(component.branches).toEqual(["Central Park", "Pflugerville"]);
  });

  it("should change pagination count", () => {
    component.availableBooks = [
      {
        bookId: 1,
        branchId: 1,
        noOfCopies: 0,
        branchName: "Central Park",
        bookTitle: "The Adventures of Huckleberry Finn",
      },
      {
        bookId: 1,
        branchId: 2,
        noOfCopies: 2,
        branchName: "Pflugerville",
        bookTitle: "The Adventures of Huckleberry Finn",
      },
      {
        bookId: 2,
        branchId: 1,
        noOfCopies: 1,
        branchName: "Central Park",
        bookTitle: "Pride and Prejudice",
      },
    ];
    component.changePaginationCount();
    expect(component.filterMetadata.count).toEqual(3);
  });

  it("should load all books", fakeAsync(() => {
    let mockBookCopies = [
      { bookId: 1, branchId: 1, noOfCopies: 0 },
      { bookId: 4, branchId: 2, noOfCopies: 7 },
      { bookId: 2, branchId: 3, noOfCopies: 1 },
    ];

    spyOn(service, "readBookCopies").and.returnValue(
      Promise.resolve(mockBookCopies)
    );
    component.loadAllBooks();
    tick();
    expect(service).toBeTruthy();
    expect(component.availableBooks).toEqual(mockBookCopies);
  }));

  it("should process the borrower loans", fakeAsync(() => {
    let formattedLoans = [
      {
        bookId: 2,
        branchId: 5,
        cardNo: 6,
        dateIn: "2020-06-05T14:36:42.000Z",
        dateOut: "2020-04-24T17:58:05.000Z",
        dueDate: "05/11/2020",
      },
    ];

    let unformattedLoans = [
      {
        bookId: 2,
        branchId: 5,
        cardNo: 6,
        dateIn: "2020-06-05T14:36:42.000Z",
        dateOut: "2020-04-24T17:58:05.000Z",
        dueDate: "2020-05-12T00:58:47.000Z",
      },
    ];

    spyOn(service, "processLoan").and.returnValue(
      Promise.resolve({
        bookId: 2,
        branchId: 5,
        cardNo: 6,
        dateIn: "2020-06-05T14:36:42.000Z",
        dateOut: "2020-04-24T17:58:05.000Z",
        dueDate: "05/11/2020",
      })
    );
    component.borrower = { loans: unformattedLoans };
    component.gatherLoanData();
    tick();
    expect(component.borrower).toEqual({ loans: formattedLoans });
  }));
});
