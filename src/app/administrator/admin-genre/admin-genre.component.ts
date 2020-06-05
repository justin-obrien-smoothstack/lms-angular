import { Component, OnInit } from "@angular/core";
import { HLmsService } from "src/app/common/h/hLms.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-genre",
  templateUrl: "./admin-genre.component.html",
  styleUrls: ["./admin-genre.component.css"],
})
export class AdminGenreComponent implements OnInit {
  genres: any;

  // Pagination
  page = 1;
  pageSize = 10;

  constructor(private lmsService: HLmsService) {}

  ngOnInit() {
    this.loadAllGenres();
  }

  loadAllGenres() {
    this.lmsService
      .get(`${environment.adminBackendUrl}${environment.readGenreUri}`)
      .subscribe(
        (res) => {
          this.genres = res;
        },
        (error) => {
          debugger;
        }
      );
  }
}
