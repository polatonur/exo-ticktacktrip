const request = require("supertest");
const app = require("../app.js");

describe("app routes tests", () => {
  test("should return 404 status code page not found ", async () => {
    const response = await request(app)
      .get("/")
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Welcome to my text justification API",
    });
  });

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
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Wrong email format your email should be like this foo@bar.com",
    });
  });

  test("should return no email send error", async () => {
    const response = await request(app)
      .post("/api/token")
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "No email send. To use API please subscribe with your email",
    });
  });

  test("should return 401 error ", async () => {
    const response = await request(app)
      .post("/api/justify")
      .send({ email: "teffst@test.com" })
      .set("Accept", "text");
    expect(response.statusCode).toBe(401);
  });

  test("should return 401 error ", async () => {
    const response = await request(app)
      .post("/api/justify")
      .send({ email: "teffst@test.com" })
      .set("authorization", "Bearer ");
    expect(response.statusCode).toBe(401);
  });
});
