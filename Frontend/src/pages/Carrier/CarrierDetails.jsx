import React, { useState, useEffect } from 'react';
import { useCarrierRegistration } from "../../context/CarrierContext";

const CarrierDetails = () => {
  const [formData, setFormData] = useState({
    carrierName: "",
    contactNumber: "",
    carrierCity: "",
    carrierState: "",
    carrierZipcode: "",
  });

  const [errors, setErrors] = useState({});

  const { setCarrierCurrentState, setCarrierFormData, CarrierFormData } =
  useCarrierRegistration();


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("carrierFormData"));
    if (savedData) {
      setFormData((prevData) => ({
        ...prevData,
        ...savedData,
      }));
    }
  }, []);


  const handleInputChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    setCarrierFormData(updatedData);
  };



  const validateForm = () => {
    const newErrors = {};
    if (!formData.carrierName) newErrors.carrierName = "This field is required";
    if (!formData.contactNumber) newErrors.contactNumber = "This field is required";
    if (!formData.carrierCity) newErrors.carrierCity = "This field is required";
    if (!formData.carrierState) newErrors.carrierState = "This field is required";
    if (!formData.carrierZipcode) newErrors.carrierZipcode = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const updatedFormData = { ...CarrierFormData, ...formData };
      localStorage.setItem("carrierFormData", JSON.stringify(updatedFormData));
      setCarrierCurrentState(2);
    }
  };



  return (
    <div
      className="relative flex min-h-screen flex-col bg-black overflow-hidden"
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-gray-800 px-8 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="w-8 h-8">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold">Courier</h2>
          </div>
          <input
            placeholder="Search"
            className="form-input w-64 rounded-xl bg-gray-800 text-white placeholder-gray-500 px-4 py-2 focus:outline-none"
          />
        </header>

        <div className="flex flex-1 justify-center items-center py-6">
          <div className="flex flex-col w-full max-w-lg bg-gray-900 rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-white">Step 1: Carrier Details</p>
              </div>
              <div className="rounded bg-gray-700">
                <div className="h-2 rounded bg-blue-500" style={{ width: "25%" }}></div>
              </div>
            </div>

            <h1 className="text-xl font-bold text-white py-4">Carrier Information</h1>

            <div className="flex flex-col gap-4">
              <div>
                <input
                  name="carrierName"
                  placeholder="Carrier Name"
                  value={formData.carrierName}
                  onChange={handleInputChange}
                  className="form-input rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
                />
                {errors.carrierName && (
                  <p className="text-red-500 text-sm mt-1">{errors.carrierName}</p>
                )}
              </div>
              <div>
                <input
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="form-input rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white py-4">Address</h3>

            <div className="flex gap-4">
              <div>
                <input
                  name="carrierCity"
                  placeholder="carrierCity"
                  value={formData.carrierCity}
                  onChange={handleInputChange}
                  className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
                />
                {errors.carrierCity && <p className="text-red-500 text-sm mt-1">{errors.carrierCity}</p>}
              </div>
              <div>
                <input
                  name="carrierState"
                  placeholder="carrierState"
                  value={formData.carrierState}
                  onChange={handleInputChange}
                  className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
                />
                {errors.carrierState && <p className="text-red-500 text-sm mt-1">{errors.carrierState}</p>}
              </div>
            </div>

            <div className="flex gap-4 py-4">
              <div>
                <input
                  name="carrierZipcode"
                  placeholder="carrierZipcode"
                  value={formData.carrierZipcode}
                  onChange={handleInputChange}
                  className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
                />
                {errors.carrierZipcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.carrierZipcode}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="flex items-center justify-center rounded-lg bg-blue-500 text-white px-6 py-3 font-bold text-base hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierDetails;
