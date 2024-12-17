import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useParcelRegistration } from "../../context/ParcelContext";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { id, socket, setParcelId } = useSocket();
  const navigate = useNavigate();
  const { setFetching } = useParcelRegistration();

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
    if (notification.notificationType === "response" && notification.status === "pending") {
      setParcelId(notification.parcelId);
      if (socket) {
        socket.emit("changeNotificationStatus", { notificationId: notification._id }, (response) => {
          if (response.success) {
            console.log("Notification status updated successfully:", response.parcelId);
          } else {
            console.error("Failed to update notification status:", response.error);
          }
        });
      }
      navigate("/home/receiverConfirm");
    } else if(notification.notificationType === "action" && notification.status === "pending"){
      setParcelId(notification.parcelId);
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
    
      navigate("/userProfile/parcels/parcelInfoDisplay");
    }
    
    else {
      setFetching(true);
      setParcelId(notification.parcelId);
      navigate("/userProfile/parcels/parcelInfoDisplay");
    }
  };

  return (
    <div className="bg-[#2a2d36] min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3">
        <div className="flex items-center gap-4 text-white animate-blink">
          <div className="w-6 h-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Saman Bhejo
          </h2>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map((item) => (
              <a key={item} className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]" href="#">
                {item}
              </a>
            ))}
          </nav>
          <div className="relative">
            <div className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer transition transform duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
                <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Section */}
      <main className="px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button className="bg-[#607AFB] text-white px-4 py-2 rounded-md transition hover:bg-[#4e64d3]">
            Mark All as Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="mt-6 space-y-4">
          {notifications.map((notification, index) => {
            const key = notification._id || index;
            let message = "";
            if (notification.notificationType === "response") {
              message = "Receiver sent response";
            } else if (notification.notificationType === "action") {
              message = "You got a new parcel";
            }

            const notificationStyle =
              notification.status === "pending" ? "bg-[#3C3F4A] animate-pulse" : "bg-[#1E2027]";
            const statusText = notification.status === "pending" ? "Unseen" : "Seen";

            return (
              <div
                key={key}
                className={`p-4 rounded-md transition-all cursor-pointer ${notificationStyle}`}
                onClick={() => handleClick(notification)}
              >
                <div className="flex justify-between items-center">
                  <p className={`${notification.status === "pending" ? "font-bold text-[#607AFB]" : "text-gray-400"}`}>
                    {message}
                  </p>
                  <span className="text-gray-500 text-sm">{notification.createdAt}</span>
                </div>
                <div className="text-gray-500 text-xs">{statusText}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
