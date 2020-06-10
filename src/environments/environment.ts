// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  borrowerBackendUrl: "http://localhost:3002/lms/borrower",
  adminBackendUrl: "http://localhost:3000/lms/admin",
  libUrl: "http://localhost:3001/lms/librarian",
  borrUrl: "http://localhost:3002/lms/borrower",
  readBranchUri: "/branches",
  updateBanchUri: "/branches",
  createBranchURI: "/branches",
  deleteBranchUri: "/branches",
  readAuthorsUri: "/authors",
  readAuthorUri: "/authors",
  createBookUri: "/book",
  returnBookUri: "/returnBook",
  checkOutBookUri: "/checkOutBook",
  copiesUri: "/copies",
  createPublisherUri: "/publisher",
  updatePublisherUri: "/publisher",
  readBookUri: "/books",
  readBorrowerUri: "/borrower",
  readGenreUri: "/genre",
  readPublisherUri: "/publishers",
  readOverridableLoansUri: "/loans",
  updateBookUri: "/book",
  deleteBookUri: "/books",
  deletePublisherUri: "/publishers",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//http://localhost:3001/lms/librarian/branches/1/copies
