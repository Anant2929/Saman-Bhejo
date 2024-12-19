import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useCarrierRegistration } from "../../context/CarrierContext";
import "./Style.css";

const TravelOptionsEnum = {
  AIRPLANE: "Airplane",
  TRAIN: "Train",
  CAR: "Car",
  BICYCLE: "Bicycle",
  MOTORCYCLE: "Motorcycle",
  BOAT: "Boat",
  BUS: "Bus",
  OTHER: "Other",
};

const TravelDetails = () => {
  const [travelMode, setTravelMode] = useState("");
  const [otherMode, setOtherMode] = useState("");
  const [travelingFrom, setTravelingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [ticketPhoto, setTicketPhoto] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { setCarrierCurrentState ,setCarrierFormData} = useCarrierRegistration();

  const handleTravelModeChange = (e) => {
    const value = e.target.value;
    setTravelMode(value);
    if (value !== TravelOptionsEnum.OTHER) setOtherMode("");
    setVehicleModel("");
    setLicensePlate("");
    setTicketPhoto(null);
  };

  const handleTicketPhotoChange = (e) => {
    setTicketPhoto(e.target.files[0]);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  const handlePrevious = () =>{
    setCarrierCurrentState(1);
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-black text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3">
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
                  to={`/home/${item.toLowerCase()}`}
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
              <div className="absolute top-12 right-0 w-48 bg-[#2a2d36] rounded-lg shadow-lg py-4">
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
      <main className="flex flex-1 flex-col items-center justify-center px-10">
        <div className="max-w-lg w-full animate-fadeIn">
          <h1 className="text-2xl font-bold mb-6">New Delivery</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Traveling From
            </label>
            <input
              type="text"
              value={travelingFrom}
              onChange={(e) => setTravelingFrom(e.target.value)}
              placeholder="Enter location"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Going To</label>
            <input
              type="text"
              value={goingTo}
              onChange={(e) => setGoingTo(e.target.value)}
              placeholder="Enter destination"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Date of Traveling
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Mode of Travel
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(TravelOptionsEnum).map((option) => (
                <label
                  key={option}
                  className={`flex items-center px-4 py-2 border rounded-lg transition-all hover:scale-105 ${
                    travelMode === option
                      ? "bg-blue-600 border-blue-500"
                      : "bg-gray-900 border-gray-700"
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="travelMode"
                    value={option}
                    checked={travelMode === option}
                    onChange={handleTravelModeChange}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
            {travelMode === TravelOptionsEnum.OTHER && (
              <input
                type="text"
                placeholder="Specify other mode"
                value={otherMode}
                onChange={(e) => setOtherMode(e.target.value)}
                className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
              />
            )}
          </div>
          {["Car", "Bicycle", "Motorcycle"].includes(travelMode) && (
            <div className="mb-4 animate-fadeIn">
              <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="Enter vehicle model"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  License Plate Number
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="Enter license plate number"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
                />
              </div>
            </div>
          )}
          {["Airplane", "Train", "Bus", "Boat"].includes(travelMode) && (
            <div className="mb-4 animate-fadeIn">
              <h3 className="text-lg font-medium mb-2">Ticket Details</h3>
              <label className="block text-sm font-medium mb-1">
                Upload Ticket Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleTicketPhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
              />
            </div>
          )}
        </div>
      </main>
      <footer className="flex justify-evenly py-4">
        <button className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 transition-all" onClick={() => handlePrevious()}>
          Previous
        </button>
        <button className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 transition-all">
          Next
        </button>
      </footer>
    </div>
  );
};

export default TravelDetails;
