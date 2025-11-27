// import { useState } from 'react'
import Appbar from "./components/Appbar/Appbar.jsx";
import "./App.css";
import Signup from "./components/Student/Signup.jsx";
import Signin from "./components/Student/Signin.jsx";
import UserDashboard from "./components/Student/UserDashboard.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SigninnedAppbar from "./components/Appbar/SigninnedAppbar.jsx";
import PurchaseCourse from "./components/Student/PurchaseCourse.jsx";
import EducatorsSignin from "./components/Educator/EducatorsSignin.jsx";
import EduDashboard from "./components/Educator/EduDashboard.jsx";
import CourseContent from "./components/CourseContent/CourseContent.jsx";
import EducatorSignup from "./components/Educator/EducatorSignup.jsx";
import AddCourseContent from "./components/EditContent/AddCourseContent.jsx";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const gettoken = async () => {
      const token = localStorage.getItem("token");
      const edu_token = localStorage.getItem("edu-token");
      const tokenToVerify = token || edu_token;
      if (!tokenToVerify) {
        setIsSignedIn(false);
        return;
      }

      const res = await fetch(`${API}/api/token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
          "content-type": "application/json",
        },
      });
      if (res.status === 200) {
        setIsSignedIn(true);
        return;
      } else if (res.status === 403) {
        alert("Session expired. Please login again.");
        setIsSignedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("edu-token");
      } else {
        alert("Error: Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("edu-token");
        setIsSignedIn(false);
      }
    };

    gettoken();
  }, [API]);
  if (isSignedIn === null) {
    return <div>Loading...</div>;
  }

   return (
    <Router>
      {isSignedIn ? (
        <SigninnedAppbar setIsSignedIn={setIsSignedIn} />
      ) : (
        <Appbar />
      )}

      <Routes>
        {/* PUBLIC ROUTES */}
        {!isSignedIn && (
          <Route path="/*" element={<PublicRoutes setIsSignedIn={setIsSignedIn} />} />
        )}

        {/* PRIVATE ROUTES */}
        {isSignedIn && (
          <Route path="/*" element={<PrivateRoutes />} />
        )}
      </Routes>
    </Router>
  );
}

function PublicRoutes({ setIsSignedIn }) {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin setIsSignedIn={setIsSignedIn} />} />
      <Route path="/educatorssignin" element={<EducatorsSignin setIsSignedIn={setIsSignedIn} />} />
      <Route path="/educatorsignup" element={<EducatorSignup setIsSignedIn={setIsSignedIn} />} />

    </Routes>
  );
}

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/purchasecourse/:courseId" element={<PurchaseCourse />} />
      <Route path="/edudashboard" element={<EduDashboard />} />
      <Route path="/course/:courseId" element={<CourseContent/>} />
      <Route path="/addcoursecontent/:courseId" element={<AddCourseContent />} />
      <Route path="/signup" element={<UserDashboard />} />
      <Route path="/signin" element={<UserDashboard />} />

    </Routes>
  );
}
export default App;
