# Client - Unit test

Đây là một ứng dụng React đơn giản được xây dựng bằng TypeScript, với các Unit Test được triển khai để kiểm thử các hàm xử lý dữ liệu, API, và component. Dự án sử dụng Jest và React Testing Library để đảm bảo chất lượng mã nguồn.

## Cấu trúc thư mục

client/

├── coverage/ # Báo cáo độ bao phủ của test

│ ├── lcov-report/

│ └── coverage-final.json

├── node_modules/

├── public/

│ ├── index.html

│ ├── favicon.ico

│ └── manifest.json

├── src/

│ ├── components/

│ │ └── UserProfile.tsx

│ ├── **tests**/

│ │ └── api.test.ts

│ │ └── App.test.tsx

│ │ └── auth.test.ts

│ │ └── RegisterForm.test.ts

│ │ └── userInput.test.ts

│ │ └── UserProfile.test.tsx

│ ├── services/

│ │ └── api.ts

│ │ └── auth.ts

│ ├── utils/

│ │ └── userInput.ts

│ ├── App.tsx

│ ├── index.tsx

│ ├── react-app-env.d.ts

│ └── setupTests.ts

├── package.json

└── README.md

src/components/: Chứa các React component.

src/services/: Chứa logic gọi API.

src/utils/: Chứa các hàm tiện ích.

src/App.tsx: Component chính của ứng dụng.

src/test: Các test của toàn bộ ứng dụng.

src/setupTests.ts: Cài đặt tests cho toàn bộ ứng dụng.

Yêu cầu

Node.js (>= 14.x)

npm (>= 6.x)

## Thiết lập dự án

### Clone repository:

```bash
git clone https://github.com/Quaniscoding/Unit-testing.github
cd client
```

Cài đặt dependencies:

```bash
npm install
```

Cấu hình môi trường test:
File src/setupTests.ts đã được thiết lập để tích hợp @testing-library/jest-dom.

Chạy ở chế độ development:

```bash
npm start
```

Ứng dụng sẽ chạy tại http://localhost:3000.

Chạy Unit Test
Dự án đã triển khai các Unit Test cho các thành phần chính:

Chạy tất cả các test:

```bash
npm test
```

Chạy test với coverage:

```bash
npm test -- --coverage
```

Báo cáo coverage sẽ được lưu trong thư mục coverage/. Mở coverage/lcov-report/index.html để xem chi tiết.

Chạy test cho file cụ thể:
Ví dụ, để chạy test cho App.tsx:

```bash
npm test -- App.test.tsx
```

### Các bài test đã triển khai

1. Utils (src/utils/userInput.test.ts)

   Kiểm thử hàm sanitizeInput: Xóa ký tự đặc biệt và trim chuỗi.

   Kiểm thử hàm validateEmail: Xác thực định dạng email.

2. Services (src/services/api.test.ts & src/services/auth.test.ts)

   Kiểm thử hàm fetchUserData:

   Trường hợp gọi API thành công với dữ liệu mock.

   Trường hợp API thất bại và hiển thị lỗi.

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

   Sử dụng Jest để mock:

   API calls trong api.test.ts (mock fetch).

   Component UserProfile trong App.test.tsx.
