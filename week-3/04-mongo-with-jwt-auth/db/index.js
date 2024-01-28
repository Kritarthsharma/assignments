const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kritarthsharma222:kcTItkaDBfuIvA01@cluster0.ywjlyej.mongodb.net/CourseApp"
  )
  .then(() => console.log("DB connection established"));

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  userName: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  passWord: {
    type: String,
    required: [true, "Please enter your password"],
  },
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  userName: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  passWord: {
    type: String,
    required: [true, "Please enter your password"],
  },
  coursesPurchased: [String],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: {
    type: String,
    required: [true, "Please tell us the title of your course"],
  },
  description: {
    type: String,
    required: [true, "Please tell us the title of your course"],
  },
  price: {
    type: Number,
    required: [true, "A course must have a price"],
  },
  imageLink: {
    type: String,
    required: [true, "Please tell us the link of your course"],
  },
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
