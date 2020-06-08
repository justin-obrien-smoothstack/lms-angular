import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminBookComponent } from "./admin-book.component";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

describe("AdminBookComponent", () => {
  let component: AdminBookComponent;
  let fixture: ComponentFixture<AdminBookComponent>;

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
