const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");

const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // Find a user with the provided username and password
  await Admin.create({ userName: username, passWord: password })
    .then(() => res.status(200).json({ message: "Admin created successfully" }))
    .catch((err) => {
      console.log(err);
      res.status(404).send("Failed to create Admin");
    });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  let courseBody = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    published: true,
  };

  await Course.create(courseBody)
    .then((course) =>
      res
        .status(200)
        .json({ message: "Course created successfully", coursedId: course._id })
    )
    .catch(() => res.status(404).send("Failed to create Course"));
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  await Course.find({})
    .then((courses) => res.status(200).json({ courses: courses }))
    .catch(() => res.status(404).send("Failed to retrive all courses"));
});

module.exports = router;
