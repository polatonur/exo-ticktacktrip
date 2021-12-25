const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { justifyText, isEmailValid } = require("./utils");
const app = express();
require("dotenv").config();
const uid2 = require("uid2");
const { Pool } = require("pg");

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
    if (typeof text === "string") {
      const userId = req.user_id; //👈 this comes from isAuthenticated

      // calculate total word count of text
      const wordCount = text.split(/\s+/).length;

      //firstly check daily total request
      const response = await pool.query(
        "SELECT * from requests WHERE user_id = $1 AND created_on = CURRENT_DATE",
        [userId]
      );
      let sum = 0; //👈 sum of all words of all request with this token
      response.rows.forEach((request) => {
        sum += Number(request.total_word);
      });

      if (sum + wordCount <= 80000) {
        // total word not exceeded max limit add new request to db
        const response2 = await pool.query(
          "INSERT INTO requests (user_id, total_word) VALUES($1, $2) RETURNING *",
          [userId, wordCount]
        );

        // justify text and send
        const result = justifyText(text);
        res.status(200).send(result);
      } else {
        res.status(402).json({
          message: "Paiement required",
        });
      }
    } else {
      res.status(200).json({
        message: "No text sent, you must send plain text",
      });
    }
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

// HOME ROUTE
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to my text justification API",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Page not found",
  });
});

module.exports = app;
