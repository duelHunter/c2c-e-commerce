// src/pages/Profile.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

function Profile() {
  const toast = useToast();
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({
    profilePhoto: "https://via.placeholder.com/150",
    username: "",
    email: "",
    mobileNo: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch profile data from API on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("marketpulsetoken");
        if (!token) {
          setError("Please login to view your profile");
          setLoading(false);
          return;
        }

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
          username: response.data.username || "",
          email: response.data.email || "",
          mobileNo: response.data.mobileNo || "",
          address: response.data.address || "",
        });
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching profile data", error);
        setError(error.response?.data?.msg || error.response?.data?.error || "Failed to load profile data");
        setLoading(false);
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem("marketpulsetoken");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
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
      setError(null);
      setSuccess(null);
      const token = localStorage.getItem("marketpulsetoken");
      
      if (!token) {
        setError("Please login to update your profile");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/updateProfileDetails`,
        {
          //payload
          [section]: formData[section],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update formData with response data
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          [section]: response.data[section] || formData[section],
        }));
      }

      setEditSection(null);
      setSuccess(`${section === "profilePhoto" ? "Profile photo" : section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error saving profile data", error);
      setError(error.response?.data?.msg || error.response?.data?.error || `Failed to update ${section}`);
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleCancel = () => {
    setEditSection(null);
  };

  // Logout function
  const logoutMe = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("marketpulsetoken");
      
      if (token) {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_API_URL}/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          // Even if logout API fails, remove token locally
          console.error("Error calling logout API", err);
        }
      }
      
      localStorage.removeItem("marketpulsetoken");
      window.location.href = "/";
    } catch (err) {
      console.error("Error logging out", err);
      // Still remove token and redirect even if there's an error
      localStorage.removeItem("marketpulsetoken");
      window.location.href = "/";
    }
  };

  // Delete account function
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (!confirmed) {
      return;
    }

    const doubleConfirm = window.confirm(
      "This will permanently delete your account and all associated data. Are you absolutely sure?"
    );

    if (!doubleConfirm) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      const token = localStorage.getItem("marketpulsetoken");
      
      if (!token) {
        setError("Please login to delete your account");
        setIsDeleting(false);
        return;
      }

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/deleteAccount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove token and redirect
      localStorage.removeItem("marketpulsetoken");
      toast.success("Your account has been deleted successfully.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting account", error);
      setError(error.response?.data?.msg || error.response?.data?.error || "Failed to delete account. Please try again.");
      setIsDeleting(false);
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">My Info</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

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
                      toast.warning("Please enter a valid email address");
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
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className={`${
            isDeleting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800"
          } text-white px-4 py-2 rounded`}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
