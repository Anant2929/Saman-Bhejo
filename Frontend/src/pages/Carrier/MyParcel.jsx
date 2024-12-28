import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import demo from "../../assets/images/Saman bhejo.jpg";
import Logout from "../Auth/Logout";
import { useSocket } from "../../context/SocketContext";
import dayjs from "dayjs";
import ClothingImg from "../../assets/images/Clothing.jpeg" ;
import  DocumentImg from"../../assets/images/Documents.jpeg"
import ElectronicsImg from "../../assets/images/Electronics.jpeg";
import MedicinesImg from "../../assets/images/Medicines.jpeg";
import FoodImg from "../../assets/images/Food.jpeg";


const ParcelList = () => {
  const navigate = useNavigate();
  const { parcelId,socket,setParcelId } = useSocket();
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: "",
    deliveryDate: "",
    sortBy: "",
  });
  const [error, setError] = useState("");

  const imageMap = {
    'Clothing': ClothingImg,
    'Documents': DocumentImg,
    'Electronics': ElectronicsImg,
    'Medicines': MedicinesImg,
    'Food': FoodImg,
  };

  const [showSenderOtpModal, setShowSenderOtpModal] = useState(false);
  const [showReceiverOtpModal, setShowReceiverOtpModal] = useState(false);
  const [senderOtp, setSenderOtp] = useState('');
  const [receiverOtp, setReceiverOtp] = useState('');
  const [senderVerified, setSenderVerified] = useState(false);
 
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); 
  
  const handleSenderOtpSubmit = () => {
    // Check if OTP is empty
    console.log(" i am in sender otp")

    if (!senderOtp) {
      setError("Please enter the OTP");
      return;
    }
  
    if (socket) {
      console.log(" i am in socket otp")
      socket.emit(
        'Parcel Picked Up',
        { parcelId, otp: Number(senderOtp) },
        (err, response) => {

          console.log("res",response)

          if (err) {
            setError(response.message || "Invalid OTP"); // If there's an error, show the error message or default to "Invalid OTP"
            setSenderVerified(false);
          } else {
            
            setShowSenderOtpModal(false);
            setError(""); // Clear the error message
       
          }
        }
      );
    }
  };
  
  

  const handleReceiverOtpSubmit = () => {
    // if (!senderVerified) {
    //   // setError('Sender OTP verification is required first.');
    //   return;
    // }
    if(socket){
    socket.emit(
      'Parcel Delivered',
      { parcelId, otp:Number(receiverOtp) }, // Replace 'parcel123' with actual parcel ID
      (err, response) => {
        if (err) {
          setError(response.message);
        } else {
          setShowReceiverOtpModal(false);
          setError(null);
        }
      }
    );}
  };



  const handleCancelJourney = async () => {
    try {
      const response = await axios.delete("/api/carrier/carrierDelete", {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Navigate to the home page on successful cancellation
        navigate("/home");
      } else {
        console.error(
          "Unexpected response while canceling the journey:",
          response
        );
      }
    } catch (error) {
      // Log a detailed error message
      console.error(
        "Error while canceling the journey:",
        error.response?.data || error.message
      );
    }
  };

  const handleCardClick = (id) => {
    try {
      if (id) {
        setParcelId(id);
        navigate("/userProfile/parcels/specificParcels");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("/api/carrier/myParcel", {
          withCredentials: true,
        });
        setParcels(response.data.parcels);
        console.log("parcels", response.data.parcels);
        setFilteredParcels(response.data.parcels);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setParcels([]); // Clear parcels
          setFilteredParcels([]); // Clear filtered parcels
          setError("Parcels not found for this date"); // Set error message
        } else {
          setError("An error occurred while fetching parcels");
        }
      }
    };

    fetchParcels();
  }, []);

  // Handle filtering and sorting
  const applyFilters = () => {
    let updatedParcels = [...parcels];

    // Filter by price range
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      updatedParcels = updatedParcels.filter(
        (parcel) =>
          parcel.deliveryCharges >= minPrice &&
          parcel.deliveryCharges <= maxPrice
      );
    }

    // Filter by specific delivery date
    if (filters.deliveryDate) {
      updatedParcels = updatedParcels.filter((parcel) => {
        const [day, month, year] = parcel.expectedDeliveryDate.split("-");
        const parcelDate = new Date(year, month - 1, day).setHours(0, 0, 0, 0);

        const [filterDay, filterMonth, filterYear] =
          filters.deliveryDate.split("-");
        const filterDate = new Date(
          filterYear,
          filterMonth - 1,
          filterDay
        ).setHours(0, 0, 0, 0);

        return parcelDate === filterDate;
      });
    }

    // Sort by price
    if (filters.sortBy === "priceLowToHigh") {
      updatedParcels.sort((a, b) => a.deliveryCharges - b.deliveryCharges);
    } else if (filters.sortBy === "priceHighToLow") {
      updatedParcels.sort((a, b) => b.deliveryCharges - a.deliveryCharges);
    }

    // Sort by date
    if (filters.sortBy === "dateOlderToNew") {
      updatedParcels.sort((a, b) => {
        const [dayA, monthA, yearA] = a.expectedDeliveryDate.split("-");
        const dateA = new Date(yearA, monthA - 1, dayA);

        const [dayB, monthB, yearB] = b.expectedDeliveryDate.split("-");
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA - dateB;
      });
    } else if (filters.sortBy === "dateNewerToOld") {
      updatedParcels.sort((a, b) => {
        const [dayA, monthA, yearA] = a.expectedDeliveryDate.split("-");
        const dateA = new Date(yearA, monthA - 1, dayA);

        const [dayB, monthB, yearB] = b.expectedDeliveryDate.split("-");
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateB - dateA;
      });
    }

    setFilteredParcels(updatedParcels);
  };
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };
  const handleTrackingClick =(parceltrackingStatus,parcelid) =>{

    console.log("tracking status",parceltrackingStatus)
            setParcelId(parcelid)

      if(parceltrackingStatus === "Picked Up"){
        setShowReceiverOtpModal(true)
      }
     
      else{
        setShowSenderOtpModal(true)
      }

 
  }
  const handleDecline  =() =>{
    if(showSenderOtpModal)

 {   setShowSenderOtpModal(false)}

 if(showReceiverOtpModal){
  setShowReceiverOtpModal(false) ;
 }


  }


  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-black dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
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
                    to={`/${item.toLowerCase()}`}
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
                  <Logout />
                </div>
              )}
            </div>
          </div>
        </header>
  
        <div className="px-40 flex flex-1 justify-center py-5 mt-20">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex justify-center gap-3 p-4">
              <p className="text-[#FFFFFF] text-center tracking-light text-[32px] font-bold leading-tight">
                My Parcels
              </p>
            </div>
  
            {/* Filters */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <select
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
              >
                <option value="">Price Range</option>
                <option value="0-100">₹0 - ₹100</option>
                <option value="100-200">₹100 - ₹200</option>
                <option value="200-500">₹200 - ₹500</option>
              </select>
  
              <input
                type="date"
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.deliveryDate}
                onChange={(e) =>
                  setFilters({ ...filters, deliveryDate: e.target.value })
                }
              />
  
              <select
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
              >
                <option value="">Sort By</option>
                <option value="priceLowToHigh">Price (Lowest First)</option>
                <option value="priceHighToLow">Price (Highest First)</option>
                <option value="dateOlderToNew">Date (Older to Newer)</option>
                <option value="dateNewerToOld">Date (Newer to Older)</option>
              </select>
            </div>
  
            {/* Parcels */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 p-4">
              {error ? (
                <p className="text-[#FFFFFF] text-lg font-bold text-center w-full">
                  {error}
                </p>
              ) : (
                filteredParcels.map((parcel, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 pb-3 relative"
                  >
                    <div
                      className="w-1/4 bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
                      style={{
                        backgroundImage: `url(${parcel.parcelType === 'Other' ? parcel.parcelPhotoUrl : imageMap[parcel.parcelType]})`,
                      }}
                    >
                      <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-green-400 text-lg font-bold px-3 py-1 rounded">
                        ₹{parcel.deliveryCharges}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#FFFFFF] text-base font-medium leading-normal">
                        {parcel.parcelDescription}
                      </p>
                    </div>
                    <p className="text-[#CBCBCB] text-sm font-normal leading-normal">
                      Pickup: {parcel.fromCity}
                    </p>
                    <p className="text-[#CBCBCB] text-sm font-normal leading-normal">
                      Dropoff: {parcel.toCity}
                    </p>
                    <p className="text-[#CBCBCB] text-sm font-normal leading-normal">
                      Expected Date: {" "}
                      {dayjs(parcel.expectedDeliveryDate).format("DD/MM/YYYY")}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" 
                      onClick={() => handleCardClick(parcel._id)}>
                        Open Details
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                       onClick={() => handleTrackingClick(parcel.trackingStatus,parcel._id)}
                      >
                        Tracking
                      </button>
                      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">
                        Chat
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
  
        {/* Buttons at Bottom */}
        <div className="fixed bottom-5 w-full flex justify-between px-10">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/home/carrierDetails/parcelList/")}
          >
            All Parcels
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => setShowModal(true)}
          >
            Cancel this Journey
          </button>
        </div>

             {/* Sender OTP Modal */}
             {showSenderOtpModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-[#333333] rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
      <p className="text-white text-lg font-bold mb-4 text-center">Enter Sender OTP</p>
      <input
        type="text"
        value={senderOtp}
        onChange={(e) => setSenderOtp(e.target.value)}
        className="w-full p-2 text-center border border-gray-500 rounded-lg mb-4 text-white bg-[#222222]"
        maxLength={4}
        placeholder="Enter 4-digit OTP"
      />
      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        onClick={handleSenderOtpSubmit}
      >
        Confirm
      </button>
      <button
        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        onClick={handleDecline}
      >
        Decline
      </button>
      {error && <span className="text-red-500 mt-2">{error}</span>} {/* Display the error message */}
    </div>
  </div>
)}



 {/* Receiver OTP Modal */}
            {showReceiverOtpModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-[#333333] rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
      <p className="text-white text-lg font-bold mb-4 text-center">Enter Receiver OTP</p>
      <input
        type="text"
        value={receiverOtp}
        onChange={(e) => setReceiverOtp(e.target.value)}
        className="w-full p-2 text-center border border-gray-500 rounded-lg mb-4 text-white bg-[#222222]"
        maxLength={4}
        placeholder="Enter 4-digit OTP"
      />
      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        onClick={handleReceiverOtpSubmit}
      >
        Confirm
      </button>
      <button
        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        onClick={handleDecline}
      >
        Decline
      </button>
      {error && <span className="text-red-500 mt-2">{error}</span>} {/* Display the error message */}
    </div>
  </div>
)}

  
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#333333] rounded-lg p-6 w-[90%] max-w-sm">
              <p className="text-white text-lg font-bold mb-4">Are you sure?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleCancelJourney}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelList;
