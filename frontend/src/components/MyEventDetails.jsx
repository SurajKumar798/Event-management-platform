import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import eventLogo from '../assets/event-logo.png';

function MyEventDetails() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    if (Array.isArray(storedEvents)) {
      setEvents(storedEvents);
    } else {
      setEvents([]);
    }
  }, []);

  const handleEdit = (event, index) => {
    navigate('/', {
      state: { event, isEdit: true, index }
    });
  };

  const handleDelete = (index) => {
    const updateEvents = events.filter((_, i) => i !== index);
    localStorage.setItem('events', JSON.stringify(updateEvents));
    setEvents(updateEvents);
  }
  return (
    <div className="min-h-screen bg-gray-100">

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

      {/* Page Title */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          My Event Details
        </h2>

        {/* Table Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">

          {events.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No events found.
            </p>
          ) : (
            <table className="min-w-full text-sm text-gray-700 text-center">

              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4">Sl No</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">

                    <td className="py-3 px-4">{index + 1}</td>

                    <td className="py-3 px-4">
                      {event.fname} {event.lname}
                    </td>

                    <td className="py-3 px-4">{event.email}</td>

                    <td className="py-3 px-4">{event.address}</td>

                    <td className="py-3 px-4">{event.eventName}</td>

                    <td className="py-3 px-4">{event.date}</td>

                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(event, index)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEventDetails;
