import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarianComponent } from './librarian/librarian.component';
import { LayoutComponent } from './layout/layout.component';
import { BranchesComponent } from './admin/branches/branches.component';
import { AuthorComponent } from './admin/author/author.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "lms/librarian",
        component: LibrarianComponent,
      },
      {
        path: "lms/admin/branches",
        component: BranchesComponent,
      },
      {
        path: "lms/admin/authors",
        component: AuthorComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
