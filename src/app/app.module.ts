import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponentComponent } from './error-component/error-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, ErrorComponentComponent, HomeComponentComponent, ErrorComponent, HomeComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
