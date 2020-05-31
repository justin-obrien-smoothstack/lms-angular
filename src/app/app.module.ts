import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AdminAuthorComponent } from "./administrator/admin-author/admin-author.component";
import { AdminBookComponent } from "./administrator/admin-book/admin-book.component";
import { AdminBorrowerComponent } from "./administrator/admin-borrower/admin-borrower.component";
import { AdminBranchComponent } from "./administrator/admin-branch/admin-branch.component";
import { AdminGenreComponent } from "./administrator/admin-genre/admin-genre.component";
import { AdminPublisherComponent } from "./administrator/admin-publisher/admin-publisher.component";
import { LibrarianComponent } from "./librarian/librarian.component";
import { BorrowerComponent } from "./borrower/borrower.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from "./administrator/override/override.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { GetPropertyPipe } from "src/app/common/o/pipes/get-property.pipe";

@NgModule({
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [OLmsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
