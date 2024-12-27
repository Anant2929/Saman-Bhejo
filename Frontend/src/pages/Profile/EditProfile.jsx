import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import Logout from "../Auth/Logout";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isEditingEmail, setIsEditingEmail] = useState(false); // Toggle email editing
  const [aadhaarVerified, setAadhaarVerified] = useState(false); // Aadhaar verification state
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/UserDetails", {
          withCredentials: true,
        });
        setUserDetails(response.data);
        setEmail(response.data.email);
        setAadhaar(response.data.aadhaar || ""); // Optional Aadhaar
        setAadhaarVerified(false); // Reset verification on fetch
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setAadhaar(value);
    setAadhaarVerified(false); // Reset verification if Aadhaar changes
  };

  const verifyAadhaar = () => {
    // Placeholder Aadhaar verification logic
    if (validateAadhaar(aadhaar)) {
      alert("Aadhaar verified successfully!");
      setAadhaarVerified(true);
    } else {
      alert("Please enter a valid 12-digit Aadhaar number.");
    }
  };

  const validateAadhaar = (aadhaarNumber) => {
    if (!/^\d{12}$/.test(aadhaarNumber)) return false; // Check format with regex
  
    // Verhoeff Algorithm Logic
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];
  
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
  
    let c = 0;
    const invertedArray = aadhaarNumber.split("").reverse();
    for (let i = 0; i < invertedArray.length; i++) {
      c = d[c][p[i % 8][parseInt(invertedArray[i], 10)]];
    }
  
    return c === 0;
  };

  const updateUserDetails = async () => {
    if (!aadhaarVerified && aadhaar) {
      alert("Please verify your Aadhaar before updating.");
      return;
    }

    try {
      const updateData = { email, aadhaar: aadhaar || userDetails.aadhaar };
      const response = await axios.put(
        "/api/user/UpdateUserDetails",
        updateData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setUserDetails({ ...userDetails, email, aadhaar });
        setIsEditingEmail(false);
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header  className = "fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50 ">

{/* <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3 overflow-y-hidden"> */} 
        <div className="flex items-center gap-4 text-white animate-blink">
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Saman Bhejo
          </h2>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`} // Automatically generates the correct path
                  className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
          <div className="relative">
            <div
              className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer transition transform duration-300 hover:scale-110"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 256 256"
              >
                <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
              </svg>
            </div>

            {showSidebar && (
              <div className="absolute top-12 right-0 w-48 bg-[#111216] border rounded-xl shadow-lg py-4">
                {[
                  "Edit Profile",
                  "Add Address",
                  "Parcels",
                  "Payment Methods",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A] transition"
                    onClick={() =>
                      handleSidebarClick(
                        `/userProfile/${item.toLowerCase().replace(" ", "-")}`
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
                {/* Use the Logout component here */}
                <Logout />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center py-10 px-4">
        {/* Profile Picture Section */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className="w-32 h-32 bg-gray-700 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                profilePicture || "https://via.placeholder.com/150"
              })`,
            }}
          ></div>
          <label className="mt-4 inline-block text-blue-500 hover:underline cursor-pointer">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info Section */}
        <div className="w-full max-w-md">
          {/* Name */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-400">Name:</label>
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
              <span>{userDetails.name || "Loading..."}</span>
            </div>
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-400">Contact Number:</label>
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
              <span>{userDetails.contactNumber || "Loading..."}</span>
            </div>
          </div>

          {/* Email with Edit Option */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-400">Email ID:</label>
            <div className="flex items-center bg-gray-800 p-3 rounded">
              {isEditingEmail ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 focus:outline-none text-white"
                />
              ) : (
                <span className="flex-1">{email}</span>
              )}
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-blue-500 hover:underline ml-4"
              >
                {isEditingEmail ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Aadhaar with Verify Option */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-400">Aadhaar Number:</label>
            <div className="flex items-center bg-gray-800 p-3 rounded">
              <input
                type="text"
                value={aadhaar}
                maxLength="12"
                onChange={handleAadhaarChange}
                placeholder="Enter Aadhaar number"
                className="bg-transparent flex-1 focus:outline-none text-white"
              />
              <button
                onClick={verifyAadhaar}
                className={`ml-4 px-4 py-1 rounded ${
                  aadhaarVerified ? "bg-green-500" : "bg-blue-500"
                } text-white hover:bg-opacity-90`}
              >
                {aadhaarVerified ? "Verified" : "Verify"}
              </button>
            </div>
            {aadhaar.length > 0 && aadhaar.length < 12 && (
              <span className="text-red-500 text-sm">
                Aadhaar number must be 12 digits.
              </span>
            )}
          </div>
        </div>

        <button
          onClick={updateUserDetails}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
