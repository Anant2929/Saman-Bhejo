import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";

export default function ParcelAcceptanceForm() {
  // State for form fields
  const navigate = useNavigate() ;
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
  const { parcelDataInfo, senderDataInfo, receiverDataInfo, socket,setParcelId,parcelId,socketId ,setParcelDataInfo,setReceiverDataInfo,setSenderDataInfo} = useSocket();
  const [loading, setLoading] = useState(true);
  const {fetching} = useParcelRegistration()


  useEffect(() => {
    console.log("i am in useEffect for socket data");
    
    if (parcelId && fetching) {
      console.log("i am in socket condition");
  
      socket.emit("fetchParcelData", { parcelId }, (response) => {
        console.log("Response from server:", response);
  
        if (response && response.success) {
          const { parcelData, senderData, receiverData } = response.data;
  
          console.log("parcelData:", parcelData);
          console.log("senderData:", senderData);
          console.log("receiverData:", receiverData);
  
          const filterFields = (data) => {
            return Object.keys(data || {})
              .filter((key) => Object.keys(fields).includes(key))
              .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
              }, {});
          };
          setParcelDataInfo(parcelData)
          setReceiverDataInfo(receiverData)
          setSenderDataInfo(senderData)
  
          setFields((prevFields) => {
            const updatedFields = {
              ...filterFields(parcelData),
              ...filterFields(senderData),
              ...filterFields(receiverData),
            };
            console.log("updatedFields before set:", updatedFields);
            return updatedFields;
          });
  
          setLoading(false);
        } else {
          console.error("Failed to fetch parcel data:", response?.error || "No response");
        }
      });
    }
  }, [parcelId, fetching, socket]);


  useEffect(() => {
    console.log("i am in useEffect for context-based data");
  
    if (parcelDataInfo && senderDataInfo && receiverDataInfo && fetching === false) {
      console.log("i am in context condition");
  
      const allowedKeys = Object.keys(fields);
  
      const filterFields = (data) => {
        return Object.keys(data || {})
          .filter((key) => allowedKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
      };
  
      const updatedFields = {
        ...filterFields(parcelDataInfo),
        ...filterFields(senderDataInfo),
        ...filterFields(receiverDataInfo),
      };
  
      console.log("updatedFields from context:", updatedFields);
  
      setFields(updatedFields);
      setLoading(false);
    }
  }, [parcelDataInfo, senderDataInfo, receiverDataInfo]);


  useEffect(() => {
    localStorage.setItem("parcelFields", JSON.stringify(fields));
  }, [fields]);
  
  if (!parcelDataInfo || !senderDataInfo || !receiverDataInfo) {
    return <div className="text-black">Loading parcel details...</div>;
  }



  if (loading) {
    return <div className="text-black">Loading parcel details...</div>;
  }

  const handleParcelAction = (action) => {
    let { _id } = parcelDataInfo;
    let {sender} = senderDataInfo
  

    // Emit a single event with action type
    socket.emit("updateParcelStatus", { _id,sender, action }, (response) => {
        if (response.success) {
            console.log(`Parcel ${action.toLowerCase()} successful:`, response);
        } else {
            console.error(`Parcel ${action.toLowerCase()} failed:`, response.error);
        }
    });
        localStorage.removeItem("parcelDataInfo")
        localStorage.removeItem("senderDataInfo")
        localStorage.removeItem("receiverDataInfo")
    console.log(`Parcel ${action.toLowerCase()} requested for:`, _id);
    navigate("/home");
};

// Usage for Accept
const handleAcception = () => handleParcelAction("Accept");
//

// Usage for Reject
const handleRejection = () => handleParcelAction("Reject");

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111922] overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
          <div className="flex items-center gap-4 text-white animate-blink">
            <div className="w-6 h-6">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Saman Bhejo</h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              {['Home', 'About', 'Notifications', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                  href="/home"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
      <div className="flex flex-col items-center py-5">
        {/* Header Image */}
        <div
          className="w-full max-w-[480px] bg-center bg-cover bg-no-repeat rounded-xl h-40 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/bcea0786-3c6f-45fe-abeb-8de948889eec.png')",
          }}
        ></div>

        {/* Title */}
        <h1 className="text-white text-[24px] font-bold leading-tight tracking-[-0.015em] text-center pt-5">
          Parcel Acceptance
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-4">
          Please review the parcel details below and confirm or reject
          acceptance.
        </p>

        {/* Details */}
        <div className="w-full max-w-[480px] px-4">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="py-2 flex justify-between items-center">
              <span className="text-white text-base font-medium capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <span className="text-[#93adc8] text-base font-normal">
                {value || "..."}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex w-full max-w-[480px] justify-between px-4 py-5">
          <button className="w-[48%] h-14 bg-red-500 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105" onClick = {handleRejection}>
            Reject
          </button>
          <button className="w-[48%] h-14 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105" onClick = {handleAcception}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
