import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminBookComponent } from "./admin-book.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("AdminBookComponent", () => {
  let component: AdminBookComponent;
  let fixture: ComponentFixture<AdminBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
