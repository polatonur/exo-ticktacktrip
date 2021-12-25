const request = require("supertest");
const app = require("../app.js");
import { newDb } from "pg-mem";

const pool = newDb();
const results = db.public
  .many(`CREATE TABLE users(user_id serial PRIMARY KEY, email VARCHAR(100) token VARCHAR(16));
         CREATE TABLE requests (request_id serial PRIMARY KEY,user_id INTEGER REFERENCES users(user_id),  total_words NUMERIC created_on TIME CURRENT_TIMESTAMP)`);

// During the tests we will create a fake user
// At the end we will delete all requests made by fake user
// finally we will delete fake user
let fakeUser = {
  token: "",
};
const userRequests = []; //👈 we will push all requests id in this array to be able to delete all of them

// Clear DB
const clearDB = async () => {
  // delete all reques made by fake user
  userRequests.forEach(async (request) => {
    await pool.query("DELETE FROM requests WHERE request_id = $1", [request]);
  });

  // delete fake user
  await pool.query("DELETE FROM users WHERE token = $1", [fakeUser.token]);
};

describe("routes tests", () => {
  test("should return 404 status code page not found ", async () => {
    const response = await request(app)
      .get("/foo")
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Oops! Page not found" });
  });

  test("should return email format error", async () => {
    const response = await request(app)
      .post("/api/token")
      .send({ email: "we" })
      .set("Accept", "application/json");
    console.log(response.body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Wrong email format your email should be like this foo@bar.com",
    });
  });

  test("should return no email send error", async () => {
    const response = await request(app)
      .post("/api/token")
      .set("Accept", "application/json");
    console.log(response.body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "No email send. To use API please subscribe with your email",
    });
  });

  test("should generate a new token ", async () => {
    const response = await request(app)
      .post("/api/token")
      .send({ email: "teffst@test.com" })
      .set("Accept", "application/json");
    fakeUser.token = response.body.token;
    expect(response.statusCode).toBe(200);
  });
});

// clear DB
clearDB();
