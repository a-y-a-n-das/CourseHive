import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";


function EducatorsSignin({setIsSignedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));
  const API = import.meta.env.VITE_API_URL;


    const userSignin = async ( ) => {
    try {
      const res = await fetch(`${API}/api/educatorsignin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setPassword("");
        setEmail("");
        localStorage.setItem("edu-token", data.token)
        localStorage.setItem("educator", data.resObj.email)
        setIsSignedIn(true);
        await sleep(1000);
        navigate("/edudashboard");
      } else setMessage(data.message);
    } catch (err) {
      console.error("signin error:", err);
      setMessage("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          height: "93vh",
          paddingTop: "15vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <div style={{ justifyContent: "center" }}>
          <Typography
            textAlign={"center"}
            style={{ justifyContent: "center" }}
            variant="h4"
          >
            Welcome back Educator
            <br />
            Let's get you signned in!
          </Typography>

          <br />

          <Card
            variant="outlined"
            style={{
              width: "500px",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1vh",
            }}
          >
            <div style={{ padding: "20px", paddingTop: "50px" }}>
              <TextField
                fullWidth
                variant="outlined"
                type={"Text"}
                label="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
              <br />
              <br />
              <TextField
                fullWidth
                variant="outlined"
                type={"password"}
                label="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <br />
              <Button
                style={{ margin: "18px 0px" }}
                variant="contained"
                onClick={() => {
                  userSignin();
                }}
              >
                Sign in
              </Button>
              {message && (
              <Typography
                textAlign="center"
                style={{ marginTop: "10px", color: "#333" }}
              >
                {message}
              </Typography>
            )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}




export default EducatorsSignin;