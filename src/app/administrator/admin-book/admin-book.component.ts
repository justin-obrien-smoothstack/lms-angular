import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { maxLength } from "src/app/common/o/constants";
import { OLmsService } from "src/app/common/o/services/oLms.service";

@Component({
  selector: "app-admin-book",
  templateUrl: "./admin-book.component.html",
  styleUrls: ["./admin-book.component.css"],
})
export class AdminBookComponent implements OnInit {
  maxLength = maxLength;
  operation: string;
  writeBookForm: FormGroup;
  publisherDropdownSettings = {
    idField: "publisherId",
    textField: "publisherName",
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false,
    singleSelection: true,
  };
  authorDropdownSettings = {
    idField: "authorId",
    textField: "authorName",
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  genreDropdownSettings = {
    idField: "genre_id",
    textField: "genre_name",
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  books: any[];
  authors: any[];
  genres: any[];
  publishers: any[];

  constructor(private lmsService: OLmsService) {}

  ngOnInit() {
    this.readBooks();
    this.readAuthors();
    this.readGenres();
    this.readPublishers();
  }

  readBooks() {
    this.lmsService
      .get(environment.adminBackendUrl + environment.readBookUri)
      .subscribe(
        (result: object[]) => (this.books = result),
        (error: any) => {
          // do something with a logger here
          this.books = [];
          alert(error.error);
        }
      );
  }

  readAuthors() {
    this.lmsService
      .get(environment.adminBackendUrl + environment.readAuthorUri)
      .subscribe(
        (result: object[]) => (this.authors = result),
        (error: any) => {
          // do something with a logger here
          this.authors = [];
          alert(error.error);
        }
      );
  }

  readGenres() {
    this.lmsService
      .get(environment.adminBackendUrl + environment.readGenreUri)
      .subscribe(
        (result: object[]) => (this.genres = result),
        (error: any) => {
          // do something with a logger here
          this.genres = [];
          alert(error.error);
        }
      );
  }

  readPublishers() {
    this.lmsService
      .get(environment.adminBackendUrl + environment.readPublisherUri)
      .subscribe(
        (result: object[]) => (this.publishers = result),
        (error: any) => {
          // do something with a logger here
          this.publishers = [];
          alert(error.error);
        }
      );
  }

  writeBook(operation: string) {
    if (!confirm(operation + " this book?")) return;
    const book = {};
  }
}
