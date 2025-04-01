const request = require("supertest");
const express = require("express");
const router = require("../src/routes/userRoutes");
const User = require("../src/models/userModel");

// Mock Mongoose Model
// Mock Mongoose để tránh kết nối DB thật.
// Giả lập model User.
jest.mock("../src/models/userModel.js");

const app = express();
app.use(express.json());
app.use(router);
describe("User API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // test Thiếu email/password.
  test("should return 400 if missing email or password", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing fields");
  });
  // test password quá ngắn
  test("should return 400 if password is too short", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", password: "123" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Password must be at least 6 characters");
  });
  // test user tồn tại
  test("should return 400 if user already exists", async () => {
    // Giả lập user đã tồn tại
    User.findOne.mockResolvedValue({ email: "test@example.com" });

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });
  // test tạo user mới
  test("should create a new user", async () => {
    User.findOne.mockResolvedValue(null); // Không có user trùng

    // Mock constructor của User
    User.mockImplementation(({ email, password }) => ({
      email,
      password,
      save: jest.fn().mockResolvedValue({ email, password }), // Trả về object đúng
    }));

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "newuser@example.com", password: "password123" });

    expect(res.status).toBe(201);
    // Kiểm tra dữ liệu trả về
    expect(res.body.email).toBe("newuser@example.com");
    expect(res.body.password).toBe("password123");
  });
  // test lỗi server
  test("should return 500 on server error", async () => {
    User.findOne.mockRejectedValue(new Error("Database error")); // Giả lập lỗi DB

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "error@example.com", password: "password123" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("An error occurred");
  });
});
