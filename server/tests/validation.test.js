// tests/validation.test.js

const { isValidEmail, isValidPassword } = require("../src/utils/validation");

describe("Validation Functions", () => {
  test("isValidEmail should return true for valid emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user@domain.co")).toBe(true);
  });

  test("isValidEmail should return false for invalid emails", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("test@.com")).toBe(false);
  });

  test("isValidPassword should return true for passwords with length >= 6", () => {
    expect(isValidPassword("abcdef")).toBe(true);
  });

  test("isValidPassword should return false for short passwords", () => {
    expect(isValidPassword("12345")).toBe(false);
  });
});
