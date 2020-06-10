import { Component, OnInit } from "@angular/core";
import { HLmsService } from "src/app/common/h/hLms.service";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-admin-borrower",
  templateUrl: "./admin-borrower.component.html",
  styleUrls: ["./admin-borrower.component.css"],
})
export class AdminBorrowerComponent implements OnInit {
  borrowers: any;
  writeBorrowerForm: FormGroup;
  operation: string;
  maxLength = 45;

  // Pagination
  page = 1;
  pageSize = 10;

  constructor(
    private lmsService: HLmsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadAllBorrowers();
  }

  loadAllBorrowers() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readBorrowerUri}`)
      .subscribe(
        (res) => {
          this.borrowers = res;
        },
        (error) => {
          alert(error.error);
        }
      );
  }

  deleteBorrower(id) {
    if (!confirm("Delete this borrower?")) return;
    let oldData = this.borrowers;
    this.lmsService
      .delete(
        `${environment.adminBackendUrl}${environment.readBorrowerUri}/${id}`
      )
      .subscribe(null, (error: any) => {
        // do something with a logger here
        alert(error.error);
      })
      .add(() => {
        this.updateData(oldData);
      });
  }

  writeBorrower(operation: string) {
    if (!confirm(`${operation} this borrower?`)) return;
    let borrower = {
      cardNo: this.writeBorrowerForm.value.cardNo,
      name: this.writeBorrowerForm.value.name,
      address: this.writeBorrowerForm.value.address,
      phone: this.writeBorrowerForm.value.phone,
    };
    let oldData = this.borrowers;
    switch (operation) {
      case "Create":
        borrower.cardNo = 0;
        this.lmsService
          .post(
            `${environment.adminBackendUrl}${environment.readBorrowerUri}`,
            borrower
          )
          .subscribe(null, (error) => alert(error.error));

        break;
      case "Update":
        this.lmsService
          .put(
            `${environment.adminBackendUrl}${environment.readBorrowerUri}`,
            borrower
          )
          .subscribe(null, (error) => alert(error.error));
        break;
    }
    this.updateData(oldData);
  }

  initializeWriteBorrowerForm(borrower: any) {
    let cardNo: number,
      name = null,
      address = null,
      phone = null;
    if (borrower) {
      cardNo = borrower.cardNo;
      name = borrower.name;
      address = borrower.address;
      phone = borrower.phone;
    }
    this.writeBorrowerForm = this.formBuilder.group({
      cardNo: [cardNo],
      address: [address, [Validators.maxLength(45)]],
      name: [name, [Validators.maxLength(45)]],
      phone: [phone, [Validators.maxLength(45)]],
    });
  }

  openWriteModal(operation: string, modal: any, borrower: any) {
    this.initializeWriteBorrowerForm(borrower);
    this.operation = operation;
    this.modalService.open(modal);
  }

  errorsDirty(control: string) {
    return (
      this.writeBorrowerForm.controls[control].errors &&
      this.writeBorrowerForm.controls[control].dirty
    );
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async updateData(oldData: any) {
    while (this.borrowers == oldData) {
      await this.timeout(300);
      this.loadAllBorrowers();
    }
  }
}
