import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BranchesComponent } from "./admin/branches/branches.component";
import { AuthorComponent } from "./admin/author/author.component";
import { LmsService } from "../common/service/lms.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { SlicePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { AdminBookComponent } from "./administrator/admin-book/admin-book.component";
import { AdminBorrowerComponent } from "./administrator/admin-borrower/admin-borrower.component";
import { AdminGenreComponent } from "./administrator/admin-genre/admin-genre.component";
import { AdminPublisherComponent } from "./administrator/admin-publisher/admin-publisher.component";
import { LibrarianComponent } from "./librarian/librarian.component";
import { BorrowerComponent } from "./borrower/borrower.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from "./administrator/override/override.component";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import {
  SortCopiesByTitlePipe,
  SortCopiesByBranchPipe,
} from "./common/h/sort-copies.pipe";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";
import { NiceSpacingPipe } from "./common/o/pipes/nice-spacing.pipe";
import { HLmsService } from "./common/h/hLms.service";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LibrarianComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BranchesComponent,
    AuthorComponent,
    HomeComponent,
    AdminGenreComponent,
    AdminBookComponent,
    AdminBorrowerComponent,
    AdminPublisherComponent,
    AdministratorComponent,
    OverrideComponent,
    BorrowerComponent,
    GetPropertyPipe,
    NiceSpacingPipe,
    SortCopiesByTitlePipe,
    SortCopiesByBranchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    NgbPaginationModule,
    FormsModule,
  ],
  providers: [OLmsService, LmsService, SlicePipe, HLmsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
