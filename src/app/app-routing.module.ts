import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { ErrorComponent } from "./error/error.component";
import { LibrarianComponent } from "./librarian/librarian.component";
import { BorrowerComponent } from "./borrower/borrower.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { AdminAuthorComponent } from "./administrator/admin-author/admin-author.component";
import { AdminBookComponent } from "./administrator/admin-book/admin-book.component";
import { AdminBorrowerComponent } from "./administrator/admin-borrower/admin-borrower.component";
import { AdminBranchComponent } from "./administrator/admin-branch/admin-branch.component";
import { AdminGenreComponent } from "./administrator/admin-genre/admin-genre.component";
import { AdminPublisherComponent } from "./administrator/admin-publisher/admin-publisher.component";
import { OverrideComponent } from "./administrator/override/override.component";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from "./administrator/override/override.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "lms/home",
        pathMatch: "full",
      },
      {
        path: "lms/home",
        component: HomeComponent,
      },
      {
        path: "lms/admin",
        component: AdministratorComponent,
      },
      {
        path: "lms/admin/author",
        component: AdminAuthorComponent,
      },
      {
        path: "lms/admin/book",
        component: AdminBookComponent,
      },
      {
        path: "lms/admin/borrower",
        component: AdminBorrowerComponent,
      },
      {
        path: "lms/admin/branch",
        component: AdminBranchComponent,
      },
      {
        path: "lms/admin/genre",
        component: AdminGenreComponent,
      },
      {
        path: "lms/admin/override",
        component: OverrideComponent,
      },
      {
        path: "lms/admin/publisher",
        component: AdminPublisherComponent,
      },
      {
        path: "lms/borrower",
        component: BorrowerComponent,
      },
      {
        path: "lms/librarian",
        component: LibrarianComponent,
      },
      {
        path: "**",
        component: ErrorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
