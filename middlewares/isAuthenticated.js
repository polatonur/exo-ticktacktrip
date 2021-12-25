const { Pool } = require("pg");

// DB connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");

  try {
    if (token) {
      const response = await pool.query(
        "SELECT user_id FROM users WHERE token = $1",
        [token]
      );

      if (response.rows.length > 0) {
        req.user_id = response.rows[0].user_id; //👈 we will use this token to access user information
        return next();
      } else {
        res.status(401).json({
          message:
            "Unauthorized user please sign up with your email address or use your token to request API",
        });
      }
    } else {
      res.status(401).json({
        message:
          "Unauthorized user please sign up with your email address or use your token to request API",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
