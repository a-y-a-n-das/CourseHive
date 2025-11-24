import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const SigninnedAppbar = ({setIsSignedIn}) => {
  const user = localStorage.getItem("user").split("@")[0];
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px",
          height: "7vh",
          zIndex: 1300,
          backgroundColor: "#eeeeee",
        }}
      >
        <div>
          <Typography color="blue" variant="h5">
            CourseHive
          </Typography>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <Typography color="blue" variant="h6">
              Welcome, {user}
            </Typography>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              size="small"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("edu-token");
                setIsSignedIn(false);
                navigate("/signin");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninnedAppbar;
