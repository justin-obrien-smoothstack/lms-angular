import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { maxLength } from "src/app/common/o/constants";
import { OLmsService } from "src/app/common/o/services/oLms.service";

@Component({
  selector: "app-admin-publisher",
  templateUrl: "./admin-publisher.component.html",
  styleUrls: ["./admin-publisher.component.css"],
})
export class AdminPublisherComponent implements OnInit {
  operation: string;
  writePublisherForm: FormGroup;
  bookDropdownSettings = {
    idField: "bookId",
    textField: "title",
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  publishers: any[];
  books: any[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
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

  writePublisher(operation: string) {
    if (!confirm(`${operation} this publisher?`)) return;
    const publisher = {
      publisherName: this.writePublisherForm.value.publisherName,
      publisherAddress: this.writePublisherForm.value.publisherAddress,
      publisherPhone: this.writePublisherForm.value.publisherPhone,
      bookIds: this.writePublisherForm.value.books.map(
        (book: any) => book.bookId
      ),
    };
    switch (operation) {
      case "Create":
        this.lmsService.post(
          environment.adminBackendUrl + environment.createPublisherUri,
          publisher
        );
        break;
    }
    this.readPublishers();
    this.readBooks();
  }

  initializeWritePublisherForm(publisher: any) {
    let publisherName = "",
      publisherAddress = "",
      publisherPhone = "",
      books = [],
      publisherId: number;
    if (publisher) {
      publisherId = publisher.publisherId;
      publisherName = publisher.publisherName;
      publisherAddress = publisher.publisherAddress;
      publisherPhone = publisherPhone;
      books = this.books.filter((book) =>
        publisher.bookIds.includes(book.bookId)
      );
    }
    this.writePublisherForm = this.formBuilder.group({
      publisherId: [publisherId],
      publisherName: [
        publisherName,
        [Validators.required, Validators.maxLength(maxLength)],
      ],
      publisherAddress: [publisherAddress, Validators.maxLength(maxLength)],
      publisherPhone: [publisherPhone, Validators.maxLength(maxLength)],
      books: [books],
    });
  }

  openWriteModal(operation: string, modal: any, publisher: any) {
    this.initializeWritePublisherForm(publisher);
    this.operation = operation;
    this.modalService.open(modal);
  }
}
