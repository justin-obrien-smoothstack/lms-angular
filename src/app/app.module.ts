import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { OverrideComponent } from "./administrator/override/override.component";
import { OLmsService } from "src/app/common/o/services/oLms.service";

@NgModule({
  declarations: [AppComponent, AdministratorComponent, OverrideComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [OLmsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
