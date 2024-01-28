const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic

  const username = req.body.username;
  const password = req.body.password;

  // Find a user with the provided username and password
  await User.create({ userName: username, passWord: password })
    .then(() => res.status(200).json({ message: "User created successfully" }))
    .catch((err) => {
      console.log(err);
      res.status(404).send("Failed to create User");
    });
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  await Course.find({})
    .then((courses) => res.status(200).json({ courses: courses }))
    .catch(() => res.status(404).send("Failed to retrive all courses"));
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    { userName: username },
    {
      $push: {
        coursesPurchased: courseId,
      },
    }
  )
    .then((courses) => res.status(200).json({ message: "Purchase complete!" }))
    .catch(() => res.status(404).send("Purchase Incomplete!"));
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const user = await User.findOne({
      userName: req.headers.username,
    });

    console.log(user.coursesPurchased);
    const courses = await Course.find({
      _id: { $in: user.coursesPurchased },
    });

    if (courses.length > 0) {
      res.status(200).json({ purchasedCourses: courses });
    } else res.status(200).send("No courses purchased!");
  } catch (err) {
    console.log(err);
    res.status(404).send("Unable to get data!");
  }
});

module.exports = router;
