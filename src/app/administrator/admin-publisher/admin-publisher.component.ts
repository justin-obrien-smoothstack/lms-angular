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
  writePublisherHeader: string;
  writePublisherForm: FormGroup;
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

  initializeWritePublisherForm(publisher: any) {
    let publisherName = "",
      publisherAddress = "",
      publisherPhone = "",
      bookIds = [];
    if (publisher) {
      publisherName = publisher.publisherName;
      publisherAddress = publisher.publisherAddress;
      publisherPhone = publisherPhone;
      bookIds = publisher.bookIds;
    }
    this.writePublisherForm = this.formBuilder.group({
      publisherName: [
        publisherName,
        [Validators.required, Validators.maxLength(maxLength)],
      ],
      publisherAddress: [publisherAddress, Validators.maxLength(maxLength)],
      publisherPhone: [publisherPhone, Validators.maxLength(maxLength)],
      bookIds: [bookIds],
    });
  }

  openWriteModal(header: string, modal: any, publisher: any) {
    this.initializeWritePublisherForm(publisher);
    this.writePublisherHeader = header;
    this.modalService.open(modal);
  }
}
