import { Component, OnInit } from "@angular/core";
import { HLmsService } from "src/app/common/h/hLms.service";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-admin-genre",
  templateUrl: "./admin-genre.component.html",
  styleUrls: ["./admin-genre.component.css"],
})
export class AdminGenreComponent implements OnInit {
  genres: any;
  writeGenreForm: FormGroup;
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

  deleteGenre(id) {
    if (!confirm("Delete this genre?")) return;
    this.lmsService
      .delete(`${environment.adminBackendUrl}${environment.readGenreUri}/${id}`)
      .subscribe(null, (error: any) => {
        // do something with a logger here
        alert(error.error);
      })
      .add(() => {
        this.loadAllGenres();
      });
  }

  writeGenre(operation: string) {
    if (!confirm(`${operation} this genre?`)) return;
    const genre = {
      id: this.writeGenreForm.value.id,
      name: this.writeGenreForm.value.name,
    };
    switch (operation) {
      case "Create":
        this.lmsService
          .post(
            `${environment.adminBackendUrl}${environment.readGenreUri}`,
            genre
          )
          .subscribe(null, (error) => alert(error.error));

        break;
      case "Update":
        this.lmsService
          .put(
            `${environment.adminBackendUrl}${environment.readGenreUri}`,
            genre
          )
          .subscribe(null, (error) => alert(error.error));
        break;
    }
    this.loadAllGenres();
  }

  initializeWriteGenreForm(genre: any) {
    let name: string, id: number;
    if (genre) {
      id = genre.genre_id;
      name = genre.name;
    }
    this.writeGenreForm = this.formBuilder.group({
      id: [id],
      name: [
        name,
        [
          Validators.required,
          Validators.maxLength(45),
          Validators.minLength(3),
        ],
      ],
    });
  }

  openWriteModal(operation: string, modal: any, genre: any) {
    this.initializeWriteGenreForm(genre);
    this.operation = operation;
    this.modalService.open(modal);
  }

  errorsDirty(control: string) {
    return (
      this.writeGenreForm.controls[control].errors &&
      this.writeGenreForm.controls[control].dirty
    );
  }
}
