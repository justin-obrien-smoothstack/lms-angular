import { GetPropertyPipe } from "./get-property.pipe";

describe("GetPropertyPipe", () => {
  it("create an instance", () => {
    const pipe = new GetPropertyPipe();
    expect(pipe).toBeTruthy();
  });

  it("should transform an array as intended", () => {
    const mockKeys = [1, 2, 3],
      mockKeyName = "mock key",
      mockPropertyName = "mock property",
      mockMapping = [
        { "mock key": 1, "mock property": "x" },
        { "mock key": 2, "other property": "y" },
      ],
      mockNotFoundDefault = "not found",
      mockNotAssignedDefault = "not assigned";

    const result = new GetPropertyPipe().transform(
      mockKeys,
      mockKeyName,
      mockPropertyName,
      mockMapping,
      mockNotFoundDefault,
      mockNotAssignedDefault
    );
    expect(result).toEqual(["x", mockNotAssignedDefault, mockNotFoundDefault]);
  });
});
