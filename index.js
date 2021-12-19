const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// use cors to avoid cors policy problems
app.use(cors());

// we will use plain text
app.use(bodyParser.text({ type: "*/json" }));

app.post("/", async (req, res) => {
  const text = req.body;

  try {
    res.status(200).send(text);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Page not found",
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
