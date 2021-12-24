const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { justifyText, isEmailValid } = require("./utils");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();
const uid = require("uid2");
const uid2 = require("uid2");

// DB connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// use cors to avoid cors policy problems
app.use(cors());

// we will use plain text for "/api/justify route"
app.use(bodyParser.text());

// import isAthenticated
const isAuthenticated = require("./middlewares/isAuthenticated");

// JUSTIFY TEXT ROUTE
app.post("/api/justify", isAuthenticated, async (req, res) => {
  const text = req.body;
  try {
    const userId = req.user_id; //👈 this comes from isAuthenticated

    // step-1 Check is daily rate
    const response = await pool.query(
      "SELECT * from requests WHERE user_id = $1 AND created_on = CURRENT_DATE",
      [userId]
    );
    console.log(response.rows);

    // calculate tota word count and register the value in DB
    const wordCount = text.split(/\s+/).length;
    const response2 = await pool.query(
      "INSERT INTO requests (user_id, total_word) VALUES($1, $2) RETURNING *",
      [userId, wordCount]
    );
    // console.log("reponse 2");
    // console.log(response2);
    const result = justifyText(text);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// use json format for api/token route
app.use(bodyParser.json());

// SIGN IN ROUTE
app.post("/api/token", async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      if (isEmailValid(email)) {
        // user exists ? send token : create new user
        const response = await pool.query(
          "SELECT token FROM users WHERE email = $1",
          [email]
        );
        console.log(response);
        if (response.rows.length === 0) {
          // user not found then create new user
          const token = uid2(16);
          const newUser = await pool.query(
            "INSERT INTO users (email, token) VALUES($1, $2) RETURNING *",
            [email, token]
          );
          res.status(200).json({
            token: newUser.rows[0].token,
          });
        } else {
          // user exists send token
          token = response.rows[0].token;
          res.status(200).json({
            token,
          });
        }
      } else {
        res.status(400).json({
          message:
            "Wrong email format your email should be like this foo@bar.com",
        });
      }
    } else {
      res.status(400).json({
        message: "No email send. To use API please subscribe with your email",
      });
    }
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
