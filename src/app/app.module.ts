import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from './administrator/override/override.component';

@NgModule({
  declarations: [AppComponent, AdministratorComponent, OverrideComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
