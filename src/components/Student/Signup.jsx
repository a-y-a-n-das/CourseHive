import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const userSignup = async () => {
    try {
      const res = await fetch(`${API}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setPassword("");
        setEmail("");
      } else setMessage(data.message);
    } catch (err) {
      console.error("signup error:", err);
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
            Welcome back
            <br />
            Let's get you signned up!
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br />
              <br />
              <TextField
                fullWidth
                variant="outlined"
                type={"password"}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <br />
              <Button
                style={{ margin: "18px 0px" }}
                variant="contained"
                onClick={() => {
                  userSignup(
                    email,
                    password,
                    setEmail,
                    setPassword,
                    setMessage
                  );
                }}
              >
                Sign up
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

export default Signup;
