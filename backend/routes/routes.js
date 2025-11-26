import express from "express";
const router = express.Router();
import {
  educatorSignin,
  createCourse,
  coursesbyeducator,
  upload,
  educatorSignup,
} from "../controllers/educator.js";

import {
  signup,
  signin,
  courses,
  allCourses,
  courseById,
  purchaseCourse,
  ret,
  courseContent,
} from "../controllers/student.js";

import { getVideoUrl } from "../controllers/signedUrl.js";
import { imageUrl } from "../controllers/imgUrl.js";
import { auth } from "../controllers/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/courses", auth, courses);
router.post("/allCourses", allCourses);
router.post("/coursebyid", courseById);
router.post("/purchasecourse", auth, purchaseCourse);
router.post("/educatorsignin", educatorSignin);
router.post("/educatorsignup", educatorSignup);
router.post(
  "/createcourse",
  auth,
  upload.single("image"),
  imageUrl,
  createCourse
);
router.get("/coursesbyeducator", auth, coursesbyeducator);
router.get("/token", auth, ret);
router.get("/coursecontent/:courseId", auth, courseContent);
router.get("/getvideourl/:courseId/:file", auth, getVideoUrl);

export default router;
