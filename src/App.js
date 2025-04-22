import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import Login from "./modules/login/index.tsx";
import Signup from "./modules/signup/index.tsx";
import Course from "./modules/course/index.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Feedback from "./modules/feedback/index.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        {<NavBar />}
        <Routes>
          {/* Redirect root path to login page */}
          <Route path="/" element={<Navigate to="/course" replace />} />

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Course routes */}
          <Route path="/course" element={<Course />} />

          {/* Feedback routes - support both query parameter and route parameter approaches */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/courses/:courseId" element={<Feedback />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
