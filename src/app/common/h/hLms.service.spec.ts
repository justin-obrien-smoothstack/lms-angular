import { TestBed } from "@angular/core/testing";

import { HLmsService } from "./hLms.service";

describe("HLmsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: HLmsService = TestBed.get(HLmsService);
    expect(service).toBeTruthy();
  });
});
