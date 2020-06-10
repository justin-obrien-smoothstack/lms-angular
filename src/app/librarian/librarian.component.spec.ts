import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LibrarianComponent } from "./librarian.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("LibrarianComponent", () => {
  let component: LibrarianComponent;
  let fixture: ComponentFixture<LibrarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
