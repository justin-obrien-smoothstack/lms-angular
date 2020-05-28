import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { LibrarianComponent } from './librarian/librarian.component';
import { BorrowerComponent } from './borrower/borrower.component';
import { AuthorComponent } from './administrator/author/author.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { BookComponent } from './administrator/book/book.component';
import { BranchComponent } from './administrator/branch/branch.component';
import { PublisherComponent } from './administrator/publisher/publisher.component';
import { GenreComponent } from './administrator/genre/genre.component';
import { OverrideComponent } from './administrator/override/override.component';

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
    AuthorComponent,
    AdministratorComponent,
    BookComponent,
    BranchComponent,
    PublisherComponent,
    GenreComponent,
    OverrideComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
