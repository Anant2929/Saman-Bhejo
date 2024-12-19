import React, { useState, useEffect } from "react";
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
    carriercarrierTravelMode: "",
    otherMode: "",
    travelingFrom: "",
    goingTo: "",
    carriertravelDate: "",
    carrierVehicleModel: "",
    carrierLicensePlate: "",
    carrierTicketPhoto: null,
    carrierFromState:""
  });
  const [errors, setErrors] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const { setCarrierCurrentState, setCarrierFormData } = useCarrierRegistration();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("travelFormData"));
    if (savedData) {
      setFormData((prevData) => ({
        ...prevData,
        ...savedData,
      }));
    }
  }, []);

  const handleTravelModeChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      carrierTravelMode: value,
    }));
    if (value !== TravelOptionsEnum.OTHER) {
      setFormData((prevData) => ({ ...prevData, otherMode: "" }));
    }
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

  const handlePrevious = () => {
    setCarrierCurrentState(1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.carrierTravelMode) newErrors.carrierTravelMode = "This field is required";
    if (!formData.travelingFrom) newErrors.travelingFrom = "This field is required";
    if (!formData.goingTo) newErrors.goingTo = "This field is required";
    if (!formData. carriertravelDate) newErrors. carriertravelDate = "This field is required";

    if (["Car", "Bicycle", "Motorcycle"].includes(formData.carrierTravelMode)) {
      if (!formData.carrierVehicleModel) newErrors.carrierVehicleModel = "Vehicle model is required";
      if (!formData. carrierLicensePlate) newErrors. carrierLicensePlate = "License plate is required";
    }

    if (["Airplane", "Train", "Bus", "Boat"].includes(formData.carrierTravelMode)) {
      if (!formData.ticketPhoto) newErrors.ticketPhoto = "Ticket photo is required";
    }

    if (formData.carrierTravelMode === TravelOptionsEnum.OTHER && !formData.otherMode) {
      newErrors.otherMode = "Please specify the other mode of travel";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const updatedFormData = { ...formData };
      localStorage.setItem("travelFormData", JSON.stringify(updatedFormData));
      setCarrierFormData(updatedFormData);
      setCarrierCurrentState(3) 
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-black text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <header className="flex items-center justify-between border-b border-solid border-b-[#392f28] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="w-6 h-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold">Saman Bhejo</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {['Home', 'About', 'Notifications', 'Pricing', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/home/${item.toLowerCase()}`}
                className="text-white text-sm font-medium hover:text-[#607AFB]"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="relative">
            <div
              className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer hover:scale-110"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
                <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
              </svg>
            </div>
            {showSidebar && (
              <div className="absolute top-12 right-0 w-48 bg-[#2a2d36] rounded-lg shadow-lg py-4">
                {["Edit Profile", "Add Address", "Parcels", "Payment Methods"].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A]"
                    onClick={() => handleSidebarClick(`/userProfile/${item.toLowerCase().replace(' ', '-')}`)}
                  >
                    {item}
                  </button>
                ))}
                <Logout />
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-10">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-6">New Delivery</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Traveling From</label>
            <input
              type="text"
              name="travelingFrom"
              value={formData.travelingFrom}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.travelingFrom && <p className="text-red-500 text-sm">{errors.travelingFrom}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Going To</label>
            <input
              type="text"
              name="goingTo"
              value={formData.goingTo}
              onChange={handleInputChange}
              placeholder="Enter destination"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.goingTo && <p className="text-red-500 text-sm">{errors.goingTo}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Traveling</label>
            <input
              type="date"
              name=" carriertravelDate"
              value={formData. carriertravelDate}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors. carriertravelDate && <p className="text-red-500 text-sm">{errors. carriertravelDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mode of Travel</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(TravelOptionsEnum).map((option) => (
                <label
                  key={option}
                  className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer ${
                    formData.carrierTravelMode === option
                      ? "bg-blue-600 border-blue-500"
                      : "bg-gray-900 border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="carrierTravelMode"
                    value={option}
                    checked={formData.carrierTravelMode === option}
                    onChange={handleTravelModeChange}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.carrierTravelMode && <p className="text-red-500 text-sm">{errors.carrierTravelMode}</p>}
            {formData.carrierTravelMode === TravelOptionsEnum.OTHER && (
              <input
                type="text"
                name="otherMode"
                value={formData.otherMode}
                onChange={handleInputChange}
                placeholder="Specify other mode"
                className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
              />
            )}
            {errors.otherMode && <p className="text-red-500 text-sm">{errors.otherMode}</p>}
          </div>
          {["Car", "Bicycle", "Motorcycle"].includes(formData.carrierTravelMode) && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Vehicle Details</label>
              <input
                type="text"
                name="carrierVehicleModel"
                value={formData.carrierVehicleModel}
                onChange={handleInputChange}
                placeholder="Vehicle Model"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 mb-2"
              />
              {errors.carrierVehicleModel && <p className="text-red-500 text-sm">{errors.carrierVehicleModel}</p>}
              <input
                type="text"
                name=" carrierLicensePlate"
                value={formData. carrierLicensePlate}
                onChange={handleInputChange}
                placeholder="License Plate"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
              />
              {errors. carrierLicensePlate && <p className="text-red-500 text-sm">{errors. carrierLicensePlate}</p>}
            </div>
          )}
          {["Airplane", "Train", "Bus", "Boat"].includes(formData.carrierTravelMode) && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Ticket Photo</label>
              <input
                type="file"
                name="carrierTicketPhoto"
                onChange={handleTicketPhotoChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
              />
              {errors.carrierTicketPhoto && <p className="text-red-500 text-sm">{errors.carrierTicketPhoto}</p>}
            </div>
          )}
        </div>
      </main>
      <footer className="flex justify-evenly py-4">
        <button
          className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
          onClick={handleNext}
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default TravelDetails;
