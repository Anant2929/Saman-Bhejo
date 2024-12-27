import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useCarrierRegistration } from "../../context/CarrierContext";


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

  const [errors, setErrors] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const { setCarrierCurrentState, setCarrierFormData } = useCarrierRegistration();

  const [formData, setFormData] = useState({
    carrierTravelMode: "",
    otherMode: "",
    carriertravelFromCity: "",
    carriertravelFromState: "",
    carrierFromCityPostalCode: "", 
    carriertravelToState :"",
    carriertravelToCity:"",
    carrierToCityPostalCode: "",
    carriertravelDate: "",
    carrierVehicleModel: "",
    carrierLicensePlate: "",
    carrierTicketPhoto: "",
    
  });
  

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("carrierFormData"));
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
    if (validateForm()) {
      const updatedFormData = {...formData };
      localStorage.setItem("carrierFormData", JSON.stringify(updatedFormData));
      setCarrierFormData(updatedFormData);
      console.log("Data sent successfully:",updatedFormData);
   
    }
    setCarrierCurrentState(1) 
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.carrierTravelMode) newErrors.carrierTravelMode = "This field is required";
    if (!formData.carriertravelFromCity) newErrors.carriertravelFromCity = "This field is required";
    if (!formData.carriertravelFromState) newErrors.carriertravelFromState = "This field is required";
    if (!formData.carrierFromCityPostalCode ) newErrors.carrierFromCityPostalCode  = "This field is required";
    if (!formData.carriertravelToState) newErrors.carriertravelToState = "This field is required";
    if (!formData.carriertravelToCity) newErrors.carriertravelToCity = "This field is required";
    if (!formData.carrierToCityPostalCode) newErrors.carrierToCityPostalCode = "This field is required";
    if (!formData.carriertravelDate) newErrors. carriertravelDate = "This field is required";

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
      const updatedFormData = {...formData };
      localStorage.setItem("carrierFormData", JSON.stringify(updatedFormData));
      setCarrierFormData(updatedFormData);
      console.log("Data sent successfully:",updatedFormData);
      setCarrierCurrentState(3) 
    }
  };

  // return (
  //   <div
  //     className="min-h-fit flex flex-col bg-black text-white"
  //     style={{ fontFamily: "'Poppins', sans-serif" }}
  //   >

  //     <main className="flex flex-1 flex-col items-center justify-center px-10">
        
  //       <div className="max-w-lg w-full">
  //         <h1 className="text-2xl font-bold mb-6">Travel Details</h1>
  //         <h2 className="text-1xl font-bold mb-6">Travel From </h2>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">City</label>
  //           <input
  //             type="text"
  //             name="carriertravelFromCity"
  //             value={formData. carriertravelFromCity}
  //             onChange={handleInputChange}
  //             placeholder="Enter location"
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carriertravelFromCity && <p className="text-red-500 text-sm">{errors.carriertravelFromCity}</p>}
  //         </div>

  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">State</label>
  //           <input
  //             type="text"
  //             name="carriertravelFromState"
  //             value={formData.carriertravelFromState}
  //             onChange={handleInputChange}
  //             placeholder="Enter State "
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carriertravelFromState && <p className="text-red-500 text-sm">{errors.carriertravelFromState}</p>}
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Postal Code</label>
  //           <input
  //             type="text"
  //             name="carrierFromCityPostalCode"
  //             value={formData.carrierFromCityPostalCode}
  //             onChange={handleInputChange}
  //             placeholder="Enter ZIPCODE"
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carrierFromCityPostalCode && <p className="text-red-500 text-sm">{errors.carrierFromCityPostalCode}</p>}
  //         </div>

  //         <h2 className="text-1xl font-bold mb-6">Going To</h2>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">City</label>
  //           <input
  //             type="text"
  //             name="carriertravelToCity"
  //             value={formData.carriertravelToCity}
  //             onChange={handleInputChange}
  //             placeholder="Enter destination City"
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carriertravelToCity && <p className="text-red-500 text-sm">{errors.carriertravelToCity}</p>}
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">State</label>
  //           <input
  //             type="text"
  //             name="carriertravelToState"
  //             value={formData.carriertravelToState}
  //             onChange={handleInputChange}
  //             placeholder="Enter destination State"
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carriertravelToState && <p className="text-red-500 text-sm">{errors.carriertravelToState}</p>}
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Postal Code</label>
  //           <input
  //             type="text"
  //             name="carrierToCityPostalCode"
  //             value={formData.carrierToCityPostalCode}
  //             onChange={handleInputChange}
  //             placeholder="Enter destination"
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carrierToCityPostalCode && <p className="text-red-500 text-sm">{errors.carrierToCityPostalCode}</p>}
  //         </div>

  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Date of Traveling</label>
  //           <input
  //             type="date"
  //             name="carriertravelDate"
  //             value={formData.carriertravelDate}
  //             onChange={handleInputChange}
  //             className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //           />
  //           {errors.carriertravelDate && <p className="text-red-500 text-sm">{errors.carriertravelDate}</p>}
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Mode of Travel</label>
  //           <div className="flex flex-wrap gap-2">
  //             {Object.values(TravelOptionsEnum).map((option) => (
  //               <label
  //                 key={option}
  //                 className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer ${
  //                   formData.carrierTravelMode === option
  //                     ? "bg-blue-600 border-blue-500"
  //                     : "bg-gray-900 border-gray-700"
  //                 }`}
  //               >
  //                 <input
  //                   type="radio"
  //                   name="carrierTravelMode"
  //                   value={option}
  //                   checked={formData.carrierTravelMode === option}
  //                   onChange={handleTravelModeChange}
  //                   className="hidden"
  //                 />
  //                 {option}
  //               </label>
  //             ))}
  //           </div>
  //           {errors.carrierTravelMode && <p className="text-red-500 text-sm">{errors.carrierTravelMode}</p>}
  //           {formData.carrierTravelMode === TravelOptionsEnum.OTHER && (
  //             <input
  //               type="text"
  //               name="otherMode"
  //               value={formData.otherMode}
  //               onChange={handleInputChange}
  //               placeholder="Specify other mode"
  //               className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //             />
  //           )}
  //           {errors.otherMode && <p className="text-red-500 text-sm">{errors.otherMode}</p>}
  //         </div>
  //         {["Car", "Bicycle", "Motorcycle"].includes(formData.carrierTravelMode) && (
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium mb-1">Vehicle Details</label>
  //             <input
  //               type="text"
  //               name="carrierVehicleModel"
  //               value={formData.carrierVehicleModel}
  //               onChange={handleInputChange}
  //               placeholder="Vehicle Model"
  //               className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 mb-2"
  //             />
  //             {errors.carrierVehicleModel && <p className="text-red-500 text-sm">{errors.carrierVehicleModel}</p>}
  //             <input
  //               type="text"
  //               name="carrierLicensePlate"
  //               value={formData. carrierLicensePlate}
  //               onChange={handleInputChange}
  //               placeholder="License Plate"
  //               className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //             />
  //             {errors.carrierLicensePlate && <p className="text-red-500 text-sm">{errors.carrierLicensePlate}</p>}
  //           </div>
  //         )}
  //         {["Airplane", "Train", "Bus", "Boat"].includes(formData.carrierTravelMode) && (
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium mb-1">Upload Ticket Photo</label>
  //             <input
  //               type="file"
  //               name="carrierTicketPhoto"
  //               onChange={handleTicketPhotoChange}
  //               className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
  //             />
  //             {errors.carrierTicketPhoto && <p className="text-red-500 text-sm">{errors.carrierTicketPhoto}</p>}
  //           </div>
  //         )}
  //       </div>
  //     </main>
  //     <footer className="flex justify-evenly py-4">
  //       <button
  //         className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
  //         onClick={handlePrevious}
  //       >
  //         Previous
  //       </button>
  //       <button
  //         className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
  //         onClick={handleNext}
  //       >
  //         Continue
  //       </button>
  //     </footer>
  //   </div>
  // );


  return (
  <div
    className="min-h-fit flex flex-col bg-black text-white "
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    <main className="flex flex-1 flex-col items-center justify-center px-10 py-4 mt-10">
  
      
      <div className="max-w-lg w-full">
        
      <h1 className="text-2xl font-bold mb-6">Travel and Transportation Information</h1>
        {/* Center the heading */}
        <h2 className="text-xl font-bold mb-4">Step 2: Travel  Details</h2>
          <div className="rounded bg-gray-700 mb-4">
            <div className="h-2 rounded bg-blue-500" style={{ width: "25%" }}></div>
          </div>

        <h2 className="text-1xl font-bold mb-6">Travel From </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="carriertravelFromCity"
            value={formData.carriertravelFromCity}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carriertravelFromCity && <p className="text-red-500 text-sm">{errors.carriertravelFromCity}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            name="carriertravelFromState"
            value={formData.carriertravelFromState}
            onChange={handleInputChange}
            placeholder="Enter State "
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carriertravelFromState && <p className="text-red-500 text-sm">{errors.carriertravelFromState}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="carrierFromCityPostalCode"
            value={formData.carrierFromCityPostalCode}
            onChange={handleInputChange}
            placeholder="Enter ZIPCODE"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carrierFromCityPostalCode && <p className="text-red-500 text-sm">{errors.carrierFromCityPostalCode}</p>}
        </div>

        <h2 className="text-1xl font-bold mb-6">Going To</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="carriertravelToCity"
            value={formData.carriertravelToCity}
            onChange={handleInputChange}
            placeholder="Enter destination City"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carriertravelToCity && <p className="text-red-500 text-sm">{errors.carriertravelToCity}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            name="carriertravelToState"
            value={formData.carriertravelToState}
            onChange={handleInputChange}
            placeholder="Enter destination State"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carriertravelToState && <p className="text-red-500 text-sm">{errors.carriertravelToState}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="carrierToCityPostalCode"
            value={formData.carrierToCityPostalCode}
            onChange={handleInputChange}
            placeholder="Enter destination"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carrierToCityPostalCode && <p className="text-red-500 text-sm">{errors.carrierToCityPostalCode}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date of Traveling</label>
          <input
            type="date"
            name="carriertravelDate"
            value={formData.carriertravelDate}
            onChange={handleInputChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
          />
          {errors.carriertravelDate && <p className="text-red-500 text-sm">{errors.carriertravelDate}</p>}
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
              name="carrierLicensePlate"
              value={formData.carrierLicensePlate}
              onChange={handleInputChange}
              placeholder="License Plate"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3"
            />
            {errors.carrierLicensePlate && <p className="text-red-500 text-sm">{errors.carrierLicensePlate}</p>}
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
