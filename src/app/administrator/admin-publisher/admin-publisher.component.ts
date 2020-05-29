import { Component, OnInit } from "@angular/core";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-publisher",
  templateUrl: "./admin-publisher.component.html",
  styleUrls: ["./admin-publisher.component.css"],
})
export class AdminPublisherComponent implements OnInit {
  publishers: any[];
  books: any[];

  constructor(private lmsService: OLmsService) {}

  ngOnInit() {
    this.readPublishers();
  }

  readPublishers() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readPublisherUri}`)
      .subscribe(
        (result: object[]) => (this.publishers = result),
        (error: any) => {
          // do something with a logger here
          this.publishers = [];
          alert(error);
        }
      );
  }

  readBooks() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBookUri}`)
      .subscribe(
        (result: object[]) => (this.books = result),
        (error: any) => {
          // do something with a logger here
          this.books = [];
          alert(error);
        }
      );
  }
}
