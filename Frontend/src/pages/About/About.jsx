import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../Auth/Logout";

const AboutPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <div className="about-page-container bg-gradient-to-r from-black via-[#0f172a] to-[#1e293b] min-h-screen text-gray-300 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full h-20 flex items-center justify-between px-10 py-3 bg-[#000000] z-50 shadow-lg border-b border-gray-800">
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
          <h2 className="text-lg font-bold tracking-wide">Saman-Bhejo</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-6">
            {["Home", "About", "Notifications", "Pricing", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-blue-500 transition duration-300"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
          <div className="relative">
            <div
              className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition duration-300"
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
              <div className="absolute top-12 right-0 w-48 bg-[#1e293b] border border-gray-600 rounded-xl shadow-lg py-4">
                {[ "Edit Profile", "Add Address", "Parcels", "Payment Methods", ].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-500 transition"
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

      {/* Main Content */}
      <main className="flex items-center justify-center h-screen px-6 md:px-12">
        <div className="max-w-5xl mx-auto bg-[#111216] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-blue-400 text-center">
            About Saman-Bhejo
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-gray-400">
            Welcome to <span className="text-blue-500">Saman-Bhejo</span>, your
            trusted platform for hassle-free parcel delivery. We aim to make
            every delivery seamless, secure, and efficient.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">
              Our Key Features
            </h2>
            <ul className="space-y-3">
              <li>
                <strong className="text-blue-500">Real-Time Tracking:</strong>{" "}
                Monitor your parcel's journey in real time.
              </li>
              <li>
                <strong className="text-blue-500">OTP Verification:</strong>{" "}
                Secure handovers with a two-step OTP system.
              </li>
              <li>
                <strong className="text-blue-500">Instant Notifications:</strong>{" "}
                Stay updated with every milestone.
              </li>
              <li>
                <strong className="text-blue-500">24/7 Support:</strong>{" "}
                Assistance whenever you need it.
              </li>
              <li>
                <strong className="text-blue-500">User-Centric Design:</strong>{" "}
                Simplified for a smooth experience.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-400">
              At Saman-Bhejo, we envision a future where technology bridges
              every gap in parcel delivery, making the process swift, secure,
              and stress-free.
            </p>
          </section>

          <div className="text-center">
            <p className="text-lg font-bold text-blue-500">
              Start your journey with us today!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;