import React from 'react';
import eventLogo from '../assets/event-logo.png';
import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios.js';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("");

    axios.post('/login', { email, password })
      .then(result => {
        console.log(result)
        localStorage.setItem('token', result.data.token);
        alert("login successful!");
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        alert("invalid email and password, please try again!");
      })
  }
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

      {/* Login Card */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>

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
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-blue-600 font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          {/* Login Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-gray-600 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
