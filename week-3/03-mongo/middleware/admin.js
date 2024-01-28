const { Admin } = require("../db/index");
const z = require("zod");

const uSchema = z.string().min(6);
const pSchema = z.string().min(6);

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  const usernameR = uSchema.safeParse(username);
  const passwordR = pSchema.safeParse(password);

  if (!usernameR.success || !passwordR.success)
    res.status(404).send("Check your username and password");
  else {
    try {
      // Find a user with the provided username and password
      const user = await Admin.find({
        userName: username,
      })
        .where("passWord")
        .equals(password)
        .exec();

      if (user.length > 0) {
        console.log("User found:", user);
        next();
      } else res.status(403).send("User not found");
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = adminMiddleware;
