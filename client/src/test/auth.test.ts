// test/auth.test.ts

import axios from "axios";
// Nhập thư viện axios để mock các yêu cầu HTTP

import { registerUser } from "../services/auth";
// Nhập hàm registerUser từ module auth để kiểm tra

jest.mock("axios");
// Mock toàn bộ module axios, thay thế các hàm thật (như axios.post) bằng hàm giả để kiểm soát trong test

describe("registerUser", () => {
  // Bắt đầu nhóm test cho hàm registerUser

  afterEach(() => {
    jest.clearAllMocks();
    // Sau mỗi bài test, xóa trạng thái của tất cả mock để tránh ảnh hưởng từ test trước
  });

  /** Test trường hợp đăng ký thành công */
  it("should login successfully with valid email and password", async () => {
    // Test 1: Kiểm tra xem đăng ký có thành công với email và mật khẩu hợp lệ không
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        message: "Registration successful",
        user: { email: "test@example.com", password: "password123" },
      },
    });
    // Mock axios.post trả về Promise thành công với dữ liệu giả lập từ server

    const result = await registerUser("test@example.com", "password123");
    // Gọi hàm registerUser với email và password hợp lệ, chờ kết quả

    expect(result).toEqual({
      message: "Registration successful",
      user: { email: "test@example.com", password: "password123" },
    });
    // Kiểm tra xem kết quả trả về có khớp với dữ liệu mock không

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/register",
      {
        email: "test@example.com",
        password: "password123",
      }
    );
    // Kiểm tra xem axios.post đã được gọi với đúng URL và dữ liệu đầu vào chưa
  });

  /** Test trường hợp thiếu trường (email hoặc password) */
  it("should throw error when field is missing", async () => {
    // Test 2: Kiểm tra xem hàm có ném lỗi khi thiếu email hoặc password không
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "Missing fields" } },
    });
    // Mock axios.post trả về Promise thất bại với lỗi "Missing fields"

    await expect(registerUser("test@example.com", "")).rejects.toThrow(
      "Missing fields"
    );
    // Gọi registerUser với password rỗng, kiểm tra xem có ném lỗi đúng thông điệp không
  });

  /** Test trường hợp mật khẩu quá ngắn */
  it("should throw error when password is too short", async () => {
    // Test 3: Kiểm tra xem hàm có ném lỗi khi mật khẩu quá ngắn không
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "Password must be at least 6 characters" } },
    });
    // Mock axios.post trả về Promise thất bại với lỗi về độ dài mật khẩu

    await expect(registerUser("test@example.com", "short")).rejects.toThrow(
      "Password must be at least 6 characters"
    );
    // Gọi registerUser với mật khẩu ngắn ("short" < 6 ký tự), kiểm tra lỗi
  });

  /** Test trường hợp người dùng đã tồn tại */
  it("should throw error if user already exists", async () => {
    // Test 4: Kiểm tra xem hàm có ném lỗi khi người dùng đã tồn tại không
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "User already exists" } },
    });
    // Mock axios.post trả về Promise thất bại với lỗi "User already exists"

    await expect(
      registerUser("existing@example.com", "password123")
    ).rejects.toThrow("User already exists");
    // Gọi registerUser với email đã tồn tại, kiểm tra lỗi
  });

  /** Test trường hợp lỗi server */
  it("should throw error when there is server error", async () => {
    // Test 5: Kiểm tra xem hàm có ném lỗi khi server gặp sự cố không
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "An error occurred" } },
    });
    // Mock axios.post trả về Promise thất bại với lỗi chung từ server

    await expect(
      registerUser("test@example.com", "password123")
    ).rejects.toThrow("An error occurred");
    // Gọi registerUser với dữ liệu hợp lệ, kiểm tra lỗi server
  });
});
