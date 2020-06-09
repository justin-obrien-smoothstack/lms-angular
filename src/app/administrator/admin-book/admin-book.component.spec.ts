import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminBookComponent } from "./admin-book.component";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

const mockBooks = [
  { title: "Mock Title", pubId: null, authorIds: [], genreIds: [] },
];

export class MockModalRef {
  result = new Promise((resolve) => resolve(null));
}

describe("AdminBookComponent", () => {
  let component: AdminBookComponent;
  let fixture: ComponentFixture<AdminBookComponent>;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;
  let mockModalRef = new MockModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookComponent, GetPropertyPipe, NiceSpacingPipe],
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
    fixture = TestBed.createComponent(AdminBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal window if book is null", fakeAsync(() => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("Create", "writePublisherModal", null);
    tick();
    expect(modalService.open).toHaveBeenCalled();
  }));

  it("should open a modal window if book is non-null", fakeAsync(() => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.authors = [];
    component.genres = [];
    component.publishers = [];
    component.openWriteModal("Update", "writePublisherModal", mockBooks[0]);
    tick();
    expect(modalService.open).toHaveBeenCalled();
  }));
});
