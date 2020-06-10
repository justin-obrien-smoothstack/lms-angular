import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "src/app//app-routing.module";
import { AppComponent } from "src/app//app.component";
import { ErrorComponent } from "src/app//error/error.component";
import { HomeComponent } from "src/app//home/home.component";
import { LayoutComponent } from "src/app//layout/layout.component";
import { HeaderComponent } from "src/app//layout/header/header.component";
import { FooterComponent } from "src/app//layout/footer/footer.component";
import { AdminAuthorComponent } from "src/app//administrator/admin-author/admin-author.component";
import { AdminBookComponent } from "src/app//administrator/admin-book/admin-book.component";
import { AdminBorrowerComponent } from "src/app//administrator/admin-borrower/admin-borrower.component";
import { AdminBranchComponent } from "src/app//administrator/admin-branch/admin-branch.component";
import { AdminGenreComponent } from "src/app//administrator/admin-genre/admin-genre.component";
import { AdminPublisherComponent } from "src/app//administrator/admin-publisher/admin-publisher.component";
import { LibrarianComponent } from "src/app//librarian/librarian.component";
import { BorrowerComponent } from "src/app//borrower/borrower.component";
import { AdministratorComponent } from "src/app//administrator/administrator.component";
import { OverrideComponent } from "src/app//administrator/override/override.component";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "src/app//common/o/pipes/nice-spacing.pipe";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ErrorComponent,
        HomeComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        LibrarianComponent,
        BorrowerComponent,
        AdministratorComponent,
        OverrideComponent,
        AdminAuthorComponent,
        AdminBookComponent,
        AdminBorrowerComponent,
        AdminBranchComponent,
        AdminGenreComponent,
        AdminPublisherComponent,
        GetPropertyPipe,
        NiceSpacingPipe,
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        NgMultiSelectDropDownModule,
        NgbPaginationModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
