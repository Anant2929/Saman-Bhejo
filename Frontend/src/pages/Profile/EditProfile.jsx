import React, { useState } from 'react';

const EditProfile = () => {
  const [email, setEmail] = useState('user@example.com');
  const [address, setAddress] = useState('123 Main Street');
  const [aadhaar, setAadhaar] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = () => {
    const newEmail = prompt('Enter new email:', email);
    if (newEmail) setEmail(newEmail);
  };

  const handleAddressChange = () => {
    const newAddress = prompt('Enter new address:', address);
    if (newAddress) setAddress(newAddress);
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setAadhaar(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <div className="mb-8 flex flex-col items-center">
        <div
          className="w-32 h-32 bg-gray-700 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profilePicture || 'https://via.placeholder.com/150'})` }}
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

      <div className="w-full max-w-md">
        <div className="mb-6">
          <label className="block mb-2 text-gray-400">Email ID:</label>
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <span>{email}</span>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleEmailChange}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-400">Address:</label>
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <span>{address}</span>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleAddressChange}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-400">Aadhaar Number:</label>
          <input
            type="text"
            value={aadhaar}
            maxLength="12"
            onChange={handleAadhaarChange}
            placeholder="Enter your Aadhaar number"
            className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          {aadhaar.length > 0 && aadhaar.length < 12 && (
            <span className="text-red-500 text-sm">Aadhaar number must be 12 digits.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
