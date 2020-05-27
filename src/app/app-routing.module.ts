import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarianComponent } from './librarian/librarian.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "lms/librarian",
        component: LibrarianComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
