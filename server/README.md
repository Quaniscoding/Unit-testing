Server - UNIT TEST
Đây là phần server của ứng dụng My React TS App, được xây dựng bằng Node.js và Express. Server cung cấp các API để xử lý đăng ký người dùng (/auth/register) và bao gồm các bài kiểm thử (Unit Test) để đảm bảo chất lượng mã nguồn. Dự án sử dụng Jest để chạy test và Supertest để kiểm thử API.

Cấu trúc thư mục

server/
├── coverage/ # Báo cáo độ bao phủ của test
│ ├── lcov-report/
│ └── coverage-final.json
├── node_modules/ # Thư mục chứa các thư viện
├── src/ # Thư mục chứa mã nguồn
│ ├── models/ # Chứa các model Mongoose
│ │ └── userModel.js
│ ├── routes/ # Chứa các route API
│ │ └── userRoutes.js
│ ├── utils/ # Chứa các hàm tiện ích
│ │ └── validation.js
│ ├── app.js # File chính khởi tạo Express app
│ ├── server.js # File khởi động server
│ ├── tests/ # Thư mục chứa các file test
│ │ ├── userRoutes.test.js
│ │ └── validation.test.js
│ ├── .gitignore
│ ├── jest.config.js # Cấu hình Jest
│ ├── package-lock.json
│ ├── package.json
│ └── README.md # File hướng dẫn

src/models/: Chứa các model Mongoose (ví dụ: userModel.js).
src/routes/: Chứa các route API (ví dụ: userRoutes.js).
src/utils/: Chứa các hàm tiện ích (ví dụ: validation.js).
src/app.js: Khởi tạo Express app.
src/server.js: Khởi động server.
src/tests/: Chứa các file test cho API và hàm tiện ích.

Yêu cầu
Node.js (>= 14.x)
npm (>= 6.x)
MongoDB (nếu kết nối database thật, nhưng hiện tại đã mock)

Clone repository
git clone <repository-url>
cd server

Cài đặt dependencies:
npm install

Cấu hình môi trường:
Tạo file .env trong thư mục gốc (nếu cần kết nối database thật)

PORT=5000
MONGODB_URI=mongodb://localhost:27017/unittest

Chạy server
npm start

Chạy Unit Test
Dự án đã triển khai các Unit Test cho các thành phần chính của server:

Chạy tất cả các test
npm test

Chạy test với coverage
npm test -- --coverage

Chạy test cho file cụ thể
Ví dụ, để chạy test cho userRoutes.js
npm test -- userRoutes.test.js

Các bài test đã triển khai

1. API Routes (src/tests/userRoutes.test.js)
   Kiểm thử endpoint /auth/register:
   Trường hợp thiếu email hoặc password (status 400, message: "Missing fields").
   Trường hợp password quá ngắn (status 400, message: "Password must be at least 6 characters").
   Trường hợp user đã tồn tại (status 400, message: "User already exists").
   Trường hợp tạo user mới thành công (status 201, trả về thông tin user).
   Trường hợp lỗi server (status 500, message: "An error occurred").
   Mocking:
   Sử dụng Jest để mock model User (Mongoose), tránh kết nối database thật.
   Sử dụng Supertest để gửi request đến API.
2. Validation Functions (src/tests/validation.test.js)
   Kiểm thử hàm isValidEmail:
   Trả về true cho email hợp lệ (ví dụ: test@example.com).
   Trả về false cho email không hợp lệ (ví dụ: invalid-email).
   Kiểm thử hàm isValidPassword:
   Trả về true cho password có độ dài >= 6 ký tự.
   Trả về false cho password ngắn hơn 6 ký tự.
