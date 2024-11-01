import React, { useState, useEffect } from "react";
import { useParcelRegistration } from "../../context/ParcelContext";

const ReceiverAddress = () => {
  const {formData, setFormData, setCurrentState } = useParcelRegistration(); // Context functions
  const [localFormData, setLocalFormData] = useState({
    ReciverName: "",
    RecivercontactNumber: "",
    ReciverAddress: "",
    ReciverCity: "",
    ReciverState: "",
    ReciverPostalCode: "",
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
    if (!localFormData.ReciverName)
      newErrors.ReciverName = "This field is required";
    if (!localFormData.RecivercontactNumber)
      newErrors.RecivercontactNumber = "This field is required";
    if (!localFormData.ReciverAddress)
      newErrors.ReciverAddress = "This field is required";
    if (!localFormData.ReciverCity)
      newErrors.ReciverCity = "This field is required";
    if (!localFormData.ReciverState)
      newErrors.ReciverState = "This field is required";
    if (!localFormData.ReciverPostalCode)
      newErrors.ReciverPostalCode = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateFields()) {
        const updatedFormData = { ...formData, ...localFormData };
        setFormData(updatedFormData);
        localStorage.setItem('parcelFormData', JSON.stringify(updatedFormData));
        setCurrentState(4);
    }
}
  const handlePrevClick = () => {
    const updatedFormData = { ...formData, ...localFormData };
    localStorage.setItem('parcelFormData', JSON.stringify(updatedFormData));
    setCurrentState(2); // Go back to previous step
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal">
                  Step 3/4
                </p>
              </div>
              <div className="rounded bg-[#32415D]">
                <div
                  className="h-2 rounded bg-[#F4C753]"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <h2 className="text-[#F8F9FB] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Receiver Information
            </h2>

            {/* Form Fields */}
            {[
              {
                label: "Full Name",
                name: "ReciverName",
                placeholder: "E.g. John Doe",
              },
              {
                label: "Contact Number",
                name: "RecivercontactNumber",
                placeholder: "E.g. +911234567890",
              },
              {
                label: "Address",
                name: "ReciverAddress",
                placeholder: "123 Main St",
              },
              {
                label: "City",
                name: "ReciverCity",
                placeholder: "E.g. New York",
              },
              {
                label: "State",
                name: "ReciverState",
                placeholder: "E.g. New York",
              },
              {
                label: "Postal Code",
                name: "ReciverPostalCode",
                placeholder: "12345",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
              >
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">
                    {field.label}
                  </p>
                  <input
                    name={field.name}
                    value={localFormData[field.name]} // Use localFormData for the input value
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">
                      {errors[field.name]}
                    </span>
                  )}
                </label>
              </div>
            ))}

            {/* Prev and Next Buttons */}
            <div className="flex gap-4 px-4 py-3">
              <button
                onClick={handlePrevClick}
                className="bg-[#32415D] text-white font-medium py-3 px-6 rounded-lg w-full"
              >
                Prev
              </button>
              <button
                onClick={handleNextClick}
                className="bg-[#F4C753] text-white font-medium py-3 px-6 rounded-lg w-full"
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

export default ReceiverAddress;
