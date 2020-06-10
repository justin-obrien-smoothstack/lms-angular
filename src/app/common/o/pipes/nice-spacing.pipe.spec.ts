import { NiceSpacingPipe } from "./nice-spacing.pipe";

describe("NiceSpacingPipe", () => {
  it("create an instance", () => {
    const pipe = new NiceSpacingPipe();
    expect(pipe).toBeTruthy();
  });

  it("should transform an array as intended", () => {
    expect(new NiceSpacingPipe().transform([0, 1])).toEqual("0, 1");
  });
});
