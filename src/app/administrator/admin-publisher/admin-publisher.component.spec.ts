import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";

import { AdminPublisherComponent } from "./admin-publisher.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

describe("AdminPublisherComponent", () => {
  let component: AdminPublisherComponent;
  let fixture: ComponentFixture<AdminPublisherComponent>;
  let lmsService: OLmsService;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;

  const mockPublishers = [
      {
        publisherId: 1,
        publisherName: "Mock Publisher",
        publisherAddress: "Mock Publisher Address",
        publisherPhone: "Mock Publisher Phone",
        bookIds: [1, 2],
      },
    ],
    mockBooks = [
      {
        bookId: 1,
        title: "Mock Book 1",
        pubId: 1,
        authorIds: [],
        genreIds: [],
      },
      {
        bookId: 2,
        title: "Mock Book 2",
        pubId: 1,
        authorIds: [],
        genreIds: [],
      },
      {
        bookId: 3,
        title: "Mock Book 3",
        pubId: 2,
        authorIds: [],
        genreIds: [],
      },
      {
        bookId: 4,
        title: "Mock Book 4",
        pubId: null,
        authorIds: [],
        genreIds: [],
      },
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPublisherComponent, GetPropertyPipe, NiceSpacingPipe],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        NgbModule,
        NgbPaginationModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
      ],
      providers: [OLmsService],
    }).compileComponents();
    formBuilder = new FormBuilder();
    lmsService = new OLmsService(null);
    modalService = TestBed.get(NgbModal);
    component = new AdminPublisherComponent(
      formBuilder,
      modalService,
      lmsService
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublisherComponent);
    fixture.detectChanges();
    spyOn(lmsService, "get").and.returnValues(
      of(mockPublishers),
      of(mockBooks)
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal window if publisher is not given", () => {
    spyOn(modalService, "open").and.returnValue(null);
    component.openWriteModal("Create", "writePublisherModal", undefined);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writePublisherForm.value.publisherId).toBeNull();
    expect(component.writePublisherForm.value.publisherName).toBeNull();
    expect(component.writePublisherForm.value.publisherAddress).toBeNull();
    expect(component.writePublisherForm.value.publisherPhone).toBeNull();
    expect(component.writePublisherForm.value.books).toEqual([]);
  });

  it("should open a modal window if publisher is given", () => {
    spyOn(modalService, "open").and.returnValue(null);
    component.ngOnInit();
    component.openWriteModal(
      "Update",
      "writePublisherModal",
      component.publishers[0]
    );
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writePublisherForm.value.publisherId).toEqual(1);
    expect(component.writePublisherForm.value.publisherName).toEqual(
      "Mock Publisher"
    );
    expect(component.writePublisherForm.value.publisherAddress).toEqual(
      "Mock Publisher Address"
    );
    expect(component.writePublisherForm.value.publisherPhone).toEqual(
      "Mock Publisher Phone"
    );
    expect(component.writePublisherForm.value.books).toEqual(
      mockBooks.slice(0, 2)
    );
  });

  xit("should send a request to the backend's create URL", () => {
    spyOn(window, "confirm").and.returnValue(true);
    spyOn(lmsService, "post").and.returnValue(of(null));
    component.writePublisher("Create");
    expect(lmsService.post).toHaveBeenCalledWith();
  });

  it("should not send a request to the backend's create or update URLs", () => {
    spyOn(window, "confirm").and.returnValue(false);
    spyOn(lmsService, "post").and.returnValue(of(null));
    spyOn(lmsService, "put").and.returnValue(of(null));
    component.writePublisher("Create");
    component.writePublisher("Update");
    expect(lmsService.post).not.toHaveBeenCalled();
    expect(lmsService.put).not.toHaveBeenCalled();
  });
});
