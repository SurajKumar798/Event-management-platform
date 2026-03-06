import React, { useState, useEffect } from 'react';
import eventLogo from '../assets/event-logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/customers');
      setCustomers(response.data);
    } catch (err) {
      console.log('error fetching customer:', err)
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log('error while delete customer:', err)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <img src={eventLogo} alt="logo" className="w-10 h-10" />
            <h1 className="text-lg font-semibold text-gray-700">
              Event Dashboard
            </h1>
          </div>

          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Home
          </Link>

        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Event List
          </h2>

          <span className="text-sm text-gray-500">
            Total: {customers.length}
          </span>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              {/* Table Head */}
              <thead className="bg-blue-500 text-white uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">

                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {customer.fname} {customer.lname}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {customer.email}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {customer.address}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {customer.eventName}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {customer.date}
                      </td>

                      <td className="px-6 py-4 flex justify-center">

                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400"
                    >
                      No Customers Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
