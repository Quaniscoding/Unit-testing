const mongoose = require("mongoose");
const app = require("./app");

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  startServer().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

module.exports = { startServer };
