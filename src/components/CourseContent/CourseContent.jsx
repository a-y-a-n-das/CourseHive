import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import PdfViewer from "./PdfViewer";

function CourseContent() {
  const courseId = useParams().courseId;
  const [courseData, setCourseData] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  // Fetch course data once when courseId changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCourseData = async () => {
      try {
        if (!courseId) {
          console.error("No courseId found");
          return;
        }
        const res = await fetch(`${API}/api/coursecontent/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCourseData(data);
          setActiveLesson(courseData.lessons[0]);

          setLoading(false);
          setError(null);
        } else if (res.status === 403) {
          console.error("Access denied. Course not purchased.");
          setError("Access denied. Course not purchased.");
        } else if (res.status === 404) {
          console.error("No course data:", data.message);
          setError("Course has no lessons available.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error fetching course data.");
      }
    };
    fetchCourseData();
  }, [courseId, API, courseData]);


  if (loading) {
    return <div style={{ padding: "20px" }}>Loading course content...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <>
      {courseData && (
        <SideBar
          lessons={courseData?.lessons}
          setActiveLesson={setActiveLesson}
          activeLesson={activeLesson}
        />
      )}
      {activeLesson?.type === "video" && (
        <VideoPlayer
          title={activeLesson?.title}
          file={activeLesson.file}
          courseId={courseId}
        />
      )}
      {activeLesson?.type === "pdf" && (
        <PdfViewer
          title={activeLesson?.title}
          file={activeLesson.file}
          courseId={courseId}
        />
      )}
    </>
  );
}

export default CourseContent;
