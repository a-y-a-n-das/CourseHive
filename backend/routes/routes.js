import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  courses,
  allCourses,
  courseById,
  purchaseCourse,
  educatorSignin,
  createCourse,
  coursesbyeducator,
  upload,
  imageUrl,
  ret,
} from "../controllers/controllers.js";
import { auth } from "../controllers/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/courses", auth, courses);
router.post("/allCourses", allCourses);
router.post("/coursebyid", courseById);
router.post("/purchasecourse", auth, purchaseCourse);
router.post("/educatorsignin", educatorSignin);
router.post("/createcourse", auth, upload.single("image"), imageUrl,createCourse);
router.get("/coursesbyeducator", auth, coursesbyeducator);
router.get("/token", auth, ret);

export default router;
