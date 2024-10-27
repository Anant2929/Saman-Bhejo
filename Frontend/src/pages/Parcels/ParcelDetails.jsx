import React, { useState } from 'react';
import { useParcelRegistration } from '../../context/ParcelContext';

export default function ParcelForm() {
  const { formData, setformData, setCurrentState } = useParcelRegistration();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    
  };

  const handleNext = () => {
    e.preventDefault();
    const newErrors = {};
    const fields = ["parcelName", "weight", "type", "description", "photoURL", "volume"];
    
    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length === 0) {
      setCurrentState(2);
    } else {
      setErrors(newErrors);
      return ;
    }
    setErrors({});
  };

  
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between"><p className="text-[#F9FAFA] text-base font-medium leading-normal">Step 1 of 5</p></div>
              <div className="rounded bg-[#505362]"><div className="h-2 rounded bg-[#607AFB]" style={{ width: '20%' }}></div></div>
            </div>
            <h1 className="text-[#F9FAFA] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Parcel Details</h1>
            
            {/* Input Fields */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Parcel Name</p>
                <input
                  name="parcelName"
                  value={formData.parcelName}
                  onChange={handleInputChang=>(e)}
                  placeholder="E.g. Birthday Gift"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.parcelName && <p className="text-red-500 text-sm">{errors.parcelName}</p>}
              </label>
            </div>

            {/* Repeat similar structure for other input fields */}
            {/* Weight */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Weight</p>
                <input
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange=>(e)}
                  placeholder="1 lb"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
              </label>
            </div>

            {/* Type */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Type</p>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleInputChang=>(e)}
                  placeholder="Box"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
              </label>
            </div>

            {/* Description */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChang=>(e)}
                  placeholder="E.g. A box of chocolates"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] min-h-36 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </label>
            </div>

            {/* Photo URL */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Photo URL</p>
                <input
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChang=>(e)}
                  placeholder="(Optional)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL}</p>}
              </label>
            </div>

            {/* Volume */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Volume</p>
                <input
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange=>(e)}
                  placeholder="E.g. 1ft x 1ft x 1ft"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
                {errors.volume && <p className="text-red-500 text-sm">{errors.volume}</p>}
              </label>
            </div>

            {/* Next Button */}
            <div className="flex justify-end px-4 py-3">
              <button
                onClick={handleNext}
                className="bg-[#607AFB] text-[#F9FAFA] px-4 py-2 rounded-xl text-base font-medium"
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
