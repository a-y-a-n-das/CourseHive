import { Button, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom';


function Appbar(){
    const navigate = useNavigate();
return(
    <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: "6px",
            height: "7vh", 
        }}>
            <div><Typography color="blue" variant="h5">CourseHive</Typography></div>
            <div>
                <Button variant="contained"  onClick={()=>{navigate("/Signin")}}>Sign In</Button>
                <Button style={{marginLeft: "10px"}} variant="contained" onClick={()=>{navigate("/Signup")}}>Sign Up</Button>
            </div>
        </div>
    </>
)
}

export default Appbar;