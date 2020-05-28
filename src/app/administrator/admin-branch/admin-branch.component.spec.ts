import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchComponent } from './admin-branch.component';

describe('AdminBranchComponent', () => {
  let component: AdminBranchComponent;
  let fixture: ComponentFixture<AdminBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
