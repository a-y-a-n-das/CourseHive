import { Button, Card, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EduSideBar from "./EduSideBar";

function AddCourseContent() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonType, setLessonType] = useState("video");
  const [lessonTitle, setLessonTitle] = useState("");
  const [file, setFile] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const fileRef = useRef();

  const updateLessons = (lessons) => {
    setCourseData((prevData) => ({
      ...prevData,
      lessons: lessons,
    }));
  }

  useEffect(() => {
    const token = localStorage.getItem("edu-token");

    const fetchCourseData = async () => {
      try {
        if (!courseId) {
          console.error("No courseId found");
          return;
        }
        const res = await fetch(`${API}/api/coursecontenteducator/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.lessons) {
          setCourseData(Array.isArray(data.lessons) ? data : { lessons: [data] });
          setError(null);
        } else if (res.status === 403) {
          setError("Access denied. Course not purchased.");
        } else if (res.status === 404) {
          console.error("No course data:", data.message);
          setError("Course has no lessons available.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error fetching course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId, API]);

  const HandleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/mkv", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only MP4, MKV videos and PDF files are allowed");
      fileRef.current.value = ""; // Reset input
      return;
    }
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { uploadUrl, file: uploadedFile } = await fetch(
      `${API}/api/uploadurl`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("edu-token")}`,
        },
        body: JSON.stringify({ fileType: lessonType, courseId }),
      }
    ).then((res) => res.json());
    let uploadResponse= null;
    if (uploadUrl && file) {
      uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
    }

    if (uploadResponse.ok && courseId && lessonTitle && lessonType && uploadedFile) {
      const res = await fetch(`${API}/api/addlesson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("edu-token")}`,
        },
        body: JSON.stringify({
          courseId,
          lessonTitle,
          lessonType,
          file: uploadedFile,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCourseData((prevData) => ({
          ...prevData,
          lessons: [...prevData.lessons, data.lesson],
        }));
        setLessonTitle("");
        setLessonType("video");
        setFile(null);
        fileRef.current.value = "";
        alert("Lesson added successfully");
      } else {
        alert("Error adding lesson: " + data.error);
      }
    } else {
      alert("File upload failed");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading course content...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }
  return (
    <>
      {courseData && <EduSideBar lessons={courseData?.lessons} courseId={courseId} updateLessons={updateLessons} />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "93vh",
        }}
      >
        <Card sx={{ height: 400, width: 600, margin: "auto", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Lesson Title"
              margin="normal"
              onChange={(e) => setLessonTitle(e.target.value)}
              value={lessonTitle}
            />
            <TextField
              select
              fullWidth
              label="Content Type"
              margin="normal"
              onChange={(e) => setLessonType(e.target.value)}
              value={lessonType}
            >
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="pdf">Pdf</MenuItem>
            </TextField>
            <TextField
              focused
              fullWidth
              type="file"
              inputRef={fileRef}
              onChange={HandleFile}
              label="Upload File"
              margin="normal"
              inputProps={{
                accept: "video/mp4, video/mkv, application/pdf", 
              }}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Add Lesson
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddCourseContent;
