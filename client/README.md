Unit test
Đây là một ứng dụng React đơn giản được xây dựng bằng TypeScript, với các Unit Test được triển khai để kiểm thử các hàm xử lý dữ liệu, API, và component. Dự án sử dụng Jest và React Testing Library để đảm bảo chất lượng mã nguồn.

Cấu trúc thư mục
my-react-ts-app/
├── node_modules/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── components/
│ │ ├── **tests**/
│ │ │ └── UserProfile.test.tsx
│ │ └── UserProfile.tsx
│ ├── services/
│ │ ├── **tests**/
│ │ │ └── api.test.ts
│ │ │ └── auth.test.ts
│ │ └── api.ts
│ │ └── auth.ts
│ ├── utils/
│ │ ├── **tests**/
│ │ │ └── userInput.test.ts
│ │ └── userInput.ts
│ ├── App.tsx
│ ├── App.test.tsx
│ ├── index.tsx
│ ├── react-app-env.d.ts
│ └── setupTests.ts
├── package.json
└── README.md
src/components/: Chứa các React component và test tương ứng.
src/services/: Chứa logic gọi API và test.
src/utils/: Chứa các hàm tiện ích và test.
src/App.tsx: Component chính của ứng dụng.
src/App.test.tsx: Test cho component App.

Yêu cầu
Node.js (>= 14.x)
npm (>= 6.x)
Thiết lập dự án

Clone repository (nếu có):
git clone <repository-url>
cd client

Cài đặt dependencies:
npm install

Cấu hình môi trường test:
File src/setupTests.ts đã được thiết lập để tích hợp @testing-library/jest-dom.

Chạy ở chế độ development:
npm start
Ứng dụng sẽ chạy tại http://localhost:3000.

Chạy Unit Test
Dự án đã triển khai các Unit Test cho các thành phần chính:

Chạy tất cả các test:
npm test

Chạy test với coverage:
npm test -- --coverage

Báo cáo coverage sẽ được lưu trong thư mục coverage/. Mở coverage/lcov-report/index.html để xem chi tiết.

Chạy test cho file cụ thể:
Ví dụ, để chạy test cho App.tsx:

npm test -- App.test.tsx
Các bài test đã triển khai

1. Utils (src/utils/userInput.test.ts)
   Kiểm thử hàm sanitizeInput: Xóa ký tự đặc biệt và trim chuỗi.
   Kiểm thử hàm validateEmail: Xác thực định dạng email.
2. Services (src/services/api.test.ts & src/services/auth.test.ts)
   Kiểm thử hàm fetchUserData:
   Trường hợp gọi API thành công với dữ liệu mock.
   Trường hợp API thất bại và 抛出 lỗi.
   Kiểm thử hàm registerUser:
   Trường hợp đăng ký thành công.
   Trường hợp thiếu trường(email hoặc password).
   Trường hợp mật khẩu quá ngắn
   Trường hợp người dùng đã tồn tại.
   Trường hợp lỗi server.
3. Components (src/components/UserProfile.test.tsx)
   Kiểm thử component UserProfile:
   Hiển thị trạng thái "Loading..." khi chưa có dữ liệu.
   Hiển thị tên người dùng sau khi fetch dữ liệu thành công.
   Xử lý lỗi khi fetch thất bại.
4. App (src/App.test.tsx)
   Kiểm thử component App:
   Render tiêu đề "Unit test".
   Render component UserProfile với nội dung mock.
   Mocking
   Sử dụng Jest để mock:
   API calls trong api.test.ts (mock fetch).
   Component UserProfile trong App.test.tsx.
