import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminPublisherComponent } from "./admin-publisher.component";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

const mockPublishers = [
  {
    publisherName: "Mock Name",
    publisherAddress: "Mock Address",
    publisherPhone: "Mock Phone",
    bookIds: [],
  },
];

export class MockModalRef {
  result = new Promise((resolve) => resolve(null));
}

describe("AdminPublisherComponent", () => {
  let component: AdminPublisherComponent;
  let fixture: ComponentFixture<AdminPublisherComponent>;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;
  let mockModalRef = new MockModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPublisherComponent, GetPropertyPipe, NiceSpacingPipe],
      imports: [
        HttpClientModule,
        NgbModule,
        NgbPaginationModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    modalService = TestBed.get(NgbModal);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal window if publisher is null", fakeAsync(() => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("Create", "writePublisherModal", null);
    tick();
    expect(modalService.open).toHaveBeenCalled();
  }));

  it("should open a modal window if publisher is non-null", fakeAsync(() => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.books = [];
    component.openWriteModal(
      "Update",
      "writePublisherModal",
      mockPublishers[0]
    );
    tick();
    expect(modalService.open).toHaveBeenCalled();
  }));
});
