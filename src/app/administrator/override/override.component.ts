import { Component, OnInit, OnChanges } from "@angular/core";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { environment } from "src/environments/environment";
import * as moment from "moment";

@Component({
  selector: "app-override",
  templateUrl: "./override.component.html",
  styleUrls: ["./override.component.css"],
})
export class OverrideComponent implements OnInit {
  overridableLoans: any[];

  constructor(private lmsService: OLmsService) {}

  ngOnInit() {
    this.readOverridableLoans();
  }

  readOverridableLoans() {
    this.lmsService
      .get(
        `${environment.adminBackendUrl}${environment.readOverridableLoansUri}`
      )
      .subscribe(
        (result: object[]) => {
          this.overridableLoans = result;
          for (const loan of this.overridableLoans)
            this.lmsService.processLoan(loan);
        },
        (error) => {
          this.overridableLoans = [];
          alert(error.error);
        }
      );
  }

  doOverride(loan: any) {
    if (
      !confirm("Are you sure you want to override the due date of this loan?")
    )
      return;
    const dateOut = moment(loan.dateOut).format("YYYY-MM-DDTHH_mm_ss"),
      overrideUri = `/loans/book/${loan.bookId}/borrower/${loan.cardNo}/branch/${loan.branchId}/dateout/${dateOut}`;
    this.lmsService
      .put(`${environment.adminBackendUrl}${overrideUri}`)
      .subscribe(null, (error) => {
        alert(error.error);
      })
      .add(this.readOverridableLoans());
  }
}
