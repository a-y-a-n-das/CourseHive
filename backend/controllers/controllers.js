import { User, Course, Educator } from "../models/model.js";
import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const imageUrl = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No image file provided" });
  }
  const base64Image = file.buffer.toString("base64");

  const params = new URLSearchParams();
  params.append("image", base64Image);
  const image_res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}&expiration=15552000`,
    {
      method: "POST",
      body: params,
    }
  );

  const image_data = await image_res.json();
  const image_url = image_data.data.display_url;

  if (image_url) {
    req.imgUrl = image_url;
    next();
  } else {
    res.status(401).json({ message: "error in file upload!" });
    return;
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) {
    res.status(403).json({ message: "User already exists" });
    return;
  }

  const obj = new User({ email, password });
  await obj.save();
  res.status(200).json({ message: "User created!" });
};

export const signin = async (req, res) => {
  const { email, password: pass } = req.body;
  const userObj = await User.findOne({ email });
  if (!userObj) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  const { password, ...resObj } = userObj.toObject();

  const token = jwt.sign({ email: userObj.email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  if (password != pass) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  res.status(200).json({ message: "Signin successful!", resObj, token });
};

export const educatorSignin = async (req, res) => {
  const { email, password: pass } = req.body;
  const userObj = await Educator.findOne({ email });
  if (!userObj) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  const { password, ...resObj } = userObj.toObject();

  const token = jwt.sign({ email: userObj.email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  if (password != pass) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  res.status(200).json({ message: "Signin successful!", resObj, token });
};

export const courses = async (req, res) => {
  const email = req.user;
  const user = await User.findOne({ email }).populate("purchasedCourses");
  res.status(200).json({ user });
};

export const coursesbyeducator = async (req, res) => {
  const email = req.user;
  const educator = await Educator.findOne({ email }).populate("courses");
  const courses = educator.courses;
  res.status(200).json({ courses });
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
  if (!course) res.status(404).json({ message: "course not found!" });
  user.purchasedCourses.push(course._id);
  await user.save();
  res.status(201).json({ message: "Course purchased successfully!" });
};

export const createCourse = async (req, res) => {
  const { name, price, level, duration, category } = req.body;
  const email = req.user;
  const th_img = req.imgUrl;
  if (!th_img) res.status(403).json({ message: "image upload failed!" });
  const educator = await Educator.findOne({ email });
  if (!educator) {
    return res.status(404).json({ message: "Educator not found" });
  }
  const course = await Course.create({
    name,
    price,
    level,
    duration,
    category,
    th_img,
    rating: 0,
    educator: educator._id,
    instructor: educator.name,
  });

  educator.courses.push(course._id);
  await educator.save();

  res.status(201).json({ message: "Course created successfully!" });
};


export const ret = async (req, res)=>{
    res.status(200).send();
    return;
}