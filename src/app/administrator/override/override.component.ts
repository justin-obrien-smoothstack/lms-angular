import { Component, OnInit } from "@angular/core";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { environment } from "src/environments/environment";

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
          // do something with a logger here
        }
      );
  }
}
