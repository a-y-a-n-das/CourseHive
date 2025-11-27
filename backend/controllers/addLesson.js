import { Lessons } from "../models/model.js";

export async function uploadUrl(req, res) {
  const { fileType, courseId } = req.body;

  if (!fileType || !courseId) {
    return res
      .status(400)
      .json({ error: "fileType and courseId are required" });
  }
  const file =
    Date.now().toString() + "_" + (fileType === "video" ? "video.mp4" : "document.pdf");
    const file_name = `${courseId}/${file}`;
  try {
    const result = await fetch(`${process.env.BACKEND_URL}/api/getuploadurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: file_name, fileType }),
    });
    const data = await result.json();
    res.status(200).json({ file: file_name.split("/")[1], uploadUrl: data.uploadUrl });
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addLesson(req, res) {
  const { courseId, lessonTitle, lessonType, file } = req.body;
  if (!courseId || !lessonTitle || !lessonType || !file) {
    return res
      .status(400)
      .json({ error: "courseId, lessonTitle, lessonType, and file are required" });
  }

  const lesson = {
    title: lessonTitle,
    type: lessonType,
    file,
  };

  try {
    const result = await Lessons.findOneAndUpdate(
      {
        courseId,
      },
      {
        $push: {
          lessons: lesson,
        },
      },
      { new: true, upsert: true }
    );
    if (!result) {
      res.status(404).json({ error: "Course content not found" });
      return;
    }
    res.status(200).json({ message: "Lesson added successfully", lesson: result.lessons[result.lessons.length - 1] });
  } catch (error) {
    console.error("Error adding lesson:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
