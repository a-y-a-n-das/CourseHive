import { Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function PurchaseCourse() {
  const [c, setCourse] = useState("");
  const navigate = useNavigate();
  const {courseId}= useParams(); 
  useEffect(() => {
    const courseDetail = async () => {
      const res = await fetch("http://localhost:3000/api/coursebyid", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (data.course) setCourse(data.course);
      else return;
    };
    courseDetail();
  }, [courseId]);

  async function buyCourse() {
    await fetch("http://localhost:3000/api/purchasecourse", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ courseId }),
    })
      .then((res) => res.json)
      .then((data) => console.log(data.message));
    navigate("/dashboard");
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#ddd6d6ff",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "93vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Card
            style={{
              backgroundColor: "#eee",
              width: "720px",
              margin: "10px 10px 1px",
            }}
          >
            <CardMedia
              style={{ paddingTop: "0px" }}
              component="img"
              image={c.th_img}
              alt="Course thumbnail"
              height='418'
            />
          </Card>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              width: "720px",
              height: "300px",
              margin: "10px 8px",
            }}
          >
            <Typography variant="h5" padding={"20px 20px 0px"}>
              Price:{c.price}
            </Typography>
            <Button
              style={{ maxWidth: "200px", margin: "10px 20px 20px" }}
              variant="contained"
              size="large"
              onClick={() => {
                buyCourse();
              }}
            >
              Buy Now
            </Button>
          </Card>
        </div>

        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            width: "720px",
            height: "400px",
            margin: "8px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" padding={"10px"}>
              {c.name}
            </Typography>
            <Typography variant="h6" padding={"10px 40px"}>
              ⭐{c.rating}
            </Typography>
          </div>
          <Typography variant="h5" padding={"5px 10px"}>
            By {c.instructor}
          </Typography>
          <Typography variant="h6" padding={"5px 10px"}>
            {c.duration}
          </Typography>
        </Card>
      </div>
    </>
  );
}

export default PurchaseCourse;
