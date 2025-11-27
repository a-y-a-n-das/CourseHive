import multer from "multer";
import jwt from "jsonwebtoken";
const storage = multer.memoryStorage();
export const upload = multer({ storage });
import {Educator, Course, Lessons} from "../models/model.js";
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


export const courseContentEducator = async (req, res) => {
  const courseId = req.params.courseId;
  const userEmail = req.user;
  
  if (!userEmail) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await Educator.findOne({ email: userEmail }).populate(
    "courses"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.courses.some((course) => course._id.equals(courseId))) {
    return res
      .status(403)
      .json({ message: "Access denied. Course not purchased." });
  }

  const lessons = await Lessons.find({ courseId: courseId });
  if ( lessons?.length === 0) {
    return res.status(200).json({lessons: [] });
  }
  res.status(200).json(lessons[0]);
};

export const deleteLesson = async (req, res) => {
  const lessonId = req.params.lessonId;
  const courseId = req.body.courseId;
  const file = req.body.file;
  const file_path = `content/${courseId}/${file}`;
  try{
    const del_res = await fetch(`${process.env.BACKEND_URL}/api/deletefile`, {
      method: "DELETE",
      body: JSON.stringify({ file: file_path }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!del_res.ok) {
      console.log("Failed to delete file from S3.");
      res.status(500).json({ message: "Failed to delete file from S3" });
      return; 
    }

    const result = await Lessons.findOneAndUpdate(
      {courseId},
      { $pull: { lessons: { _id: lessonId} } },
      { new: true }
    );
    if (!result) {
      res.status(404).json({ message: "Error deleting lesson." });
    }
    console.log("Lesson deleted:", result);
    res.status(200).json({ message: "Lesson deleted successfully." });   
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson.", error});  
  }}



  