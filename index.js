const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { justifyText } = require("./utils");
const app = express();

// use cors to avoid cors policy problems
app.use(cors());

// we will use plain text
app.use(bodyParser.text());

app.post("/", async (req, res) => {
  const text = req.body;
  try {
    const result = justifyText(text);
    console.log("heyy");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
app.post("/test", async (req, res) => {
  try {
    const text = req.body;
    const list = text.split(" ");
    const response = fullJustify(list, 80);
    res.status(200).json({
      message: response,
    });
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
