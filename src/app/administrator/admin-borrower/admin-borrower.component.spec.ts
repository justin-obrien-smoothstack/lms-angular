import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBorrowerComponent } from './admin-borrower.component';

describe('AdminBorrowerComponent', () => {
  let component: AdminBorrowerComponent;
  let fixture: ComponentFixture<AdminBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
