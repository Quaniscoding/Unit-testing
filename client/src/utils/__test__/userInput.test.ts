import { sanitizeInput } from "../userInput";

describe("sanitizeInput", () => {
  it("should remove special characters and trim input", () => {
    expect(sanitizeInput("  Hello@World!  ")).toBe("HelloWorld");
  });
});
