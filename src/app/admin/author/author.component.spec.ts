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

import { AuthorComponent } from './author.component';
import { LmsService } from "../../../common/service/lms.service";
import { MockNgModuleResolver } from '@angular/compiler/testing';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("mock"));
}

describe('AuthorComponent', () => {
  let lmsService: LmsService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let fb: FormBuilder;
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

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
      declarations: [AuthorComponent],
      providers: [LmsService],
    })
      .compileComponents();
    lmsService = new LmsService(null);
    modalService = TestBed.get(NgbModal);
    fb = new FormBuilder();
    component = new AuthorComponent(lmsService, modalService, fb);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load components and call lifecycle methods', () => {
    spyOn(component, "loadAllAuthors");
    spyOn(component, "loadAllBooks");
    component.ngOnInit();
    expect(component.loadAllAuthors).toHaveBeenCalled;
    expect(component.loadAllBooks).toHaveBeenCalled;
  });

  it("should load authors from service", () => {
    const mockAuthors = [
      {
        authorId: 1,
        authorName: "author1",
        books: [{ bookId: 1, title: "book1" }, { bookId: 2, title: "book2" }]
      },
      {
        authorId: 2,
        authorName: "author2",
        books: [{ bookId: 1, title: "book3" }, { bookId: 2, title: "book4" }]
      }
    ];
    spyOn(lmsService, "get").and.returnValue(of(mockAuthors));
    component.ngOnInit();
    expect(component.authors).toEqual(mockAuthors);
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

  it("should open a modal window", fakeAsync(() => {
    const mockAuthors = [
      {
        authorId: 1,
        authorName: "author1",
        books: [{ bookId: 1, title: "book1" }, { bookId: 2, title: "book2" }]
      }
    ];

    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.open("updateAuthorModal", mockAuthors);
  }));

  it("should create a new author", () => {
    const mockAuthor = [
      {
        authorName: "author1",
        books: [{ bookId: 1, title: "book1" }, { bookId: 2, title: "book2" }]
      }
    ];

    spyOn(lmsService, "post").and.returnValue(of(null));
    spyOn(lmsService, "get").and.returnValue(of(mockAuthor));

    component.open("updateAuthorModal", mockAuthor);
    component.updateAuthor();
    expect(component.authors).toEqual(mockAuthor);
  });

  it('should delete an author', () => {
    const mockAuthor = [
      {
        authorName: "author1",
        books: [{ bookId: 1, title: "book1" }, { bookId: 2, title: "book2" }]
      }
    ];

    spyOn(lmsService, "delete").and.returnValue(of(null));
    spyOn(lmsService, "get").and.returnValue(of(mockAuthor));
    component.deleteAuthor(2);
    expect(component.authors).toEqual(mockAuthor);
  });

  it("should update an author with a new name", () => {
    component.initializeFormGroup();
    const mockAuthorUpdated = [
      {
        auhtorId: 1,
        authorName: "authorUpdated",
        books: [{ bookId: 1, title: "book1" }, { bookId: 2, title: "book2" }]
      }
    ];

    spyOn(lmsService, "put").and.returnValue(of(null));
    spyOn(component, "loadAllAuthors").and.returnValue(of(mockAuthorUpdated));

    component.open("updateAuthorModal", mockAuthorUpdated);
    component.updateAuthor();
    expect(component.authors).toEqual(mockAuthorUpdated);
  });
});