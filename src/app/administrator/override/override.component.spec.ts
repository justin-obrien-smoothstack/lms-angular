import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OverrideComponent } from "./override.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("OverrideComponent", () => {
  let component: OverrideComponent;
  let fixture: ComponentFixture<OverrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
