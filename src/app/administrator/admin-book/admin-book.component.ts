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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private lmsService: OLmsService
  ) {}

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
    const book = {
      bookId: this.writeBookForm.value.bookId,
      title: this.writeBookForm.value.title,
      pubId: this.writeBookForm.value.publisher.publisherId,
      authorIds: this.writeBookForm.value.authors.map(
        (author: any) => author.authorId
      ),
      genreIds: this.writeBookForm.value.genres.map(
        (genre: any) => genre.genre_id
      ),
    };
    switch (operation) {
      case "Create":
        this.lmsService
          .post(environment.adminBackendUrl + environment.createBookUri, book)
          .subscribe()
          .add(() => {
            this.readBooks();
            this.readAuthors();
            this.readGenres();
            this.readPublishers();
          });
        break;
      case "Update":
        this.lmsService
          .put(environment.adminBackendUrl + environment.updateBookUri, book)
          .subscribe()
          .add(() => {
            this.readBooks();
            this.readAuthors();
            this.readGenres();
            this.readPublishers();
          });
        break;
    }
  }

  initializeWriteBookForm(book: any) {
    let title: string,
      publisher = null,
      authors = [],
      genres = [],
      bookId: number;
    if (book) {
      bookId = book.bookId;
      title = book.title;
      publisher =
        this.publishers.find(
          (publisher) => (publisher.publisherId = book.pubId)
        ) || null;
      authors = this.authors.filter((author) =>
        book.authorIds.includes(author.authorId)
      );
      genres = this.genres.filter((genre) =>
        book.genreIds.includes(genre.genre_id)
      );
    }
    this.writeBookForm = this.formBuilder.group({
      bookId: [bookId],
      title: [title, [Validators.required, Validators.maxLength(maxLength)]],
      publisher: [publisher],
      authors: [authors],
      genres: [genres],
    });
  }

  openWriteModal(operation: string, modal: any, book: any) {
    this.initializeWriteBookForm(book);
    this.operation = operation;
    this.modalService.open(modal);
  }

  errorsDirty(control: string) {
    return (
      this.writeBookForm.controls[control].errors &&
      this.writeBookForm.controls[control].dirty
    );
  }
}
