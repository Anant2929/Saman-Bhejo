import React, { useState ,useEffect } from "react";
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

  const [formData, setFormData] = useState({
    travelMode: "",
    otherMode: "",
    travelingFrom: "",
    goingTo: "",
    travelDate: "",
    vehicleModel: "",
    licensePlate: "",
    ticketPhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const { setCarrierCurrentState ,setCarrierFormData} = useCarrierRegistration();


    // Load saved data from localStorage
    useEffect(() => {
      const savedData = JSON.parse(localStorage.getItem("travelFormData"));
      if (savedData) {
        setFormData((prevData) => ({
          ...prevData,
          ...savedData,
        }));
      }
    }, [])
  const handleTravelModeChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      travelMode: value,
    }));
    if (value !== TravelOptionsEnum.OTHER) setFormData((prevData) => ({ ...prevData, otherMode: "" }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleTicketPhotoChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      ticketPhoto: e.target.files[0],
    }));
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
  const validateForm = () => {
    const newErrors = {};
  
    // General validations
    if (!formData.travelMode) newErrors.travelMode = "This field is required";
    if (!formData.travelingFrom) newErrors.travelingFrom = "This field is required";
    if (!formData.goingTo) newErrors.goingTo = "This field is required";
    if (!formData.travelDate) newErrors.travelDate = "This field is required";
  
    // Check for vehicle details if car or bicycle is selected
    if (["Car", "Bicycle", "Motorcycle"].includes(formData.travelMode)) {
      if (!formData.vehicleModel) newErrors.vehicleModel = "Vehicle model is required";
      if (!formData.licensePlate) newErrors.licensePlate = "License plate is required";
    }
  
    // Check for ticket details if airplane, train, bus, or boat is selected
    if (["Airplane", "Train", "Bus", "Boat"].includes(formData.travelMode)) {
      if (!formData.ticketPhoto) newErrors.ticketPhoto = "Ticket photo is required";
    }
  
    // Check for other mode if selected
    if (formData.travelMode === TravelOptionsEnum.OTHER && !formData.otherMode) {
      newErrors.otherDetails = "Please specify the other mode of travel";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateForm()) {
      const updatedFormData = { ...formData };
      localStorage.setItem("travelFormData", JSON.stringify(updatedFormData));
      setCarrierFormData(updatedFormData);
      // Redirect or update state here
    }
  };



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
              name ="travelingFrom"
              value={formData.travelingFrom}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
            {errors.travelingFrom && (
              <p className="text-red-500 text-sm">{errors.travelingFrom}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Going To</label>
            <input
              type="text"
              name = "goingTo"
              value={formData.goingTo}
              onChange={handleInputChange}
              placeholder="Enter destination"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
            {errors.goingTo && (
              <p className="text-red-500 text-sm">{errors.goingTo}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Date of Traveling
            </label>
            <input
              type="date"
              name = "travelDate"
              value={formData.travelDate}
               onChange={handleInputChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
            />
             {errors.travelDate && (
              <p className="text-red-500 text-sm">{errors.travelDate}</p>
            )}
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
                    formData.travelMode === option
                      ? "bg-blue-600 border-blue-500"
                      : "bg-gray-900 border-gray-700"
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="travelMode"
                    value={option}
                    checked={formData.travelMode === option}
                    onChange={handleTravelModeChange}
                    className="hidden"
                  />
                  {option}
                </label>
                
              ))}
               {errors.travelMode && (
              <p className="text-red-500 text-sm">{errors.travelMode}</p>
            )}

            </div>
            {formData.travelMode === TravelOptionsEnum.OTHER && (
              <input
                type="text"
                name="othermode"
                placeholder="Specify other mode"
                value={formData.otherMode}
                
                className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
              />
            )}
             {formData.travelMode === "otherMode"&& errors.otherDetails &&(
              <p className="text-red-500 text-sm">{errors.otherMode}</p>
            )}
          </div>
          {["Car", "Bicycle", "Motorcycle"].includes(formData.travelMode) && (
            <div className="mb-4 animate-fadeIn">
              <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  name = "vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
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
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="Enter license plate number"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 focus:outline-none"
                />
              </div>
            </div>
          )}
          {["Airplane", "Train", "Bus", "Boat"].includes(formData.travelMode) && (
            <div className="mb-4 animate-fadeIn">
              <h3 className="text-lg font-medium mb-2">Ticket Details</h3>
              <label className="block text-sm font-medium mb-1">
                Upload Ticket Photo
              </label>
              <input
                type="file"
                name ="file"
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
        <button className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 transition-all"  onClick={() => handleNext()}>
          Continue
        </button>
      </footer>
    </div>
  );
};

export default TravelDetails;
