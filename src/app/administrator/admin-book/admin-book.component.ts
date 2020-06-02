import { Component, OnInit } from "@angular/core";
import { OLmsService } from "src/app/common/o/services/oLms.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-book",
  templateUrl: "./admin-book.component.html",
  styleUrls: ["./admin-book.component.css"],
})
export class AdminBookComponent implements OnInit {
  books: any[];
  authors: any[];
  genres: any[];
  publishers: any[];

  constructor(private lmsService: OLmsService) {}

  ngOnInit() {}
}
