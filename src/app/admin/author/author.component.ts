import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LmsService } from "../../../common/service/lms.service";
import { environment } from "../../../environments/environment";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})

export class AuthorComponent implements OnInit {

  authors: any;
  authorName: string;
  authorId: number;
  books: any;
  totalBooks: any;
  
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  searchString: any;
  updateAuthorForm: FormGroup;
  searchAuthorForm: FormGroup;
  dropdownSettings: any;

  constructor(
    private lmsService: LmsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { 
    this.dropdownSettings = {
      singleSelection: false,
      idField: "bookId",
      textField: "title",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }

  ngOnInit() {
    this.loadAllAuthors();
    this.loadAllBooks();
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.updateAuthorForm = new FormGroup({
      authorName: new FormControl(this.authorName, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      authorId: new FormControl(this.authorId),
      books: new FormControl(this.books),
    });
    this.searchAuthorForm = new FormGroup({
      searchString: new FormControl(this.searchString),
    });
  }

  loadAllAuthors() {
    this.lmsService
      .getAll(`${environment.adminUrl}${environment.readAuthorsURI}`)
      .subscribe(
        (res) => {
          this.authors = res;
          this.authors.forEach(author => {
            author.showBooks = [];
            author.books.forEach(element => {
              author.showBooks.push(element.title);
            });
          });
        },
        (error) => {
          debugger;
        }
      );
  }

  loadAllBooks() {
    this.lmsService
      .getAll(`${environment.adminUrl}${environment.readBooksURI}`)
      .subscribe(
        (res) => {
          this.totalBooks = res;
        },
        (error) => {
          debugger;
        }
      );
  }

  deleteAuthor(authorId) {
    this.lmsService
      .deleteAll(`${environment.adminUrl}${environment.readAuthorsURI}/${authorId}`)
      .subscribe(
        (res) => {
          this.loadAllAuthors();
        },
        (error) => {
          debugger;
        }
      );
  }

  updateAuthor() {
    const author = {
      authorId: this.updateAuthorForm.value.authorId,
      authorName: this.updateAuthorForm.value.authorName,
      books: this.updateAuthorForm.value.books,
    };

    if (!author.authorId)
    {
      this.lmsService
      .postAll(`${environment.adminUrl}${environment.readAuthorsURI}`, author)
      .subscribe(
        (res) => {
          this.loadAllAuthors();
          this.modalService.dismissAll();
        },
        (error) => {
          debugger;
        }
      )
    }
    else {
      this.lmsService
        .putAll(`${environment.adminUrl}${environment.readAuthorsURI}`, author)
        .subscribe(
          (res) => {
            this.loadAllAuthors();
            this.modalService.dismissAll();
          },
          (error) => {
            debugger;
          }
        );
    }
  }

  open(content, obj) {
    if (obj !== null) {
      //this is edit/update mode
      this.updateAuthorForm = this.fb.group({
        books: [obj.books],
        authorId: obj.authorId,
        authorName: obj.authorName,
      });
    }

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = `Dismissed`;
      }
    );
  }

}
