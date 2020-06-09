import { Observable, from, of, observable, throwError } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HLmsService } from "src/app/common/h/hLms.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

//Mock modal reference class
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve("x"));
}

import { AdminGenreComponent } from "./admin-genre.component";

describe("AdminGenreComponent", () => {
  let component: AdminGenreComponent;
  let fixture: ComponentFixture<AdminGenreComponent>;
  let service: HLmsService;
  let modalService: NgbModal;
  let fb: FormBuilder;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  const mockGenres = [
    { genre_id: 0, genre_name: "Adventure" },
    { genre_id: 1, genre_name: "Action" },
  ];

  const mockSingleGenre = [{ genre_id: 1, genre_name: "Adventure" }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGenreComponent],
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
    component = new AdminGenreComponent(service, fb, modalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenreComponent);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load components and call life cycle methods", () => {
    spyOn(component, "loadAllGenres");
    component.ngOnInit();
    //tests
    expect(component.loadAllGenres).toHaveBeenCalled;
  });

  it("should load all authors via a mock-service - return mock data", () => {
    spyOn(service, "get").and.returnValue(of(mockGenres));
    component.ngOnInit();
    expect(service).toBeTruthy();
    expect(component.genres).toEqual(mockGenres);
    expect(component.genres.length).toEqual(2);
  });

  it("should open a modal window", () => {
    const mockGenre = { genre_id: 0, genre_name: "Adventure" };

    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("update", "writeGenreModal", mockGenre);
  });

  it("should open modal without genre", () => {
    spyOn(modalService, "open").and.returnValue(mockModalRef);
    component.openWriteModal("Create", "writeGenreModal", undefined);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.writeGenreForm.value.genre).toBeUndefined();
  });

  it("should delete a genre", () => {
    spyOn(service, "get").and.returnValue(of([]));

    component.genres = mockSingleGenre;

    spyOn(service, "delete").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.deleteGenre(1);
    expect(component.genres).toEqual([]);
  });

  it("should create a genre", () => {
    spyOn(service, "get").and.returnValue(
      of([
        { genre_id: 1, genre_name: "Adventure" },
        { genre_id: 2, genre_name: "New genre" },
      ])
    );

    component.genres = mockSingleGenre;

    component.initializeWriteGenreForm(mockSingleGenre[0]);
    component.writeGenreForm.value.name = "New genre";
    component.writeGenreForm.value.id = 2;

    spyOn(service, "post").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.writeGenre("Create");

    expect(component.genres).toEqual([
      { genre_id: 1, genre_name: "Adventure" },
      { genre_id: 2, genre_name: "New genre" },
    ]);
  });

  it("should update a genre", () => {
    spyOn(service, "get").and.returnValue(
      of([{ genre_id: 1, genre_name: "updated genre" }])
    );

    component.genres = mockSingleGenre;

    component.initializeWriteGenreForm(mockSingleGenre[0]);
    component.writeGenreForm.value.name = "updated genre";
    component.writeGenreForm.value.id = 1;

    spyOn(service, "put").and.returnValue(of({}));
    spyOn(window, "confirm").and.returnValue(true);

    component.writeGenre("Update");

    expect(component.genres).toEqual([
      { genre_id: 1, genre_name: "updated genre" },
    ]);
  });
});
