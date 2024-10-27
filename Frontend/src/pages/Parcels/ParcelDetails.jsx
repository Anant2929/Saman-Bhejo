import React, { useState } from 'react';
import { useParcelRegistration } from '../../context/ParcelContext';

export default function ParcelForm() {
  const { setFormData, setCurrentState } = useParcelRegistration(); // Removing formData from context
  const [localFormData, setLocalFormData] = useState({
    parcelName: '',
    weight: '',
    type: '',
    description: '',
    photoURL: '',
    volume: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let newErrors = {};
    if (!localFormData.parcelName) newErrors.parcelName = 'This field is required';
    if (!localFormData.weight) newErrors.weight = 'This field is required';
    if (!localFormData.type) newErrors.type = 'This field is required';
    if (!localFormData.description) newErrors.description = 'This field is required';
    if (!localFormData.volume) newErrors.volume = 'This field is required';
    if (!localFormData.volume) newErrors.photoURL = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateFields()) {
      setFormData(prevData => ({ ...prevData, ...localFormData }))
      setCurrentState(2); // Move to the next step
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal">Step 1 of 5</p>
              </div>
              <div className="rounded bg-[#505362]">
                <div className="h-2 rounded bg-[#607AFB]" style={{ width: '20%' }}></div>
              </div>
            </div>
            <h1 className="text-[#F9FAFA] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Parcel Details</h1>
            
            {/* Parcel Name */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Parcel Name</p>
                <input
                  name="parcelName"
                  value={localFormData.parcelName}
                  onChange={handleInputChange}
                  placeholder="E.g. Birthday Gift"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.parcelName && <span className="text-red-500 text-sm">{errors.parcelName}</span>}
              </label>
            </div>

            {/* Weight and Type */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Weight</p>
                <input
                  name="weight"
                  value={localFormData.weight}
                  onChange={handleInputChange}
                  placeholder="1 lb"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.weight && <span className="text-red-500 text-sm">{errors.weight}</span>}
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Type</p>
                <input
                  name="type"
                  value={localFormData.type}
                  onChange={handleInputChange}
                  placeholder="Box"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.type && <span className="text-red-500 text-sm">{errors.type}</span>}
              </label>
            </div>

            {/* Description */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Description</p>
                <textarea
                  name="description"
                  value={localFormData.description}
                  onChange={handleInputChange}
                  placeholder="E.g. A box of chocolates"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] min-h-36 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                ></textarea>
                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
              </label>
            </div>

            {/* Photo URL */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Photo URL</p>
                <input
                  name="photoURL"
                  value={localFormData.photoURL}
                  onChange={handleInputChange}
                  placeholder="(Optional)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.photoURL && <span className="text-red-500 text-sm">{errors.photoURL}</span>}
              </label>
            </div>

            {/* Volume */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Volume</p>
                <input
                  name="volume"
                  value={localFormData.volume}
                  onChange={handleInputChange}
                  placeholder="E.g. 1ft x 1ft x 1ft"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.volume && <span className="text-red-500 text-sm">{errors.volume}</span>}
              </label>
            </div>

            {/* Next Button */}
            <div className="px-4 py-3">
              <button
                onClick={handleNextClick}
                className="bg-[#607AFB] text-white font-medium py-3 px-6 rounded-lg w-full"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
