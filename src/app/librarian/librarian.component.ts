import { Component, OnInit } from '@angular/core';
import { LibrarianServiceService } from '../../common/service/librarian-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent implements OnInit {
  branches: any;
  selectedBranch: any;

  constructor(private lmsService: LibrarianServiceService) { }

  ngOnInit() {
    this.loadAllBranches();
  }

  loadAllBranches() {
    this.lmsService
      .getAll(`${environment.adminUrl}${environment.readBanchesURI}`)
      .subscribe(
        (res) => {
          this.branches = res;
        },
        (error) => {
          debugger;
        }
      );
  }

  updateBranch(branch) {
    this.lmsService
    .postAll(`${environment.libUrl}${environment.updateBranchesURI}`, branch)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBookCopies(bookCopies, branch) {
    this.lmsService
    .putAll(`${environment.libUrl}${environment.updateBranchesURI}/${branch}/copies`,bookCopies)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
