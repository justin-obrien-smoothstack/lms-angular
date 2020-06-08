import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";

import { OverrideComponent } from "./override.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";

describe("OverrideComponent", () => {
  let component: OverrideComponent;
  let fixture: ComponentFixture<OverrideComponent>;
  let lmsService: OLmsService;
  const mockLoans = [
    {
      cardNo: 6,
      branchId: 29,
      bookId: 14,
      dateOut: new Date("2020-05-15T22:55:38.000Z"),
      dueDate: new Date("2020-05-22T22:55:38.000Z"),
      dateIn: new Date("2020-05-22T22:56:00.000Z"),
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideComponent],
      imports: [NgbPaginationModule, HttpClientModule],
    }).compileComponents();
    lmsService = new OLmsService(null);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(lmsService, "get").and.returnValue(of(mockLoans));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the backend's override function", () => {
    spyOn(window, "confirm").and.returnValue(true);
    spyOn(lmsService, "put").and.returnValue(null);
    component.doOverride(mockLoans[0]);
    expect(lmsService.put).toHaveBeenCalled;
  });

  it("should not call the backend's override function", () => {
    spyOn(window, "confirm").and.returnValue(false);
    spyOn(lmsService, "put").and.returnValue(null);
    component.doOverride(mockLoans[0]);
    expect(lmsService.put).not.toHaveBeenCalled;
  });
});
