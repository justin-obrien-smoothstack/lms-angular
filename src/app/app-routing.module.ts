import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from "./administrator/override/override.component";

const routes: Routes = [
  { path: "lms/admin", component: AdministratorComponent },
  { path: "lms/admin/loans", component: OverrideComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
