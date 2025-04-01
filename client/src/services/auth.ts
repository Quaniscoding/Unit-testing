// src/services/auth.ts

import axios from "axios";

/** Định nghĩa interface cho đối tượng User */
interface User {
  email: string;
  password: string;
}

/** Định nghĩa interface cho phản hồi thành công từ server */
interface RegisterResponse {
  message: string;
  user: User;
}

const API_URL = "http://localhost:5000/api/auth/register";

/**
 * Hàm đăng ký người dùng bằng cách gửi yêu cầu POST tới endpoint /auth/register
 * @param email Email của người dùng
 * @param password Mật khẩu của người dùng
 * @returns Promise trả về phản hồi thành công từ server
 * @throws Error nếu có lỗi từ server hoặc yêu cầu không thành công
 */
export async function registerUser(
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(API_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An unknown error occurred"
    );
  }
}
