import { Component, OnInit } from "@angular/core";
import { LmsService } from 'src/app/common/o/services/lms.service';

@Component({
  selector: "app-override",
  templateUrl: "./override.component.html",
  styleUrls: ["./override.component.css"],
})
export class OverrideComponent implements OnInit {
  overridableLoans: any;

  constructor(private lmsService: LmsService) {}

  ngOnInit() {}
}
