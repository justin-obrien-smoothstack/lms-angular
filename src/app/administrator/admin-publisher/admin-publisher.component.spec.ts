import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminPublisherComponent } from "./admin-publisher.component";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app/common/o/pipes/nice-spacing.pipe";

describe("AdminPublisherComponent", () => {
  let component: AdminPublisherComponent;
  let fixture: ComponentFixture<AdminPublisherComponent>;

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
