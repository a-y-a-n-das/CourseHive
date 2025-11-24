import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function VideoPlayer({ courseId, title, file }) {
  const [videoUrl, setVideoUrl] = useState("");
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
      const fetchVideoUrl =( async () => {
        try {
          const res = await fetch(`${API}/api/getvideourl/${courseId}/${file}`, {
            method: "GET",  
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
          });
          const data = await res.json();
          if (res.ok) {
            setVideoUrl(data.url);
          } else {
            console.error("Failed to fetch video URL:", data.message);
          }
        } catch (error) {
          console.error("Error fetching video URL:", error);
        }
      });
      fetchVideoUrl();
  }, [API, courseId, file]);

  if(!videoUrl){
    return <div>Loading video...</div>; 
    }

  return (
    <>
    <Card elevation={3} sx={{ maxWidth: "100%", borderRadius: 2 }}>
      <CardContent
        elevation={3}
        style={{
          marginLeft: 260,
          marginTop: "2vh",
          padding: 20,
          width: "calc(100% - 260px)",
          height: "calc(100vh - 7vh - 40px)",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <video
          width="100%"
          height="100%"
          controls
          src={videoUrl}
          style={{
            width: "100%",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      </CardContent>
      </Card>
    </>
  );
}

export default VideoPlayer;
