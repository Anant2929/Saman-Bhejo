import React from "react";

const UserProfile = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#000000] overflow-x-hidden font-sans">
      {/* Header */}
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
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Saman Bhejo
          </h2>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map((item) => (
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

      {/* Main Content */}
      <div className="pt-24 px-10 flex flex-1 justify-center py-10">
        <div className="max-w-4xl w-full flex flex-col">
          {/* Page Title */}
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-white text-4xl font-black tracking-tight">
              Your Account
            </h1>
          </div>

          {/* Bars */}
          {[
            { title: "Your Details", buttonText: "Edit" },
            { title: "Addresses", buttonText: "Add" },
            { title: "Payment Methods", buttonText: "Add" },
            { title: "Parcels", buttonText: "View" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#111418] rounded-lg p-4 mb-4 shadow-md hover:bg-[#1A1C20] transition"
            >
              <p className="text-white text-lg font-medium">{item.title}</p>
              <button className="bg-[#293038] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#607AFB] transition">
                {item.buttonText}
              </button>
            </div>
          ))}

          {/* Subscription Notice */}
          <div className="flex items-center bg-[#111418] rounded-lg p-4 mb-4 shadow-md">
            <p className="text-white text-lg font-medium flex-1">
              You are subscribed to receive marketing emails
            </p>
          </div>

          {/* Logout */}
          <div
            className="flex items-center justify-between bg-[#111418] rounded-lg p-4 shadow-md hover:bg-[#1A1C20] transition"
          >
            <p className="text-white text-lg font-medium">Logout</p>
            <button className="bg-[#293038] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FB607A] transition">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
