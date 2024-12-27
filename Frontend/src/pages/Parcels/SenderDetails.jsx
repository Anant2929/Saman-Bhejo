import React, { useState, useEffect } from 'react';
import { useParcelRegistration } from '../../context/ParcelContext';

const SenderForm = () => {
  const { formData, setFormData, setCurrentState } = useParcelRegistration(); // Context functions
  const [localFormData, setLocalFormData] = useState({
    senderName: '',
    senderContactNumber: '',
    senderAddress: '',
    senderCity: '',
    senderState: '',
    senderPostalCode: '',
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('parcelFormData'));
    if (savedData) {
      setLocalFormData(prevData => ({
        ...prevData,
        ...savedData,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const updatedData = { ...localFormData, [e.target.name]: e.target.value };
    setLocalFormData(updatedData);
  };

  const validateFields = () => {
    let newErrors = {};
    if (!localFormData.senderName) newErrors.senderName = 'This field is required';
    if (!localFormData.senderContactNumber) newErrors.senderContactNumber = 'This field is required';
    if (!localFormData.senderAddress) newErrors.senderAddress = 'This field is required';
    if (!localFormData.senderCity) newErrors.senderCity = 'This field is required';
    if (!localFormData.senderState) newErrors.senderState = 'This field is required';
    if (!localFormData.senderPostalCode) newErrors.senderPostalCode = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateFields()) {
        const updatedFormData = { ...formData, ...localFormData };
        setFormData(updatedFormData);
        localStorage.setItem('parcelFormData', JSON.stringify(updatedFormData));
        setCurrentState(3);
    }
};

  const handlePrevClick = () => {
    const updatedFormData = { ...formData, ...localFormData };
    localStorage.setItem('parcelFormData', JSON.stringify(updatedFormData));
    setCurrentState(1); // Go back to previous step
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#000000] text-white overflow-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center items-center px-6 py-10">
          <div className="layout-content-container flex flex-col w-full max-w-[600px] bg-[#000000] rounded-2xl shadow-lg p-8">
            {/* Step Progress */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-[#F4C753] text-sm font-semibold ">Step 2/4</p>
              </div>
              <div className="relative w-full h-2 bg-[#334155] rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            {/* Header */}
            <h2 className="text-[#F9FAFA] text-[24px] font-bold leading-snug mb-8 text-center">
              Sender Information
            </h2>

            {/* Form Fields */}
            {[
              { label: "Full Name", name: "senderName", placeholder: "E.g. John Doe" },
              { label: "Contact Number", name: "senderContactNumber", placeholder: "E.g. +911234567890" },
              { label: "Address", name: "senderAddress", placeholder: "123 Main St" },
              { label: "State", name: "senderState", placeholder: "E.g. New York" },
              { label: "City", name: "senderCity", placeholder: "E.g. New York" },
              { label: "Postal Code", name: "senderPostalCode", placeholder: "12345" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2 mb-6">
                <label className="text-[#D1D5DB] text-base font-medium">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={localFormData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">{errors[field.name]}</span>
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevClick}
                className="bg-[#32415D] text-[#F9FAFA] font-medium py-3 px-6 rounded-lg w-full hover:bg-[#435469] transition duration-200"
              >
                Prev
              </button>
              <button
                onClick={handleNextClick}
                 className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"

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

export default SenderForm;
