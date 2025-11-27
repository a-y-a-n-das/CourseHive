import { Box, Button, Drawer, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const drawerWidth = 250;
const appBarHeight = "7vh"; // matches your header height

function EduSideBar({ courseId, lessons, updateLessons }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!lessons || !courseId || lessons.length === 0) {
      setMessage("No lessons available.");
    } else {
      setMessage("");
    }
  }, [lessons, courseId]);

  const handleDelete = async (lessonId, lesson_name) => {
    const token = localStorage.getItem("edu-token");
    const API = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API}/api/deleteLesson/${lessonId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, file: lesson_name }),
      });
      if (res.ok) {
        // Optionally, you can refresh the lessons list here
        setMessage("Lesson deleted successfully.");
        const updated_lessons = lessons.filter(
          (lesson) => lesson._id !== lessonId
        );
        updateLessons(updated_lessons);
      } else {
        const data = await res.json();
        setMessage(data.message || "Error deleting lesson.");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // Offset the whole drawer below the AppBar instead of z-index trick
          marginTop: appBarHeight,
          height: `calc(100% - ${appBarHeight})`,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Lessons</Typography>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
      <List>
        {lessons.map((lesson, idx) => {
          const key = lesson?._id ? lesson._id : idx;
          return (
            <ListItem
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "100%", p: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  {lesson?.title}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                size="small"
                sx={{ ml: 1 }}
                onClick={() => handleDelete(lesson._id, lesson?.file)}
              >
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default EduSideBar;
