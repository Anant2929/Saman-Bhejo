import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParcelRegistration } from "../../context/ParcelContext";
import { useSocket } from "../../context/SocketContext";

const UserParcels = () => {
  const { parcels, setParcels} = useParcelRegistration(); // Use extended context
  const [filterRole, setFilterRole] = useState("All"); // "All", "Sender", "Receiver"
  const [filterDate, setFilterDate] = useState(""); // For date filtering
  const [showSidebar, setShowSidebar] = useState(false);
  const [userId, setUserId] = useState(""); // State to store logged-in user's ID
  const navigate = useNavigate() ;
  const {setParcelId} = useSocket();
  useEffect(() => {
    // Fetch parcels from backend
    const fetchParcels = async () => {
      console.log("Fetching parcels from backend...");
      try {
        const response = await axios.get("/api/parcel/parcelsInfo", {
          withCredentials: true,
        });
        setParcels(response.data.parcels); // Store fetched parcels
        setUserId(response.data.userId); // Store logged-in user's ID
      } catch (error) {
        console.error(
          "Error fetching parcels:",
          error.response?.data || error.message
        );
      }
    };

    fetchParcels();
  }, [setParcels]);

  // Filter parcels based on role and date
  const filteredParcels = parcels.filter((parcel) => {
    // Filter by role (Sender, Receiver, All)
    if (filterRole !== "All") {
      if (
        filterRole === "Sender" &&
        parcel.senderDetails.toString() !== userId
      ) {
        return false;
      }
      if (
        filterRole === "Receiver" &&
        parcel.receiverDetails.toString() !== userId.toString()
      ) {
        return false;
      }
    }

    // Filter by date
    if (filterDate) {
      const parcelDate = new Date(parcel.createdAt).toISOString().split("T")[0];
      if (parcelDate !== filterDate) {
        return false;
      }
    }

    return true;
  });

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleSidebarClick = (path) => {
    console.log(`Redirecting to ${path}`);
    setShowSidebar(false);
  };

  const handleMoreInfo = (parcel) => {
 
    if(parcel){
    console.log("parcel is after",parcel)
    setParcelId(parcel._id); // Set the selected parcel in context
    navigate("/userProfile/parcels/specificParcels");
  } // Navigate to the details page
  };

  const handleTracking = () =>{
    navigate("/trackingStatus");
  }

  return (
    <div className="bg-[#000000] min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
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
                <a
                  key={item}
                  className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                  href="#"
                >
                  {item}
                </a>
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
              <div className="absolute top-12 right-0 w-48 bg-[#2a2d36] rounded-lg shadow-lg py-4">
                {["Edit Profile", "Add Address", "Parcels", "Payment Methods"].map(
                  (item, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A] transition"
                      onClick={() =>
                        handleSidebarClick(`/${item.toLowerCase().replace(" ", "-")}`)
                      }
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-10 py-6 flex gap-6 items-center">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-[#3C3F4A] text-white px-4 py-2 rounded-lg border-none outline-none"
        >
          <option value="All">All Parcels</option>
          <option value="Sender">As Sender</option>
          <option value="Receiver">As Receiver</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-[#3C3F4A] text-white px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Parcel List */}
      <div className="px-10 space-y-4">
        {filteredParcels.length > 0 ? (
          filteredParcels.map((parcel) => (
            <div
              key={parcel._id} // Using MongoDB `_id` field
              className="flex items-center justify-between bg-[#3C3F4A] p-4 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">📦</div>
                <div>
                  <h3 className="text-lg font-bold">{parcel.parcelName}</h3>
                  <p className="text-sm text-gray-400">{parcel.parcelType}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-[#607AFB] px-4 py-2 rounded-lg hover:bg-[#809CFF] transition" onClick={() => handleMoreInfo(parcel)} >
                  More Info
                </button>
                <button className="bg-[#607AFB] px-4 py-2 rounded-lg hover:bg-[#809CFF] transition" onClick={handleTracking} >
                  Track
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No parcels found.</p>
        )}
      </div>
    </div>
  );
};

export default UserParcels;
