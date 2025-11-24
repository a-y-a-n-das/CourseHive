import { duration } from "@mui/material";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const educatorSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});


const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
  },
  instructor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  th_img: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  educator:{
    type: mongoose.Schema.Types.ObjectId, ref: "Educator",
    required: true,
  }
});

const LessonsSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  url: { type: String, required: true },
  duration: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Educator = mongoose.model("Educator", educatorSchema);
export const Lessons = mongoose.model("coursecontent", LessonsSchema);

