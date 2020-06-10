import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BranchesComponent } from "./branches.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("BranchesComponent", () => {
  let component: BranchesComponent;
  let fixture: ComponentFixture<BranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
