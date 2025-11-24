import { Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UserDashboard() {
  const [courses, setCouses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCourses = async () => {
      const res1 = await fetch(`${API}/api/courses/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const res2 = await fetch(`${API}/api/allCourses/`, {
        method: "POST",
      });

      if (res1.status === 401 || !token) {
        navigate("/signin");
        return;
      }
      const myCourses = await res1.json();
      const courses = await res2.json();

      setCouses(myCourses.user.purchasedCourses);

      const exploreCourses = courses.courses.filter(
        (course) =>
          !myCourses.user.purchasedCourses.some((c) => c._id == course._id)
      );

      setAllCourses(exploreCourses);
    };

    fetchCourses();
  }, [navigate, API]);

  return (
    <>
      <div
        style={{
          padding: "10px",
          width: "100vw",
          height: "93vh",
          overflow: "hidden",
          backgroundColor: "#a8f3edaf",
        }}
      >
        <Typography margin={"5px 10px"} variant="h6">
          My Courses
        </Typography>
        <div style={{ flex: 1, scrollbarWidth: "none" }}>
          <ul
            style={{
              maxWidth: "98vw",
              display: "flex",
              listStyle: "none",
              overflowY: "hidden",
              padding: 0,
              margin: 0,
              scrollbarWidth: "none",
            }}
          >
            {courses.map((c) => {
              return (
                <li key={c._id}>
                  <Card
                    onClick={() => {
                      navigate(`/course/${c._id}`);
                    }}
                    style={{
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      width: "300px",
                      height: "250px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      style={{ alignSelf: "start", paddingTop: "0px" }}
                      component="img"
                      image={c.th_img}
                      height="150"
                      alt="Course thumbnail"
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          padding={"0px 0px 3px 10px"}
                          margin={"5px 0px 0px"}
                          variant="h7"
                        >
                          {c.name}
                        </Typography>
                        <Typography
                          style={{ padding: "5px 10px" }}
                          variant="h7"
                        >
                          ⭐{c.rating}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography padding={"0px 0px 8px 10px"} variant="h7">
                          By {c.instructor}
                        </Typography>
                        <Typography padding={"0px 0px 8px 10px"} variant="h7">
                          {c.level}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
        <Typography margin={"40px 10px 5px"} variant="h6">
          Explore Courses
        </Typography>
        <div style={{ flex: 1, scrollbarWidth: "none" }}>
          <ul
            style={{
              maxWidth: "98vw",
              display: "flex",
              listStyle: "none",
              flexWrap: "nowrap",
              overflowX: "auto",
              overflowY: "hidden",
              padding: 0,
              margin: 0,
              scrollbarWidth: "none",
            }}
          >
            {allCourses.map((c) => {
              return (
                <li key={c._id}>
                  <Card
                    onClick={() => {
                      navigate(`/purchasecourse/${c._id}`);
                    }}
                    style={{
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      width: "300px",
                      height: "250px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      style={{ alignSelf: "start", paddingTop: "0px" }}
                      component="img"
                      image={c.th_img}
                      height="150"
                      alt="Course thumbnail"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          padding={"0px 0px 8px 10px"}
                          margin={"8px 0px 0px"}
                          variant="h7"
                        >
                          {c.name}
                        </Typography>
                        <Typography
                          style={{ padding: "5px 10px" }}
                          variant="h7"
                        >
                          ⭐{c.rating}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography padding={"0px 0px 8px 10px"} variant="h7">
                          By {c.instructor}
                        </Typography>
                        <Typography padding={"0px 0px 8px 10px"} variant="h7">
                          {c.level}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
