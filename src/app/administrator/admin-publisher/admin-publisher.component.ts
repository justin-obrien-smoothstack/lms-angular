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
  maxLength = maxLength;
  operation: string;
  writePublisherForm: FormGroup;
  bookDropdownSettings = {
    idField: "bookId",
    textField: "title",
    itemsShowLimit: 10,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  currentPage = 1;
  rowsPerPage = 10;
  publishers = [];
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
          this.publishers = [];
          alert(error.error);
        }
      );
  }

  readBooks() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBookUri}`)
      .subscribe(
        (result: object[]) => (this.books = result),
        (error: any) => {
          this.books = [];
          alert(error.error);
        }
      );
  }

  deletePublisher(publisherId: number) {
    if (!confirm("Delete this publisher?")) return;
    this.lmsService
      .delete(
        `${environment.adminBackendUrl}${environment.deletePublisherUri}/${publisherId}`
      )
      .subscribe(
        () => {
          this.readPublishers();
          this.readBooks();
        },
        (error: any) => {
          alert(error.error);
          this.readPublishers();
          this.readBooks();
        }
      );
  }

  writePublisher(operation: string) {
    if (!confirm(`${operation} this publisher?`)) return;
    const publisher = {
      publisherId: this.writePublisherForm.value.publisherId,
      publisherName: this.writePublisherForm.value.publisherName,
      publisherAddress: this.writePublisherForm.value.publisherAddress,
      publisherPhone: this.writePublisherForm.value.publisherPhone,
      bookIds: this.writePublisherForm.value.books.map(
        (book: any) => book.bookId
      ),
    };
    switch (operation) {
      case "Create":
        this.lmsService
          .post(
            environment.adminBackendUrl + environment.createPublisherUri,
            publisher
          )
          .subscribe(
            () => {
              this.readPublishers();
              this.readBooks();
            },
            (error) => {
              alert(error.error);
              this.readPublishers();
              this.readBooks();
            }
          );
        break;
      case "Update":
        this.lmsService
          .put(
            environment.adminBackendUrl + environment.updatePublisherUri,
            publisher
          )
          .subscribe(
            () => {
              this.readPublishers();
              this.readBooks();
            },
            (error) => {
              alert(error.error);
              this.readPublishers();
              this.readBooks();
            }
          );
        break;
    }
  }

  initializeWritePublisherForm(publisher: any) {
    let publisherName: string,
      publisherAddress = null,
      publisherPhone = null,
      books = [],
      publisherId: number;
    if (publisher) {
      publisherId = publisher.publisherId;
      publisherName = publisher.publisherName;
      publisherAddress = publisher.publisherAddress;
      publisherPhone = publisher.publisherPhone;
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

  errorsDirty(control: string) {
    return (
      this.writePublisherForm.controls[control].errors &&
      this.writePublisherForm.controls[control].dirty
    );
  }
}
