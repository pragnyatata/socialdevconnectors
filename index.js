const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({ messgae: "Test working" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
