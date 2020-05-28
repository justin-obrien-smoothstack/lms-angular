import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { LibrarianComponent } from "./librarian/librarian.component";
import { BorrowerComponent } from "./borrower/borrower.component";
import { AuthorComponent } from "./administrator/author/author.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { BookComponent } from "./administrator/book/book.component";
import { BranchComponent } from "./administrator/branch/branch.component";
import { PublisherComponent } from "./administrator/publisher/publisher.component";
import { GenreComponent } from "./administrator/genre/genre.component";
import { OverrideComponent } from "./administrator/override/override.component";
import { Routes, RouterModule } from "@angular/router";

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
        component: AuthorComponent,
      },
      {
        path: "lms/admin/book",
        component: BookComponent,
      },
      {
        path: "lms/admin/borrower",
        component: BorrowerComponent,
      },
      {
        path: "lms/admin/branch",
        component: BranchComponent,
      },
      {
        path: "lms/admin/genre",
        component: GenreComponent,
      },
      {
        path: "lms/admin/override",
        component: OverrideComponent,
      },
      {
        path: "lms/admin/publisher",
        component: PublisherComponent,
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
