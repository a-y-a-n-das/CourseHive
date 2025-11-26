import { Button, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom';


function Appbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

return(
    <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: "6px",
            height: "7vh", 
            zIndex: 1300,
        }}>
            <div><Typography color="blue" variant="h5">CourseHive</Typography></div>
            <div>
                <Button variant="contained"  onClick={()=>{(token)? navigate("/Signin"): navigate("/educatorssignin")}}>Sign In</Button>
                <Button style={{marginLeft: "10px"}} variant="contained" onClick={()=>{(token)? navigate("/Signup"): navigate("/educatorsignup")}}>Sign Up</Button>
            </div>
        </div>
    </>
)
}

export default Appbar;