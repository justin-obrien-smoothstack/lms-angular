import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
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

import { AdminBookComponent } from "./admin-book.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

export class MockModalRef {
  result = new Promise((resolve) => resolve(null));
}

describe("AdminBookComponent", () => {
  let component: AdminBookComponent;
  let fixture: ComponentFixture<AdminBookComponent>;
  let lmsService: OLmsService;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;
  let mockModalRef = new MockModalRef();

  const mockBooks = [
      {
        bookId: 1,
        title: "Mock Book",
        pubId: 1,
        authorIds: [1, 2],
        genreIds: [1, 2],
      },
    ],
    mockPublishers = [
      {
        publisherId: 1,
        publisherName: "Mock Publisher 1",
        publisherAddress: null,
        publisherPhone: null,
        bookIds: [1, 2],
      },
      {
        publisherId: 2,
        publisherName: "Mock Publisher 2",
        publisherAddress: null,
        publisherPhone: null,
        bookIds: [2, 3],
      },
    ],
    mockAuthors = [
      { authorId: 1, authorName: "Mock Author 1", bookIds: [1, 2] },
      { authorId: 2, authorName: "Mock Author 2", bookIds: [1, 3] },
      { authorId: 3, authorName: "Mock Author 3", bookIds: [2, 3] },
    ],
    mockGenres = [
      { genre_id: 1, genre_name: "Mock Genre 1", bookIds: [1, 2] },
      { genre_id: 2, genre_name: "Mock Genre 2", bookIds: [1, 3] },
      { genre_id: 3, genre_name: "Mock Genre 3", bookIds: [2, 3] },
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookComponent, GetPropertyPipe, NiceSpacingPipe],
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
    component = new AdminBookComponent(formBuilder, modalService, lmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookComponent);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open a modal window if book is not given", () => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("Create", "writeBookModal", undefined);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writeBookForm.value.bookId).toBeNull();
    expect(component.writeBookForm.value.title).toBeNull();
    expect(component.writeBookForm.value.publisher).toBeNull();
    expect(component.writeBookForm.value.authors).toEqual([]);
    expect(component.writeBookForm.value.genres).toEqual([]);
  });

  it("should open a modal window if book is given", () => {
    spyOn(lmsService, "get").and.returnValues(
      of(mockBooks),
      of(mockAuthors),
      of(mockGenres),
      of(mockPublishers)
    );
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.ngOnInit();
    component.openWriteModal("Update", "writeBookModal", component.books[0]);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writeBookForm.value.bookId).toEqual(1);
    expect(component.writeBookForm.value.title).toEqual("Mock Book");
    expect(component.writeBookForm.value.publisher).toEqual([
      mockPublishers[0],
    ]);
    expect(component.writeBookForm.value.authors).toEqual(
      mockAuthors.slice(0, 2)
    );
    expect(component.writeBookForm.value.genres).toEqual(
      mockGenres.slice(0, 2)
    );
  });
});
