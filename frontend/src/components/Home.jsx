import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from './api/axios.js';
import eventLogo from '../assets/event-logo.png';

function Home() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    address: '',
    eventName: '',
    date: '',
    city: '',
    state: '',
    zipcode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      setFormData(location.state.event);
      setIsEdit(location.state.index);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        setError('please fill in all fields');
        return;
      }
    }
    if (isEdit !== null) {
      const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
      storedEvents[isEdit] = formData;
      localStorage.setItem('events', JSON.stringify(storedEvents));
      alert('Events updates');
      navigate('/myeventdetails');
    } else {
      try {
        await axios.post("/", formData);
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        storedEvents.push(formData);
        localStorage.setItem('events', JSON.stringify(storedEvents));

        alert('Event created successfully');
        setFormData({
          fname: '',
          lname: '',
          email: '',
          address: '',
          eventName: '',
          date: '',
          city: '',
          state: '',
          zipcode: ''
        })
      } catch (err) {
        console.log('error while adding', err)
        setError('failed to add customer, Try again.');
      }
    }
  };
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
    { to: "/myeventdetails", label: "My Events" },
  ];
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <img
            src={eventLogo}
            alt="logo"
            className="w-12 h-12 rounded-lg object-contain"
          />

          <div className="flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </nav>

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 text-center text-white">


        <h1 className="text-3xl font-semibold mt-2">
          Create Your Event
        </h1>
      </div>

      {/* Form Section */}

      <div className="flex justify-center px-4 py-12">

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-5"
        >

          {error && (
            <p className="bg-red-100 text-red-600 p-2 rounded text-center">
              {error}
            </p>
          )}

          {/* Name */}

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                name="fname"
                type="text"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                name="lname"
                type="text"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@gmail.com"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Address */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Event */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Event Name
            </label>

            <input
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Event Name"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Date */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* City State Zip */}

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">
                City
              </label>

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                State
              </label>

              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Zip Code
              </label>

              <input
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>

          {/* Button */}

          <div className="flex justify-center pt-3">

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium transition"
            >
              {isEdit !== null ? "Update Event" : "Create Event"}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default Home;
