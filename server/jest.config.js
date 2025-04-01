// File này cấu hình cho Jest làm gì
// - testEnvironment: Chọn môi trường test cho Node.js
// - collectCoverage: Bật đo lường coverage
// - collectCoverageFrom: Chỉ đo coverage trong thư mục src/
// - coverageDirectory: Lưu báo cáo vào thư mục coverage
// - coverageReporters: Xuất báo cáo coverage dưới dạng text và file lcov
module.exports = {
  testEnvironment: "node", // Thiết lập môi trường test cho Node.js
  collectCoverage: true, // Bật đo lường coverage
  collectCoverageFrom: ["src/**/*.js"], // Chỉ đo coverage trong thư mục src/
  // collectCoverageFrom: ["src/utils/validation.js"], // Chỉ đo coverage trong thư mục src/
  coverageDirectory: "coverage", // Lưu báo cáo vào thư mục coverage
  coverageReporters: ["text", "lcov"], // Xuất báo cáo coverage dưới dạng text và file lcov
};
