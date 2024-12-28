
import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate, Link } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";
import axios from "axios";
import Logout from "../Auth/Logout";
import dayjs from "dayjs"; // Importing a library for date formatting
import CircleLoader from "react-spinners/CircleLoader";

export default function ParcelAcceptanceForm() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState(initialFields);
  const {
    parcelDataInfo,
    senderDataInfo,
    receiverDataInfo,
    socket,
    setParcelId,
    parcelId,
    setParcelDataInfo,
    setReceiverDataInfo,
    setSenderDataInfo,
  } = useSocket();
  const { fetching, notificationId } = useParcelRegistration();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  useEffect(() => {
    const fetchParcelDetails = async () => {
      setLoading(true); 
      try {
        if (!parcelId) {
          console.log("No parcel ID available.");
          setLoading(false);
          return;
        } else {
          const { data } = await axios.get(`/api/parcel/parcelsInfo/Specific/${parcelId}`);
          if (data.success) {
            const { sender, receiver, parcel } = data;
            setParcelDataInfo(parcel);
            setReceiverDataInfo(receiver);
            setSenderDataInfo(sender);

            const updatedFields = {
              ...initialFields,
              senderName: sender?.senderName || "",
              senderContactNumber: sender?.senderContactNumber || "",
              senderAddress: sender?.senderAddress || "",
              senderCity: sender?.senderCity || "",
              senderState: sender?.senderState || "",
              senderPostalCode: sender?.senderPostalCode || "",
              ...(receiver && {
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
                fromCity: parcel?.fromCity || "",
                fromState: parcel?.fromState || "",
                fromPincode: parcel?.fromPincode || "",
                toCity: parcel?.toCity || "",
                toState: parcel?.toState || "",
                toPincode: parcel?.toPincode || "",
              }),
            };

            setFields(updatedFields);
          }
        }
      } catch (error) {
        console.error("Error fetching parcel details:", error);
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };
    fetchParcelDetails();
  }, [parcelId]);

  useEffect(() => {
    localStorage.setItem("parcelFields", JSON.stringify(fields));
  }, [fields]);

  if (!fields.senderName && !fields.receiverName ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <CircleLoader color="#607AFB" loading={true} size={100} />
      </div>
    );
  }
  
 
  const handleParcelAction = (action) => {
    let { _id } = parcelDataInfo;
    let pID = _id;

    socket.emit("updateParcelStatus", { pID, action, notificationId }, (response) => {
      if (response.success) {
        console.log(`Parcel ${action.toLowerCase()} successful:`, response);
      } else {
        console.error(`Parcel ${action.toLowerCase()} failed:`, response.error);
      }
    });

    localStorage.removeItem("parcelDataInfo");
    localStorage.removeItem("senderDataInfo");
    localStorage.removeItem("receiverDataInfo");
    navigate("/home");
  };

  const handleAcception = () => handleParcelAction("Accept");
  const handleRejection = () => handleParcelAction("Reject");

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#000000] overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
        <div className="flex items-center gap-4 text-white animate-blink">
          <div className="w-6 h-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Saman Bhejo</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="relative">
            <div
              className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer transition transform duration-300 hover:scale-110"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
                <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
              </svg>
            </div>
            {showSidebar && (
              <div className="absolute top-12 right-0 w-48 bg-[#111216] border rounded-xl shadow-lg py-4">
                {["Edit Profile", "Add Address", "Parcels", "Payment Methods"].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A] transition"
                    onClick={() =>
                      handleSidebarClick(`/userProfile/${item.toLowerCase().replace(" ", "-")}`)
                    }
                  >
                    {item}
                  </button>
                ))}
                <Logout />
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center py-5 bg-gradient-to-br from-gray-900 via-black to-gray-900 mt-20">
        <div
          className="w-full max-w-[480px] bg-center bg-cover bg-no-repeat rounded-xl h-40 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/bcea0786-3c6f-45fe-abeb-8de948889eec.png')",
          }}
        ></div>
        <h1 className="text-blue-500 text-[24px] font-bold leading-tight tracking-[-0.015em] text-center pt-5">
          Parcel Acceptance
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-4">
          Please review the parcel details below and confirm or reject acceptance.
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
                  key === "distance" || key === "deliveryCharges" || key =="paymentStatus"
                    ? "text-green-500 font-extrabold"
                    : "text-[#93adc8]"
                } text-base`}
              >
                {key === "expectedDeliveryDate" && value
                  ? dayjs(value).format("MMMM D, YYYY")
                  : value || "..."}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-[480px] justify-between px-4 py-5">
          <button
            className="w-[48%] h-14 bg-red-500 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
            onClick={handleRejection}
          >
            Reject
          </button>
          <button
            className="w-[48%] h-14 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
            onClick={handleAcception}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
