import React, { useState } from "react";
import eventLogo from "../assets/event-logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "Password must be 8 characters with uppercase, lowercase, number and special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("/register", {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        alert("Successfully signed up!");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          <img src={eventLogo} alt="logo" className="w-20" />
          <Link
            to="/"
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Register Card */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400"
                }`}
              value={password}
              onChange={handlePasswordChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-blue-600 text-sm font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label className="text-gray-600 text-sm">Confirm Password</label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-blue-600 text-sm font-semibold"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Signup Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;