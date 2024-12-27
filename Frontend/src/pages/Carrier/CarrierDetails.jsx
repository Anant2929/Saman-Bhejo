import React, { useState, useEffect } from 'react';
import { useCarrierRegistration } from "../../context/CarrierContext";

const CarrierDetails = () => {
  const [formData, setFormData] = useState({
    carrierName: "",
    carrierContactNumber: "",
    carrierCity: "",
    carrierState: "",
    carrierZipCode: "",
  });

  const [errors, setErrors] = useState({});

  const { setCarrierCurrentState, setCarrierFormData, CarrierFormData } =
  useCarrierRegistration();


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("carrierFormData"));
    console.log("Saved Data: " ,savedData );
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
  };



  const validateForm = () => {
    const newErrors = {};
    if (!formData.carrierName) newErrors.carrierName = "This field is required";
    if (!formData.carrierContactNumber) newErrors.contactNumber = "This field is required";
    if (!formData.carrierCity) newErrors.carrierCity = "This field is required";
    if (!formData.carrierState) newErrors.carrierState = "This field is required";
    if (!formData.carrierZipCode) newErrors.carrierZipCode = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const updatedFormData = { ...CarrierFormData, ...formData };
      console.log("updatedFromData: " , updatedFormData);
      setCarrierFormData(updatedFormData) ;
      localStorage.setItem("carrierFormData", JSON.stringify(updatedFormData));
      setCarrierCurrentState(2);
    }
  };



  // return (
  //   <div
  //     className="relative flex min-h-screen flex-col bg-black overflow-hidden"
  //     style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
  //   >
  //     <div className="layout-container flex h-full grow flex-col">
    

  //       <div className="flex flex-1 justify-center items-center py-6">
  //         <div className="flex flex-col w-full max-w-lg bg-gray-900 rounded-lg p-6">
  //           <div className="flex flex-col gap-4">
  //             <div className="flex justify-between items-center">
  //               <p className="text-lg font-medium text-white">Step 1: Carrier Details</p>
  //             </div>
  //             <div className="rounded bg-gray-700">
  //               <div className="h-2 rounded bg-blue-500" style={{ width: "25%" }}></div>
  //             </div>
  //           </div>

  //           <h1 className="text-xl font-bold text-white py-4">Carrier Information</h1>

  //           <div className="flex flex-col gap-4">
  //             <div>
  //               <input
  //                 name="carrierName"
  //                 placeholder="Carrier Name"
  //                 value={formData.carrierName}
  //                 onChange={handleInputChange}
  //                 className="form-input rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
  //               />
  //               {errors.carrierName && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.carrierName}</p>
  //               )}
  //             </div>
  //             <div>
  //               <input
  //                 name="carrierContactNumber"
  //                 placeholder="Contact Number"
  //                 value={formData.carrierContactNumber}
  //                 onChange={handleInputChange}
  //                 className="form-input rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
  //               />
  //               {errors.CarrierContactNumber && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.CarrierContactNumber}</p>
  //               )}
  //             </div>
  //           </div>

  //           <h3 className="text-lg font-bold text-white py-4">Address</h3>

  //           <div className="flex gap-4">
  //             <div>
  //               <input
  //                 name="carrierCity"
  //                 placeholder="City"
  //                 value={formData.carrierCity}
  //                 onChange={handleInputChange}
  //                 className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
  //               />
  //               {errors.carrierCity && <p className="text-red-500 text-sm mt-1">{errors.carrierCity}</p>}
  //             </div>
  //             <div>
  //               <input
  //                 name="carrierState"
  //                 placeholder="carrierState"
  //                 value={formData.carrierState}
  //                 onChange={handleInputChange}
  //                 className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
  //               />
  //               {errors.carrierState && <p className="text-red-500 text-sm mt-1">{errors.carrierState}</p>}
  //             </div>
  //           </div>

  //           <div className="flex gap-4 py-4">
  //             <div>
  //               <input
  //                 name="carrierZipCode"
  //                 placeholder="carrierZipCode"
  //                 value={formData.carrierZipCode}
  //                 onChange={handleInputChange}
  //                 className="form-input flex-1 rounded-lg bg-gray-800 text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-base"
  //               />
  //               {errors.carrierZipCode && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.carrierZipCode}</p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex justify-end pt-4">
  //             <button
  //               onClick={handleNext}
  //               className="flex items-center justify-center rounded-lg bg-blue-500 text-white px-6 py-3 font-bold text-base hover:bg-blue-600"
  //             >
  //               Next
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className="min-h-fit flex flex-col bg-black text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-4">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-6">Carrier Information</h1>
  
          <h2 className="text-xl font-bold mb-4">Step 1: Carrier Details</h2>
          <div className="rounded bg-gray-700 mb-4">
            <div className="h-2 rounded bg-blue-500" style={{ width: "25%" }}></div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Carrier Name</label>
            <input
              type="text"
              name="carrierName"
              value={formData.carrierName}
              onChange={handleInputChange}
              placeholder="Carrier Name"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.carrierName && <p className="text-red-500 text-sm">{errors.carrierName}</p>}
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="carrierContactNumber"
              value={formData.carrierContactNumber}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.carrierContactNumber && <p className="text-red-500 text-sm">{errors.carrierContactNumber}</p>}
          </div>
  
          <h2 className="text-xl font-bold mb-4">Address</h2>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="carrierCity"
                value={formData.carrierCity}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
              />
              {errors.carrierCity && <p className="text-red-500 text-sm">{errors.carrierCity}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                name="carrierState"
                value={formData.carrierState}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
              />
              {errors.carrierState && <p className="text-red-500 text-sm">{errors.carrierState}</p>}
            </div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              name="carrierZipCode"
              value={formData.carrierZipCode}
              onChange={handleInputChange}
              placeholder="ZIP Code"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.carrierZipCode && <p className="text-red-500 text-sm">{errors.carrierZipCode}</p>}
          </div>
  
          <div className="flex justify-center py-4">
            <button
              onClick={handleNext}
              className="bg-blue-600 px-6 py-3 rounded-lg font-bold text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </main>
  
      
    </div>
  );
  
};

export default CarrierDetails;
