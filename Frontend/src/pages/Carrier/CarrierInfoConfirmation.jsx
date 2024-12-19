// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useMessage } from "../../context/MessageContext";
// import { useNavigate } from "react-router-dom";
// import { useCarrierRegistration } from "../../context/CarrierContext";

// function SubmissionSummary() {
//   const navigate = useNavigate();
// const {CarriercurrentState , setCarrierCurrentState , CarrierFormData , setCarrierFormData } = useCarrierRegistration()
//   const { setTimedMessage } = useMessage();

//   const handleEditClick = ( num ) => {
//     setCurrentState (num)
//     navigate("/home/carrierDetail/parcel");
//   };
  
//   const handleConfirmClick = (e) => {
//     e.preventDefault();
//     const submitDataToBackend = async () => {
//       try {
//         const response = await axios.post("/api/carrier/register", CarrierFormData); // Replace with your backend API URL
//         console.log("Data sent successfully:", CarrierFormData);
  
//         console.log("Parcel response", response);
        
  
//         // Set success message
//         setTimedMessage(response.data.message, "success");
  
//         // Navigate and reset state
//         navigate("/home");
//         setCarrierCurrentState(2);
//       } catch (error) {
//         console.error("Error submitting data:", error);
//         alert("Failed to submit data. Please try again.");
//       }
//     };
//     submitDataToBackend();
//   };
  
//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-[#000000]  text-white rounded-lg shadow-xl">
//       <h2 className="text-center text-3xl font-bold mb-2">
//         Form Submission Summary
//       </h2>
//       <p className="text-center text-gray-400 mb-6">
//         Please review the information before proceeding
//       </p>

//       {/* Carrrier Details */}
//       <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
//         <div>
//           <h3 className="text-lg font-semibold">Sender's Details</h3>
//           <p className="text-gray-300">Name: {CarrierformData.}...</p>
//         </div>
//         <button
//           onClick={() => handleEditClick(2)}
//           className="text-blue-400 hover:text-blue-300 underline font-medium"
//         >
//           Edit
//         </button>
//       </div>

    
//       {/*Transportation Details */}
//       <div className="bg-gray-800 p-6 rounded-lg mb-6 flex justify-between items-center">
//         <div>
//           <h3 className="text-lg font-semibold">Parcel Details</h3>
//           <p className="text-gray-300">Parcel Type: {formData.parcelType}</p>
//           <p className="text-gray-300">Weight: {formData.parcelWeight}kg</p>
//         </div>
//         <button
//           onClick={() => handleEditClick(1)}
//           className="text-blue-400 hover:text-blue-300 underline font-medium"
//         >
//           Edit
//         </button>
//       </div>

     

//       {/* Action Buttons */}
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={() => {navigate("/home") , setCurrentState(1)}}
//           className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
//         >
//           Decline
//         </button>
//         <button
//           onClick={handleConfirmClick}
//           className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SubmissionSummary;
