import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import CircleLoader from "react-spinners/CircleLoader";
const HelpAndSupport = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <CircleLoader color="#607AFB" loading={true} size={100} />
      </div>
    );
  }
  return (
    <div className="min-h-fit text-white">
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
                  to={`/${item.toLowerCase()}`} // Automatically generates the correct path
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

      {/* Content Section */}
      <div className="w-container py-12 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 mt-10">
        <h1 className="text-4xl font-bold text-center mb-8">Help & Support</h1>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Contact Us</h2>
          <p className="mb-2 text-gray-300">Have any questions or issues? Reach out to us:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>
              Email:{" "}
              <a href="mailto:support@samanbhejo.com" className="text-blue-400 hover:underline">
                support@samanbhejo.com
              </a>
            </li>
            <li>
              Phone: <span className="text-blue-400">+91-123-456-7890</span>
            </li>
            <li>Live Chat: Available 24/7 on our platform</li>
          </ul>
        </section>

        {/* Frequently Asked Questions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How can I track my parcel?",
                answer:
                  "You can track your parcel by logging into your account and navigating to the 'Track Parcel' section.",
              },
              {
                question: "What should I do if I don't receive an OTP?",
                answer:
                  "Ensure your phone number is correct. If the issue persists, contact our support team.",
              },
              {
                question: "Can I change my delivery address after placing an order?",
                answer:
                  "Yes, you can update your delivery address from the 'My Orders' section before the parcel is dispatched.",
              },
              {
                question: "What payment methods are accepted?",
                answer: "We accept credit cards, debit cards, UPI, and wallet payments.",
              },
            ].map(({ question, answer }, index) => (
              <div key={index} className="bg-navy-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-medium text-gray-300">{question}</h3>
                <p className="text-gray-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section>
  <h2 className="text-2xl font-semibold mb-4 text-blue-500">Feedback</h2>
  <p className="mb-2 text-gray-300">We value your feedback! Let us know how we can improve:</p>
  <form className="space-y-4">
    <textarea
      className="w-full bg-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="5"
      placeholder="Write your feedback here..."
    ></textarea>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
    >
      Submit Feedback
    </button>
  </form>
</section>

      </div>
    </div>
  );
};

export default HelpAndSupport;
