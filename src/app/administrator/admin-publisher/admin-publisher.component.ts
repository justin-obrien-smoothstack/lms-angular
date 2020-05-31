import { Component, OnInit } from "@angular/core";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-admin-publisher",
  templateUrl: "./admin-publisher.component.html",
  styleUrls: ["./admin-publisher.component.css"],
})
export class AdminPublisherComponent implements OnInit {
  publishers: any[];
  books: any[];
  writePublisherForm: FormGroup = this.formBuilder.group({
    publisherName: [""],
    publisherAddress: [""],
    publisherPhone: [""],
    bookIds: [[]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private lmsService: OLmsService
  ) {}

  ngOnInit() {
    this.readPublishers();
    this.readBooks();
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
    this.books = [];
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBookUri}`)
      .subscribe(
        (result: any[]) => {
          for (const book of result) this.books[book.bookId] = book;
        },
        (error: any) => {
          // do something with a logger here
          alert(error);
        }
      );
  }
}
