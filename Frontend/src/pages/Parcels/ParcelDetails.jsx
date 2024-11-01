import React, { useState,useEffect } from 'react';
import { useParcelRegistration } from '../../context/ParcelContext';

export default function ParcelForm() {
  const {formData,setFormData, setCurrentState } = useParcelRegistration();
  const [localFormData, setLocalFormData] = useState({
    parcelName: '',
    parcelWeight: '',
    parcelType: '',
    parcelDescription: '',
    parcelPhotoURL: '',
    volume: '',
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
    if (!localFormData.parcelName) newErrors.parcelName = 'This field is required';
    if (!localFormData.parcelWeight) newErrors.parcelWeight = 'This field is required';
    if (!localFormData.parcelType) newErrors.parcelType = 'This field is required';
    if (!localFormData.parcelDescription) newErrors.parcelDescription = 'This field is required';
    if (!localFormData.volume) newErrors.volume = 'This field is required';
    // if (!localFormData.parcelPhotoURL) newErrors.parcelPhotoURL = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateFields()) {
        const updatedFormData = { ...formData, ...localFormData };
        setFormData(updatedFormData);
        localStorage.setItem('parcelFormData', JSON.stringify(updatedFormData));
        setCurrentState(2);
    }
};

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal">Step 1/4</p>
              </div>
              <div className="rounded bg-[#505362]">
                <div className="h-2 rounded bg-[#607AFB]" style={{ width: '25%' }}></div>
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
                  name="parcelWeight"
                  value={localFormData.parcelWeight}
                  onChange={handleInputChange}
                  placeholder="1 lb"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.parcelWeight && <span className="text-red-500 text-sm">{errors.parcelWeight}</span>}
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Type</p>
                <input
                  name="parcelType"
                  value={localFormData.parcelType}
                  onChange={handleInputChange}
                  placeholder="Box"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.parcelType && <span className="text-red-500 text-sm">{errors.parcelType}</span>}
              </label>
            </div>

            {/* Description */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Description</p>
                <textarea
                  name="parcelDescription"
                  value={localFormData.parcelDescription}
                  onChange={handleInputChange}
                  placeholder="E.g. A box of chocolates"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] min-h-36 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                ></textarea>
                {errors.parcelDescription && <span className="text-red-500 text-sm">{errors.parcelDescription}</span>}
              </label>
            </div>

            {/* Photo URL */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Photo URL</p>
                <input
                  name="parcelPhotoURL"
                  value={localFormData.parcelPhotoURL}
                  onChange={handleInputChange}
                  placeholder="(Optional)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.parcelPhotoURL && <span className="text-red-500 text-sm">{errors.parcelPhotoURL}</span>}
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
