import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate, Link } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";
import Logout from "../Auth/Logout";

const NotificationsPage = () => {
  const { currentState } = useParcelRegistration();
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { id, socket, setParcelId } = useSocket();
  const navigate = useNavigate();
  const { setFetching, setNotificationId } = useParcelRegistration();

  useEffect(() => {
    if (socket) {
      socket.emit("fetchAllNotifications", { id }, (response) => {
        if (response.success) {
          console.log("all notifications:", response);
          setNotifications(response.notifications);
          localStorage.setItem("notifications", JSON.stringify(response.notifications));
        } else {
          console.error("Error in notification", response.message);
        }
      });

      return () => {
        socket.off("fetchAllNotifications");
      };
    } else {
      console.log("Socket is not connected yet.");
    }
  }, [id, socket]);

  const handleClick = (notification) => {
    if (notification.notificationType === "action" && notification.status === "pending") {
      console.log("notification id", notification._id);
      setParcelId(notification.parcelId);
      setNotificationId(notification._id);
      if (socket) {
        socket.emit("changeNotificationStatus", { notificationId: notification._id }, (response) => {
          if (response.success) {
            console.log("Notification status updated successfully:", response.parcelId);
          } else {
            console.error("Failed to update notification status:", response.error);
          }
        });
      }
      setFetching(true);
      navigate("/home/receiverConfirm");
    } else if (notification.notificationType === "response" && notification.status === "pending") {
      setParcelId(notification.parcelId);
      setNotificationId(notification._id);
      if (socket) {
        socket.emit("changeNotificationStatus", { notificationId: notification._id }, (response) => {
          if (response.success) {
            console.log("Notification status updated successfully:", response.parcelId);
          } else {
            console.error("Failed to update notification status:", response.error);
          }
        });
      }
      navigate("/userProfile/parcels/specificParcels");
    } else if (notification.notificationType === "action" && notification.handlingStatus === false) {
      setNotificationId(notification._id);
      setParcelId(notification.parcelId);
      setFetching(true);
      navigate("/home/receiverConfirm");
    } else {
      setNotificationId(notification._id);
      setParcelId(notification.parcelId);
      navigate("/userProfile/parcels/specificParcels");
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <div className="bg-black min-h-screen text-white "style={{ fontFamily: '"Poppins", sans-serif' }}>
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
                to={`/${item.toLowerCase()}`} // Automatically generates the correct path
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

      {/* Notifications Section */}
      <main className="px-10 py-8">
        <div className="flex justify-between items-center mb-6 min-h-fit mt-16 ">
          <h1 className="text-3xl font-extrabold text-blue-300">Notifications</h1>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg">
            Mark All as Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <h3>No Notifications</h3> // Display this if there are no notifications
          ) : (
            notifications.map((notification, index) => {
              const key = notification._id || index;
              if (
                (notification.notificationType === "response" && notification.status === "pending") ||
                (notification.notificationType === "action" && notification.handlingStatus === false)
              ) {
                const notificationStyle =
                  notification.status === "pending"
                    ? "bg-gray-700 animate-pulse"
                    : "bg-gray-800";
                const statusText = notification.status === "pending" ? "Unseen" : "Seen";

                return (
                  <div
                    key={key}
                    className={`p-5 max-w-1/4-md rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${notificationStyle}`}
                    onClick={() => handleClick(notification)}
                  >
                    <div className="flex justify-between items-center">
                      <p
                        className={`${
                          notification.status === "pending"
                            ? "font-bold text-blue-400"
                            : "text-gray-400"
                        } text-lg`}
                      >
                        {notification.message}
                      </p>
                      <span className="text-gray-500 text-sm">{notification.createdAt}</span>
                    </div>
                    <div className="text-gray-500 text-sm mt-2">{statusText}</div>
                  </div>
                );
              }
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
