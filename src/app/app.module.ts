import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BranchesComponent } from './admin/branches/branches.component';
import { AuthorComponent } from './admin/author/author.component';
import { LmsService } from '../common/service/lms.service';

@NgModule({
  declarations: [
    AppComponent,
    LibrarianComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BranchesComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule,
  ],
  providers: [LmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
