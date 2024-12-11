import React, { useState } from "react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Verify your Aadhar Number",
      timestamp: "2024-12-09 10:30 AM",
      unread: true,
    },
    {
      id: 2,
      message: "You got a new parcel request",
      timestamp: "2024-12-08 2:15 PM",
      unread: true,
    },
    {
      id: 3,
      message: "Parcel accept request pending from Anant",
      timestamp: "2024-12-07 5:45 PM",
      unread: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, unread: false }))
    );
  };

  return (
    <div className="bg-[#2a2d36] min-h-screen text-white">
      {/* Header */}
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
          </div>
        </div>
      </header>

      {/* Notifications Section */}
      <main className="px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            className="bg-[#607AFB] text-white px-4 py-2 rounded-md transition hover:bg-[#4e64d3]"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-md transition-all cursor-pointer ${
                notification.unread
                  ? "bg-[#3C3F4A] animate-pulse"
                  : "bg-[#1E2027]"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-center">
                <p
                  className={`${
                    notification.unread ? "font-bold text-[#607AFB]" : "text-gray-400"
                  }`}
                >
                  {notification.message}
                </p>
                <span className="text-gray-500 text-sm">
                  {notification.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
