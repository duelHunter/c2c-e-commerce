// src/pages/Profile.js
import axios from "axios";
import React, { useState, useEffect } from "react";

function Profile() {
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({
    profilePhoto: "https://via.placeholder.com/150",
    username: "",
    email: "",
    mobileNo: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile data from API on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("marketpulsetoken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          profilePhoto:
            response.data.profilePhoto || "https://via.placeholder.com/150",
          username: response.data.username,
          email: response.data.email,
          mobileNo: response.data.mobileNo,
          address: response.data.address,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  //get input field changes to the "formdata" variable
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //what to do when "Edit" button is pressed
  const handleEdit = (section) => {
    setEditSection(section);
  };

  //update profile data when save button is pressed
  const handleSave = async (section) => {
    try {
      const token = localStorage.getItem("marketpulsetoken");
      const tester = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/updateProfileDetails`,
        {
          //payload
          [section]: formData[section],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(tester.data);

      setEditSection(null);
    } catch (error) {
      console.error("Error saving profile data", error);
    }
  };

  const handleCancel = () => {
    setEditSection(null);
  };

  // Logout function
  const logoutMe = async () => {
    try {
      const token = localStorage.getItem("marketpulsetoken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("marketpulsetoken");
      window.location.href = "/";
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Info</h1>

      {/* Profile Photo Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
        <div className="flex flex-col items-start">
          {editSection === "profilePhoto" ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                name="profilePhoto"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={formData.profilePhoto}
                onChange={handleInputChange}
              />
              <button
                onClick={() => handleSave("profilePhoto")}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 cursor-pointer"
                onClick={() => handleEdit("profilePhoto")}
              />
              <p>{formData.username}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          {/* Username Section */}
          <div>
            <label className="block text-gray-700">Username</label>
            {editSection === "username" ? (
              <div>
                <input
                  type="text"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleSave("username")}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p>{formData.username}</p>
                <button
                  onClick={() => handleEdit("username")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Email Address Section */}
          <div>
            <label className="block text-gray-700">Email</label>
            {editSection === "email" ? (
              <div>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(e.target.value)) {
                      alert("Please enter a valid email address");
                    }
                  }}
                  required
                />
                <button
                  onClick={() => handleSave("email")}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p>{formData.email}</p>
                <button
                  onClick={() => handleEdit("email")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Phone Number Section */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            {editSection === "mobileNo" ? (
              <div>
                <input
                  type="tel"
                  name="mobileNo"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleSave("mobileNo")}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p>{formData.mobileNo}</p>
                <button
                  onClick={() => handleEdit("mobileNo")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-gray-700">Address</label>
            {editSection === "address" ? (
              <div>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleSave("address")}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p>{formData.address}</p>
                <button
                  onClick={() => handleEdit("address")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout and Delete Account */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Logout</h2>
        <button
          onClick={logoutMe}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        <button className="bg-red-700 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
