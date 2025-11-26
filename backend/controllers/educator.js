import multer from "multer";
import jwt from "jsonwebtoken";
const storage = multer.memoryStorage();
export const upload = multer({ storage });
import {Educator, Course} from "../models/model.js";
import bcrypt from "bcrypt";

export const educatorSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  if (await Educator.findOne({ email })) {
    res.status(403).json({ message: "User already exists" });
    return;
  }

   const token = jwt.sign({ email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  const hashedPassword = await bcrypt.hash(password, 10);
  const obj = new Educator({ name,   email, password: hashedPassword });
  await obj.save();
  res.status(200).json({ message: "User created!", email, token }); 
};


export const educatorSignin = async (req, res) => {
  const { email, password: pass } = req.body;
  const EducatorObj = await Educator.findOne({ email });
  if (!EducatorObj) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  const { password, ...resObj } = EducatorObj.toObject();

  const token = jwt.sign({ email: EducatorObj.email }, process.env.SECRET, {
    expiresIn: "12h",
  });

  if (!(await bcrypt.compare(pass, password))) {
    res.status(404).json({ message: "Invalid Credentials!" });
    return;
  }
  res.status(200).json({ message: "Signin successful!", resObj, token });
};



export const coursesbyeducator = async (req, res) => {
  const email = req.user;

  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const educator = await Educator.findOne({ email }).populate("courses");
  if (!educator) {
    return res.status(404).json({ message: "Educator not found" });
  }
  const courses = educator.courses;
  res.status(200).json({ courses });
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


