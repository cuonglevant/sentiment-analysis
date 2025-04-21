import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./modules/login/index.tsx";
import Signup from "./modules/signup/index.tsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root path to login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Add your other application routes here */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
