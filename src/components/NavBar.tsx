import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  // Check if user exists in localStorage
  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("user"); // Clear user from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Course Review</div>

      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search course name"
          className="w-1/2 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Show Sign Out button only if user exists */}
      {user && (
        <button
          onClick={handleSignOut}
          className="bg-blue-500 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Sign Out
        </button>
      )}
    </nav>
  );
}

export default NavBar;
