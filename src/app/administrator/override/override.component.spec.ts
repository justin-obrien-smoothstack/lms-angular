import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed,
  tick,
} from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";
import * as moment from "moment";

import { OverrideComponent } from "./override.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";

describe("OverrideComponent", () => {
  let component: OverrideComponent;
  let fixture: ComponentFixture<OverrideComponent>;
  let lmsService: OLmsService;

  const mockLoans = [
      {
        cardNo: 1,
        bookId: 1,
        branchId: 1,
        dateOut: new Date(2020, 0),
        dueDate: new Date(2020, 0, 8),
        dateIn: null,
      },
      {
        cardNo: 2,
        bookId: 2,
        branchId: 2,
        dateOut: new Date(2020, 0),
        dueDate: new Date(2020, 0, 8),
        dateIn: new Date(2020, 0, 9),
      },
    ],
    mockBorrowers = [
      { cardNo: 1, name: "Mock Borrower", address: null, phone: null },
      { cardno: 2, name: null, address: null, phone: null },
    ],
    mockBranches = [
      { branchId: 1, branchName: "Mock Branch", branchAddress: null },
      { branchId: 2, branchName: null, branchAddress: null },
    ],
    mockBooks = [
      {
        bookId: 1,
        title: "Mock Book 1",
        pubId: null,
        authorIds: [],
        genreIds: [],
      },
      {
        bookId: 2,
        title: "Mock Book 2",
        pubId: null,
        authorIds: [],
        genreIds: [],
      },
    ],
    mockLoansProcessed = [
      {
        cardNo: 1,
        bookId: 1,
        branchId: 1,
        dateOut: new Date(2020, 0),
        dueDate: new Date(2020, 0, 8),
        dateIn: null,
        borrowerName: "Mock Borrower",
        branchName: "Mock Branch",
        bookTitle: "Mock Book 1",
      },
      {
        cardNo: 2,
        bookId: 2,
        branchId: 2,
        dateOut: new Date(2020, 0),
        dueDate: new Date(2020, 0, 8),
        dateIn: new Date(2020, 0, 9),
        borrowerName: "(borrower name not found)",
        branchName: "(branch name not found)",
        bookTitle: "Mock Book 2",
      },
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideComponent],
      imports: [HttpClientModule, HttpClientTestingModule, NgbPaginationModule],
      providers: [OLmsService],
    }).compileComponents();
    lmsService = new OLmsService(null);
    component = new OverrideComponent(lmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideComponent);
    fixture.detectChanges();
    spyOn(lmsService, "get").and.returnValue(of(mockLoans));
    spyOn(lmsService, "getBorrower").and.returnValues(
      of([mockBorrowers[0]]),
      of([mockBorrowers[1]])
    );
    spyOn(lmsService, "getBranch").and.returnValues(
      of([mockBranches[0]]),
      of([mockBranches[1]])
    );
    spyOn(lmsService, "getBook").and.returnValues(
      of([mockBooks[0]]),
      of([mockBooks[1]])
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load overridable loans on initialization", fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.overridableLoans).toEqual(mockLoansProcessed);
  }));

  it("should send a PUT request to the backend's override URL", fakeAsync(() => {
    const mockLoan = mockLoansProcessed[0],
      overrideUri = `/loans/book/${mockLoan.bookId}/borrower/${
        mockLoan.cardNo
      }/branch/${mockLoan.branchId}/dateout/${moment(mockLoan.dateOut).format(
        "YYYY-MM-DDTHH_mm_ss"
      )}`;
    spyOn(window, "confirm").and.returnValue(true);
    spyOn(lmsService, "put").and.returnValue(of(null));
    component.doOverride(mockLoan);
    tick();
    expect(lmsService.put).toHaveBeenCalledWith(
      environment.adminBackendUrl + overrideUri
    );
  }));

  it("should not send a PUT request to the backend's override URL", () => {
    spyOn(window, "confirm").and.returnValue(false);
    spyOn(lmsService, "put").and.returnValue(of(null));
    component.doOverride(mockLoansProcessed[0]);
    expect(lmsService.put).not.toHaveBeenCalled();
  });
});
