import { User, Course, Lessons } from "../models/model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) {
    res.status(403).json({ message: "User already exists" });
    return;
  } 

   const token = jwt.sign({ email: email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  const encrypted_pass = await bcrypt.hash(password, 10);
  const obj = new User({ email, password: encrypted_pass });
  await obj.save();
  res.status(200).json({ message: "User created!", token });
};

export const signin = async (req, res) => {
  const { email, password: pass_plain } = req.body;
  const userObj = await User.findOne({ email });
  if (!userObj) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  // Exclude sensitive/internal fields from response
  // eslint-disable-next-line no-unused-vars
  const { password, _id, __v, purchasedCourses, ...resObj } = userObj.toObject();

  const token = jwt.sign({ email: userObj.email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  if (!(await bcrypt.compare(pass_plain, password))) {
    res.status(404).json({ message: "Incorrect Password!" });
    return;
  }
  res.status(200).json({ message: "Signin successful!", resObj, token });
};

export const courses = async (req, res) => {
  const email = req.user;
  const user = await User.findOne({ email }).populate("purchasedCourses");
  res.status(200).json({ user });
};

export const allCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({ courses });
};


export const courseById = async (req, res) => {
  const id = req.body.courseId;
  const course = await Course.findOne({ _id: id });
  if (course) res.status(200).json({ course });
  else res.status(404).json({ message: "course not found!" });
};

export const purchaseCourse = async (req, res) => {
  const id = req.body.courseId;
  const email = req.user;
  const user = await User.findOne({ email });
  const course = await Course.findById(id);
  if (!course) {res.status(404).json({ message: "course not found!" });
    res.status(404).json({ message: "course not found!" });
    return;
  }
  if (user.purchasedCourses.includes(course._id)) {
    res.status(400).json({ message: "Course already purchased!" });
    return;
  }
  user.purchasedCourses.push(course._id);
  await user.save();
  res.status(201).json({ message: "Course purchased successfully!" });
};

export const courseContent = async (req, res) => {
  const courseId = req.params.courseId;
  const userEmail = req.user;
  
  if (!userEmail) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ email: userEmail }).populate(
    "purchasedCourses"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.purchasedCourses.some((course) => course._id.equals(courseId))) {
    return res
      .status(403)
      .json({ message: "Access denied. Course not purchased." });
  }

  const lessons = await Lessons.find({ courseId: courseId });
  if (lessons.length === 0) {
    return res
      .status(404)
      .json({ message: "No lessons found for this course" });
  }
  res.status(200).json(lessons[0]);
};

export const ret = async (req, res) => {
  res.status(200).send();
  return;
};
