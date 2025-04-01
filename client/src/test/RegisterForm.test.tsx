/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// Tắt cảnh báo của ESLint về việc dùng nhiều assertion trong waitFor (không phải best practice nhưng tạm chấp nhận)

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// Nhập các hàm từ React Testing Library:
// - render: Hiển thị component trong môi trường test
// - screen: Truy vấn các phần tử trong DOM ảo
// - fireEvent: Mô phỏng sự kiện người dùng (như click, change)
// - waitFor: Chờ các thay đổi bất đồng bộ (async)

import RegisterForm from "../components/RegisterForm";
// Nhập component RegisterForm để test

import { registerUser } from "../services/auth";
// Nhập hàm registerUser từ dịch vụ auth (sẽ được mock)

jest.mock("../../services/auth");
// Mock toàn bộ module auth, thay thế hàm registerUser thật bằng một hàm giả để kiểm soát hành vi trong test

describe("RegisterForm Component", () => {
  // Bắt đầu nhóm test cho component RegisterForm

  const mockRegisterUser = registerUser as jest.Mock;
  // Ép kiểu registerUser thành jest.Mock để sử dụng các phương thức mock như mockResolvedValueOnce

  beforeEach(() => {
    mockRegisterUser.mockClear();
    // Trước mỗi bài test, xóa trạng thái mock của registerUser để tránh ảnh hưởng từ test trước
  });

  it("should render the form with email and password inputs", () => {
    // Test 1: Kiểm tra xem form có hiển thị đúng các thành phần không
    render(<RegisterForm />);
    // Hiển thị RegisterForm trong DOM ảo

    expect(screen.getByText("Register")).toBeInTheDocument();
    // Kiểm tra xem tiêu đề "Register" có xuất hiện không (từ <h2>Register</h2>)

    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    // Kiểm tra xem input email có nhãn "Email:" có tồn tại không

    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    // Kiểm tra xem input password có nhãn "Password:" có tồn tại không

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    // Kiểm tra xem nút có vai trò "button" và text "Submit" có tồn tại không
    // Lỗi: Trong mã RegisterForm.tsx, button có text "Register", không phải "Submit"
  });

  it("should update email and password inputs on change", () => {
    // Test 2: Kiểm tra xem input có cập nhật giá trị khi người dùng nhập không
    render(<RegisterForm />);
    // Hiển thị component

    const emailInput = screen.getByLabelText("Email:") as HTMLInputElement;
    // Lấy input email theo nhãn, ép kiểu thành HTMLInputElement để truy cập .value

    const passwordInput = screen.getByLabelText(
      "Password:"
    ) as HTMLInputElement;
    // Lấy input password tương tự

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // Mô phỏng người dùng nhập "test@example.com" vào input email

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    // Mô phỏng người dùng nhập "password123" vào input password

    expect(emailInput.value).toBe("test@example.com");
    // Kiểm tra xem giá trị của input email đã cập nhật chưa

    expect(passwordInput.value).toBe("password123");
    // Kiểm tra xem giá trị của input password đã cập nhật chưa
  });

  it("should display success message on successful registration", async () => {
    // Test 3: Kiểm tra xem thông báo thành công có hiển thị khi đăng ký thành công không
    mockRegisterUser.mockResolvedValueOnce({
      message: "Registration successful",
      user: { email: "test@example.com", password: "password123" },
    });
    // Mock registerUser trả về Promise thành công với dữ liệu giả lập

    render(<RegisterForm />);
    // Hiển thị component

    const emailInput = screen.getByLabelText("Email:");
    // Lấy input email

    const passwordInput = screen.getByLabelText("Password:");
    // Lấy input password

    const submitButton = screen.getByRole("button", { name: "Submit" });
    // Lấy nút submit (lỗi: nên là "Register" thay vì "Submit")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // Nhập email

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    // Nhập password

    fireEvent.click(submitButton);
    // Nhấn nút submit

    await waitFor(() => {
      // Chờ các thay đổi bất đồng bộ (state cập nhật)
      expect(screen.getByText("Registration successful")).toBeInTheDocument();
      // Kiểm tra xem thông báo thành công có hiển thị không

      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      // Kiểm tra xem không có thông báo lỗi nào xuất hiện
    });
  });

  it("should display error message on failed registration", async () => {
    // Test 4: Kiểm tra xem thông báo lỗi có hiển thị khi đăng ký thất bại không
    mockRegisterUser.mockRejectedValueOnce(new Error("User already exists"));
    // Mock registerUser trả về Promise thất bại với lỗi "User already exists"

    render(<RegisterForm />);
    // Hiển thị component

    const emailInput = screen.getByLabelText("Email:");
    // Lấy input email

    const passwordInput = screen.getByLabelText("Password:");
    // Lấy input password

    const submitButton = screen.getByRole("button", { name: "Submit" });
    // Lấy nút submit (lỗi: nên là "Register")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // Nhập email

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    // Nhập password

    fireEvent.click(submitButton);
    // Nhấn nút submit

    await waitFor(() => {
      // Chờ cập nhật state
      expect(screen.getByText("User already exists")).toBeInTheDocument();
      // Kiểm tra xem thông báo lỗi có hiển thị không

      expect(screen.queryByText(/successful/i)).not.toBeInTheDocument();
      // Kiểm tra xem không có thông báo thành công nào xuất hiện
    });
  });

  it("should display generic error message for unexpected errors", async () => {
    // Test 5: Kiểm tra thông báo lỗi chung khi có lỗi không xác định
    mockRegisterUser.mockRejectedValueOnce("Unknown error");
    // Mock registerUser trả về lỗi không phải Error object

    render(<RegisterForm />);
    // Hiển thị component

    const emailInput = screen.getByLabelText("Email:");
    // Lấy input email

    const passwordInput = screen.getByLabelText("Password:");
    // Lấy input password

    const submitButton = screen.getByRole("button", { name: "Submit" });
    // Lấy nút submit (lỗi: nên là "Register")

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    // Nhập email

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    // Nhập password

    fireEvent.click(submitButton);
    // Nhấn nút submit

    await waitFor(() => {
      // Chờ cập nhật state
      expect(
        screen.getByText("An unexpected error occurred")
      ).toBeInTheDocument();
      // Kiểm tra xem thông báo lỗi chung có hiển thị không
    });
  });

  it("should display error if email or password is missing", async () => {
    // Test 6: Kiểm tra xem có thông báo lỗi khi gửi form mà không nhập email/password
    render(<RegisterForm />);
    // Hiển thị component

    const submitButton = screen.getByRole("button", { name: "Submit" });
    // Lấy nút submit (lỗi: nên là "Register")

    fireEvent.click(submitButton);
    // Nhấn nút submit mà không nhập dữ liệu

    await waitFor(() => {
      // Chờ cập nhật state
      expect(
        screen.getByText("Email and password are required")
      ).toBeInTheDocument();
      // Kiểm tra xem thông báo lỗi có hiển thị không

      expect(mockRegisterUser).not.toHaveBeenCalled();
      // Kiểm tra xem registerUser không được gọi (vì form không hợp lệ)
    });
  });
});
