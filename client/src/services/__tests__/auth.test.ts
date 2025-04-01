// src/services/auth.test.ts

import axios from "axios";
import { registerUser } from "../auth";

jest.mock("axios");

describe("registerUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /** Test trường hợp đăng ký thành công */
  it("should login successfully with valid email and password", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        message: "Registration successful",
        user: { email: "test@example.com", password: "password123" },
      },
    });

    const result = await registerUser("test@example.com", "password123");
    expect(result).toEqual({
      message: "Registration successful",
      user: { email: "test@example.com", password: "password123" },
    });
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/register",
      {
        email: "test@example.com",
        password: "password123",
      }
    );
  });

  /** Test trường hợp thiếu trường (email hoặc password) */
  it("should throw error when field is missing", async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "Missing fields" } },
    });

    await expect(registerUser("test@example.com", "")).rejects.toThrow(
      "Missing fields"
    );
  });

  /** Test trường hợp mật khẩu quá ngắn */
  it("should throw error when password is too short", async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "Password must be at least 6 characters" } },
    });

    await expect(registerUser("test@example.com", "short")).rejects.toThrow(
      "Password must be at least 6 characters"
    );
  });

  /** Test trường hợp người dùng đã tồn tại */
  it("should throw error if user already exists", async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "User already exists" } },
    });

    await expect(
      registerUser("existing@example.com", "password123")
    ).rejects.toThrow("User already exists");
  });

  /** Test trường hợp lỗi server */
  it("should throw error when there is server error", async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "An error occurred" } },
    });

    await expect(
      registerUser("test@example.com", "password123")
    ).rejects.toThrow("An error occurred");
  });
});
