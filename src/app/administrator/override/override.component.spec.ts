import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { OverrideComponent } from "./override.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";

describe("OverrideComponent", () => {
  let component: OverrideComponent;
  let fixture: ComponentFixture<OverrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideComponent],
      imports: [NgbPaginationModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
