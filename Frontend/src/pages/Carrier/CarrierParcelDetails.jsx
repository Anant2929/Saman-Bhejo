import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";
import axios from "axios";
import  {useSocket} from "../../context/SocketContext"
import dayjs from "dayjs";

import Logout from "../Auth/Logout";
export default function ParcelInfoDisplay() {

  const navigate = useNavigate();
  const { parcelId ,socketId,id , socket} = useSocket();

  // Define only the required fields
  const initialFields = {
    senderName: "",
    senderContactNumber: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPostalCode: "",
    receiverName: "",
    receiverContactNumber: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPostalCode: "",
    fromCity: "",
    fromState: "",
    fromPincode: "",
    toCity: "",
    toState: "",
    toPincode: "",
    parcelName: "",
    parcelWeight: "",
    parcelType: "",
    volume: "",
    parcelDescription: "",
    parcelPhotoUrl: "",
    distance: "",
    expectedDeliveryDate: "",
    deliveryCharges: "",
 

  };

  const [fields, setFields] = useState(initialFields);
  const { currentState } = useParcelRegistration();
  const [showSidebar, setShowSidebar] = useState(false)
  
 
  useEffect(() => {
   
    const fetchParcelDetails = async () => {


      try {

        if (!parcelId) {
          console.log("No parcel ID available.");
          return;
        }
          else{
        const { data } = await axios.get(`/api/parcel/parcelsInfo/Specific/${parcelId}`);

        if (data.success) {
          
          const { sender, receiver ,parcel } = data;


         
          console.log("sender,data,rceiver",parcel,sender,receiver)
          // Construct fields object with only the required keys
          const updatedFields = {
            ...initialFields, // Start with blank values
            senderName: sender?.senderName || "",
            senderContactNumber: sender?.senderContactNumber || "",
            senderAddress: sender?.senderAddress || "",
            senderCity: sender?.senderCity || "",
            senderState: sender?.senderState || "",
            senderPostalCode: sender?.senderPostalCode || "",
            ...(receiver && { // Add receiver details only if receiver exists
              receiverName: receiver.receiverName || "",
              receiverContactNumber: receiver.receiverContactNumber || "",
              receiverAddress: receiver.receiverAddress || "",
              receiverCity: receiver.receiverCity || "",
              receiverState: receiver.receiverState || "",
              receiverPostalCode: receiver.receiverPostalCode || "",
            }),
            ...(parcel && {
              parcelName: parcel?.parcelName || "",
              parcelWeight: parcel?.parcelWeight || "",
              parcelType: parcel?.parcelType || "",
              volume: parcel?.volume || "",
              parcelDescription: parcel?.parcelDescription || "",
              parcelPhotoUrl: parcel?.parcelPhotoUrl || "",
              distance: parcel?.distance || "",
              expectedDeliveryDate: parcel?.expectedDeliveryDate || "",
              deliveryCharges: parcel?.deliveryCharges || "",
              paymentStatus: parcel?.paymentStatus || "",
              fromCity: parcel?.fromCity ||"",
              fromState: parcel?.fromState ||"",
              fromPincode:parcel?.fromPincode || "",
              toCity:parcel?.toCity || "",
              toState: parcel?.toState||"",
              toPincode: parcel?.toPincode ||"",
            }

            )
           
             // Add only relevant fields from selectedParcel
          };

          setFields(updatedFields);
        
        }}
      } catch (error) {
        console.error("Error fetching parcel details:", error);
      }
    };
    console.log(" i am in fendings baby")
    fetchParcelDetails();
  }, [parcelId]);



  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };


  const handleConfirmation = ()=>{

    if(socket){
console.log("parceId and id",parcelId, id)
    socket.emit("carrierConfirmedParcel", { parcelId, id }, (response) => {
      if (response.success) {
        console.log(`Parcel  successful:`, response);
      } else {
        console.error(`Parcel ${action.toLowerCase()} failed:`, response.error);
      }
  });}
  navigate("/home/carrierDetails/parcelList")
  }

  // Check if data is loading
  if (!fields.senderName && !fields.receiverName) {

    return <div className="text-black">Loading parcel details...</div>;
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111922] overflow-x-hidden"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      {/* Header */}
      <header  className = "fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50 ">

{/* <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3 overflow-y-hidden"> */} 
        <div className="flex items-center gap-4 text-white animate-blink">
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Saman Bhejo
          </h2>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`} // Automatically generates the correct path
                  className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
          <div className="relative">
            <div
              className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer transition transform duration-300 hover:scale-110"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 256 256"
              >
                <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
              </svg>
            </div>

            {showSidebar && (
              <div className="absolute top-12 right-0 w-48 bg-[#111216] border rounded-xl shadow-lg py-4">
                {[
                  "Edit Profile",
                  "Add Address",
                  "Parcels",
                  "Payment Methods",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A] transition"
                    onClick={() =>
                      handleSidebarClick(
                        `/userProfile/${item.toLowerCase().replace(" ", "-")}`
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
                {/* Use the Logout component here */}
                <Logout />
              </div>
            )}
          </div>
        </div>
      </header>

           {/* Main Content */}
           <div className="flex flex-col items-center py-5 bg-gradient-to-br from-gray-900 via-black to-gray-900 mt-20">
        <div
          className="w-full max-w-[480px] bg-center bg-cover bg-no-repeat rounded-xl h-40 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/bcea0786-3c6f-45fe-abeb-8de948889eec.png')",
          }}
        ></div>
        <h1 className="text-white text-[24px] font-bold leading-tight tracking-[-0.015em] text-center pt-5">
          Parcel Details
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-4">
          Review the parcel details below.
        </p>
        <div className="w-full max-w-[480px] px-4">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span
                className={`${
                  key === "distance" || key === "deliveryCharges" || key === "paymentStatus"
                    ? "text-green-500 font-extrabold"
                    : "text-[#93adc8]"
                } text-base`}
              >
             {key === "expectedDeliveryDate" && fields[key]
                  ? dayjs(fields[key]).format("MMMM D, YYYY")
                  : fields[key] || "N/A"}
              </span>
            </div>
          ))}
        </div>

        {/* Confirm and Exit Buttons */}
        <div className="w-full max-w-[480px] mt-5 flex justify-between">
          <button
           onClick={()=>{handleConfirmation()}}
            className="w-1/2 mr-2 py-2 bg-[#607AFB] text-white text-base font-medium rounded-lg transition hover:bg-[#4863d6]"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              console.log("Exited.");
              // Add exit logic here
              navigate("/home/carrierDetails/parcelList"); // Example navigation on exit
            }}
            className="w-1/2 ml-2 py-2 bg-gray-500 text-white text-base font-medium rounded-lg transition hover:bg-gray-700"
          >
            Exit
          </button>
          </div>
        </div>
      </div>
);
}