import { Lessons, User } from "../models/model.js";
import { getSignedS3Url } from "../util/s3.js";

export const getVideoUrl = async (req, res) => {
  const courseId = req.params.courseId;
  const userEmail = req.user;
  const file = req.params.file;
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

  getSignedS3Url(`content/${courseId}/${file}`)
    .then((url) => {
      console.log("Signed URL:", url);
      res.status(200).json({ url });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching video URL", error: err.message });
    });
};
