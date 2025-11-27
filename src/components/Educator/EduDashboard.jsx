import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function EduDashboard() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
    level: "",
    image: null,
  });
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("edu-token");
    const fetchCourses = async () => {
      const res = await fetch(`${API}/api/coursesbyeducator/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || !token) {
        navigate("/educatorssignin");
        return;
      }

      const data = await res.json();

      setCourses(data.courses || []);
      
      if(data.courses.length === 0){
        setMessage("You have not created any courses yet.");
      }
    };

    fetchCourses();
  }, [navigate, API]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("image", form.image);

    Object.entries(form).forEach(([key, value]) => {
      if (key != "image") fd.append(key, value);
    });

    const res = await fetch(`${API}/api/createcourse/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("edu-token")}`,
      },
      method: "POST",
      body: fd,
    });

    console.log(fd);

    const data = await res.json();
    alert(data.message);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        width: "100vw",
        height: "93vh",
        overflowY: "auto",
        backgroundColor: "#a8f3edaf",
      }}
    >
      <div>
        <Typography margin={"5px 10px"} variant="h6">
          My Courses
        </Typography>
        {message && (
          <Typography margin={"5px 10px"} variant="body1" color="error">
            {message}
          </Typography>
        )}

        <ul
          style={{
            maxWidth: "98vw",
            display: "flex",
            flexDirection: "column",
            padding: 0,
            margin: "10px",
            overflowY: "auto",
            height: "83vh",
            scrollbarWidth: "none",
          }}
        >
          {courses.map((c) => (
            <li key={c._id} style={{ listStyle: "none" }}>
              <Card onClick={() => navigate(`/addcoursecontent/${c._id}`)}
                style={{
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                  height: "250px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  image={c.th_img}
                  height="150"
                  alt="Course thumbnail"
                />
                <div style={{ padding: "10px" }}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">{c.name}</Typography>
                    <Typography>⭐ {c.rating}</Typography>
                  </div>
                  <Typography>By {c.instructor}</Typography>
                  <Typography>{c.level}</Typography>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      <Card
        style={{
          width: "600px",
          padding: "20px",
          borderRadius: "16px",
          background: "#f8ffff",
          boxShadow: "0 3px 5px rgba(0,0,0,0.15)",
          margin: "50px 0px 0px 50px ",
          height: "600px",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Course
          </Typography>

          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              type="file"
              label="thumbnail"
              name="image"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => {
                setForm({ ...form, image: e.target.files[0] });
              }}
              fullWidth
              focused
              required
            />
            <TextField
              variant="outlined"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              name="price"
              label="Price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              name="duration"
              label="Duration"
              value={form.duration}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              name="category"
              label="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
            <TextField
              select
              variant="outlined"
              name="level"
              label="Level"
              value={form.level}
              onChange={handleChange}
              required
            >
              <MenuItem value="Beginner"> Beginner</MenuItem>
              <MenuItem value="Intermeadiate"> Intermeadiate</MenuItem>
              <MenuItem value="Advanced"> Advanced</MenuItem>
            </TextField>

            <Button type="submit" variant="contained" size="large">
              Create Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EduDashboard;
