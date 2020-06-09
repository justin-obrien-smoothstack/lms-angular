import { TestBed } from "@angular/core/testing";

import { OLmsService } from "./oLms.service";

describe("OLmsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OLmsService = TestBed.get(OLmsService);
    expect(service).toBeTruthy();
  });
});
