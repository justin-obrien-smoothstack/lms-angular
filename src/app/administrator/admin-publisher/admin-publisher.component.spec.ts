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
import { environment } from "src/environments/environment";

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
    spyOn(modalService, "open").and.returnValue(null);
    spyOn(lmsService, "get").and.returnValues(
      of(mockPublishers),
      of(mockBooks),
      of(mockPublishers),
      of(mockBooks)
    );
    spyOn(lmsService, "post").and.returnValue(of(null));
    spyOn(lmsService, "put").and.returnValue(of(null));
    spyOn(lmsService, "delete").and.returnValue(of(null));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal window if publisher is not given", () => {
    component.openWriteModal("Create", "writePublisherModal", undefined);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writePublisherForm.value.publisherId).toBeNull();
    expect(component.writePublisherForm.value.publisherName).toBeNull();
    expect(component.writePublisherForm.value.publisherAddress).toBeNull();
    expect(component.writePublisherForm.value.publisherPhone).toBeNull();
    expect(component.writePublisherForm.value.books).toEqual([]);
  });

  it("should open a modal window if publisher is given", fakeAsync(() => {
    component.ngOnInit();
    tick();
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
  }));

  it("should send a POST request to the backend's create URL", fakeAsync(() => {
    spyOn(window, "confirm").and.returnValue(true);
    component.initializeWritePublisherForm(null);
    component.writePublisherForm.value.publisherName = "New Mock Publisher";
    component.writePublisherForm.value.publisherAddress = "New Mock Address";
    component.writePublisherForm.value.publisherPhone = "New Mock Phone";
    component.writePublisherForm.value.books = mockBooks.slice(2, 4);
    component.writePublisher("Create");
    tick();
    expect(lmsService.post).toHaveBeenCalledWith(
      environment.adminBackendUrl + environment.createPublisherUri,
      {
        publisherId: null,
        publisherName: "New Mock Publisher",
        publisherAddress: "New Mock Address",
        publisherPhone: "New Mock Phone",
        bookIds: [3, 4],
      }
    );
  }));

  it("should send a PUT request to the backend's update URL", fakeAsync(() => {
    spyOn(window, "confirm").and.returnValue(true);
    component.ngOnInit();
    tick();
    component.initializeWritePublisherForm(mockPublishers[0]);
    component.writePublisher("Update");
    tick();
    expect(lmsService.put).toHaveBeenCalledWith(
      environment.adminBackendUrl + environment.createPublisherUri,
      mockPublishers[0]
    );
  }));

  it("should not send a request to the backend's create or update URLs", () => {
    spyOn(window, "confirm").and.returnValue(false);
    component.writePublisher("Create");
    component.writePublisher("Update");
    expect(lmsService.post).not.toHaveBeenCalled();
    expect(lmsService.put).not.toHaveBeenCalled();
  });

  it("should send a request to the backend's delete URL", fakeAsync(() => {
    spyOn(window, "confirm").and.returnValue(true);
    component.deletePublisher(1);
    tick();
    expect(lmsService.delete).toHaveBeenCalledWith(
      environment.adminBackendUrl + environment.deletePublisherUri + "/1"
    );
  }));

  it("should not send a request to the backend's delete URL", fakeAsync(() => {
    spyOn(window, "confirm").and.returnValue(false);
    component.deletePublisher(1);
    tick();
    expect(lmsService.delete).not.toHaveBeenCalled();
  }));
});
