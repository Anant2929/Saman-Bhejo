import React, { useState, useEffect } from "react";
import { useParcelRegistration } from "../../context/ParcelContext";

export default function ParcelForm() {
  const { formData, setFormData, setCurrentState } = useParcelRegistration();
  const [localFormData, setLocalFormData] = useState({
    parcelName: "",
    parcelWeight: "",
    parcelType: "",
    parcelDescription: "",
    parcelPhotoURL: "",
    volume: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("parcelFormData"));
    if (savedData) {
      setLocalFormData((prevData) => ({
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
    if (!localFormData.parcelName)
      newErrors.parcelName = "This field is required";
    if (!localFormData.parcelWeight)
      newErrors.parcelWeight = "This field is required";
    if (!localFormData.parcelType)
      newErrors.parcelType = "This field is required";
    if (!localFormData.parcelDescription)
      newErrors.parcelDescription = "This field is required";
    if (!localFormData.volume) newErrors.volume = "This field is required";
    // if (!localFormData.parcelPhotoURL) newErrors.parcelPhotoURL = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateFields()) {
      const updatedFormData = { ...formData, ...localFormData };
      setFormData(updatedFormData);
      localStorage.setItem("parcelFormData", JSON.stringify(updatedFormData));
      setCurrentState(2);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-[#000000] text-white overflow-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex flex-1 justify-center items-center px-6 py-10">
        <div className="layout-content-container flex flex-col w-full max-w-[600px] bg-[#000000] rounded-2xl shadow-lg p-8">
          {/* Step Progress */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-[#F4C753] text-sm font-semibold">
                Step 1/4
              </p>
            </div>
            <div className="relative w-full h-2 bg-[#0F172A] rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-[#F9FAFA] text-[24px] font-bold leading-snug mb-8 text-center">
            Parcel Details
          </h1>

          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Parcel Name */}
            <label className="flex flex-col gap-2">
              <p className="text-[#D1D5DB] text-base font-medium">Parcel Name</p>
              <input
                name="parcelName"
                value={localFormData.parcelName}
                onChange={handleInputChange}
                placeholder="E.g. Birthday Gift"
                className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              {errors.parcelName && (
                <span className="text-red-500 text-xs">
                  {errors.parcelName}
                </span>
              )}
            </label>

            {/* Weight and Type */}
            <div className="flex gap-4">
              {/* Weight */}
              <label className="flex-1 flex flex-col gap-2">
                <p className="text-[#D1D5DB] text-base font-medium">Weight (kg)</p>
                <input
                  name="parcelWeight"
                  value={localFormData.parcelWeight}
                  onChange={handleInputChange}
                  placeholder="1 kg"
                  className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
                {errors.parcelWeight && (
                  <span className="text-red-500 text-xs">
                    {errors.parcelWeight}
                  </span>
                )}
              </label>

              {/* Type */}
              <label className="flex-1 flex flex-col gap-2">
                <p className="text-[#D1D5DB] text-base font-medium">Type</p>
                <select
                  name="parcelType"
                  value={localFormData.parcelType}
                  onChange={handleInputChange}
                  className="form-select w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Document">Document</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Food">Food</option>
                  <option value="Medicines">Medicines</option>
                  <option value="Others">Others</option>
                </select>
                {errors.parcelType && (
                  <span className="text-red-500 text-xs">
                    {errors.parcelType}
                  </span>
                )}
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-2">
              <p className="text-[#D1D5DB] text-base font-medium">Description</p>
              <textarea
                name="parcelDescription"
                value={localFormData.parcelDescription}
                onChange={handleInputChange}
                placeholder="E.g. A box of chocolates"
                className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753] resize-none h-24"
              ></textarea>
              {errors.parcelDescription && (
                <span className="text-red-500 text-xs">
                  {errors.parcelDescription}
                </span>
              )}
            </label>

            {/* Photo URL */}
            <label className="flex flex-col gap-2">
              <p className="text-[#D1D5DB] text-base font-medium">Photo URL</p>
              <input
                name="parcelPhotoURL"
                value={localFormData.parcelPhotoURL}
                onChange={handleInputChange}
                placeholder="(Optional)"
                className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              {errors.parcelPhotoURL && (
                <span className="text-red-500 text-xs">
                  {errors.parcelPhotoURL}
                </span>
              )}
            </label>

            {/* Volume */}
            <label className="flex flex-col gap-2">
              <p className="text-[#D1D5DB] text-base font-medium">Volume</p>
              <input
                name="volume"
                value={localFormData.volume}
                onChange={handleInputChange}
                placeholder="E.g. 1ft x 1ft x 1ft"
                className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              {errors.volume && (
                <span className="text-red-500 text-xs">{errors.volume}</span>
              )}
            </label>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextClick}
            className="w-full py-3 mt-5 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
