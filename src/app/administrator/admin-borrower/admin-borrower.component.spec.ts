import { of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HLmsService } from "src/app/common/h/hLms.service";
import { FormBuilder } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

//Mock modal reference class
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("x"));
}

import { AdminBorrowerComponent } from "./admin-borrower.component";

describe("AdminBorrowerComponent", () => {
  let component: AdminBorrowerComponent;
  let fixture: ComponentFixture<AdminBorrowerComponent>;
  let service: HLmsService;
  let modalService: NgbModal;
  let fb: FormBuilder;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  const mockBorrowers = [
    {
      cardNo: 0,
      name: "Test Name",
      address: "The Internet",
      phone: "123-456-7890",
    },
    {
      cardNo: 1,
      name: "Test Person",
      address: "The Web",
      phone: "789-345-1256",
    },
  ];

  const mockSingleBorrower = [
    {
      cardNo: 0,
      name: "Test Name",
      address: "The Internet",
      phone: "123-456-7890",
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBorrowerComponent],
      imports: [
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [HLmsService],
    }).compileComponents();
    service = new HLmsService(null);
    fb = new FormBuilder();
    modalService = TestBed.get(NgbModal);
    component = new AdminBorrowerComponent(service, fb, modalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBorrowerComponent);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load components and call life cycle methods", () => {
    spyOn(component, "loadAllBorrowers");
    component.ngOnInit();
    //tests
    expect(component.loadAllBorrowers).toHaveBeenCalled;
  });

  it("should load all authors via a mock-service - return mock data", () => {
    spyOn(service, "get").and.returnValue(of(mockBorrowers));
    component.ngOnInit();
    expect(service).toBeTruthy();
    expect(component.borrowers).toEqual(mockBorrowers);
    expect(component.borrowers.length).toEqual(2);
  });

  it("should open a modal window", () => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal(
      "update",
      "writeGenreModal",
      mockSingleBorrower[0]
    );
  });

  it("should open modal without genre", () => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("Create", "writeGenreModal", undefined);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writeBorrowerForm.value.genre).toBeUndefined();
  });

  it("should delete a genre", () => {
    spyOn(service, "get").and.returnValue(of([]));

    component.borrowers = mockSingleBorrower;

    spyOn(service, "delete").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.deleteBorrower(1);
    expect(component.borrowers).toEqual([]);
  });

  it("should create a genre", () => {
    spyOn(service, "get").and.returnValue(of(mockBorrowers));

    component.borrowers = mockSingleBorrower;

    component.initializeWriteBorrowerForm(mockSingleBorrower[0]);
    component.writeBorrowerForm.value.cardNo = 1;
    component.writeBorrowerForm.value.name = "Test Person";
    component.writeBorrowerForm.value.address = "The Web";
    component.writeBorrowerForm.value.phone = "789-345-1256";

    spyOn(service, "post").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.writeBorrower("Create");

    expect(component.borrowers).toEqual(mockBorrowers);
  });

  it("should update a genre", () => {
    spyOn(service, "get").and.returnValue(
      of([
        {
          cardNo: 0,
          name: "Test Name Updated",
          address: "The Internet 2.0",
          phone: "123-456-7890",
        },
      ])
    );

    component.borrowers = mockSingleBorrower;

    component.initializeWriteBorrowerForm(mockSingleBorrower[0]);
    component.writeBorrowerForm.value.name = "updated genre";
    component.writeBorrowerForm.value.id = 1;

    spyOn(service, "put").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.writeBorrower("Update");

    expect(component.borrowers).toEqual([
      {
        cardNo: 0,
        name: "Test Name Updated",
        address: "The Internet 2.0",
        phone: "123-456-7890",
      },
    ]);
  });
});
