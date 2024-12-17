import React, { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import Logout from "../Auth/Logout";
import { useParcelRegistration } from "../../context/ParcelContext";


const Home = () => {
  const navigate = useNavigate();
  const {
    parcelNotification,
    id,
    parcelDataInfo,
    receiverDataInfo,
    senderDataInfo,
    socket,
    setParcelNotification,
    responseNotification,
    setResponseNotification,
  } = useSocket();
  const [username, setUsername] = useState("");
  const { token } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [showResponseNotification,setShowResponseNotification ] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const  {setFetching} = useParcelRegistration()

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("/api/user/getname", {
          withCredentials: true,
        });
        const user = response.data.name;
        localStorage.setItem("username", user);
        setUsername(user);
        if (parcelNotification) {
          setShowNotification(true);
        }
        if(responseNotification){
          setShowResponseNotification(true)
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [token, parcelNotification]);

  const handleNotificationClick = (notificationType) => {
    console.log(" i am in notification")
    if (notificationType === "parcel") {
      console.log(" i am type parcel notification")
      setShowNotification(false); // Hide modal after confirmation
      setParcelNotification(false);
  
      socket.emit(
        "deletePendingMessage",
        { id, notificationType },
        (response) => { 
          setFetching(false);
          navigate("/home/notifications");  // Perform your navigation or any other action after response
          
        }
      );
    }
  
    if (notificationType === "response") {
      setShowResponseNotification(false); // Hide modal after confirmation
      setResponseNotification(false);
  
      socket.emit(
        "deletePendingMessage",
        { id, notificationType },  // Add the missing comma here
        (response) => { 
          navigate("/home/notifications");  // Perform your navigation or any other action after response
        }
      );
    }
  };
  
  const CreateParcel = () => {
    navigate("/parcel/details");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#000000] dark overflow-x-hidden"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header Section */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3">
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
  {["Home", "About", "Notifications", "Pricing", "Contact"].map((item) => (
    <Link
      key={item}
      to={`/home/${item.toLowerCase()}`} // Automatically generates the correct path
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

        {/* Notification Modal */}
        {showNotification && (
          <div className="fixed top-[6rem] left-0 w-full flex justify-center z-20">
            <div className="flex items-center gap-4 bg-[#2a2d36] px-6 py-4 rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-slide-in">
              <div className="text-[#F9FAFA] flex items-center justify-center rounded-full bg-[#3C3F4A] shrink-0 w-10 h-10 shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
                </svg>
              </div>
              <p className="text-[#F9FAFA] text-lg font-semibold flex-1">
                You got a new parcel
              </p>
              <button
                onClick={()=>handleNotificationClick ("parcel")}
                className="flex items-center justify-center h-10 px-5 bg-[#607AFB] text-white font-bold rounded-full transition transform duration-300 hover:scale-110 shadow-md"
              >
                Open
              </button>
            </div>
          </div>
        )}



{showResponseNotification && (
          <div className="fixed top-[6rem] left-0 w-full flex justify-center z-20">
            <div className="flex items-center gap-4 bg-[#2a2d36] px-6 py-4 rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-slide-in">
              <div className="text-[#F9FAFA] flex items-center justify-center rounded-full bg-[#3C3F4A] shrink-0 w-10 h-10 shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
                </svg>
              </div>
              <p className="text-[#F9FAFA] text-lg font-semibold flex-1">
                You got a new Notification
              </p>
              <button
                onClick={()=>handleNotificationClick ("response")}
                className="flex items-center justify-center h-10 px-5 bg-[#607AFB] text-white font-bold rounded-full transition transform duration-300 hover:scale-110 shadow-md"
              >
                Open
              </button>
            </div>
          </div>
        )}
        {/* Main Content Section */}
        <div className="px-10 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-white text-[36px] font-semibold text-center py-6">
              Welcome {username}
            </h1>
            <h2 className="text-white text-[24px] font-semibold text-center py-5">
              Manage Parcel
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/b5f666c4-2f14-4001-b667-06435e9eefa3.png"
                title="Get Parcel"
                onClick={CreateParcel}
              />
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/e72c4298-cc13-4e77-b114-7eee8427ce37.png"
                title="Carry Parcel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ imageUrl, title, onClick }) => (
  <div
    className="flex flex-col gap-3 px-16 pb-3 cursor-pointer transform transition-transform duration-300 hover:scale-105"
    onClick={onClick}
  >
    <div
      className="w-full aspect-square bg-center bg-cover rounded-xl"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <p className="text-white text-lg font-medium">{title}</p>
  </div>
);

export default Home;
