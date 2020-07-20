const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profiles");
const postsRoutes = require("./routes/api/posts");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  return res.json({ messgae: "Test working" });
});

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
