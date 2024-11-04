import React, { useEffect, useState } from 'react';
import Logout from '../Auth/Logout';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // State to store the username
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('/api/user/getname', { withCredentials: true });
        console.log(response.data.name)
        setUsername(response.data.name); // Assuming the response has a 'username' field
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, [token]);

  const handleClick = () => {
    console.log("clicking");
    navigate("/parcel/details");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#181411] dark overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header Section */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="w-6 h-6">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Saman Bhejo</h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              <a className="text-white text-sm font-medium" href="#">Home</a>
              <a className="text-white text-sm font-medium" href="#">About</a>
              <a className="text-white text-sm font-medium" href="#">Features</a>
              <a className="text-white text-sm font-medium" href="#">Pricing</a>
              <a className="text-white text-sm font-medium" href="#">Contact</a>
            </nav>

            <div className="flex gap-2">
              <Logout />
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="px-10 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-white text-[32px] font-bold text-center py-6">Welcome  {username} </h1> {/* Display username */}
            <h2 className="text-white text-[22px] font-bold py-5">Manage Parcel</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/b5f666c4-2f14-4001-b667-06435e9eefa3.png"
                title="Get Parcel"
                onClick={handleClick}
              />
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/e72c4298-cc13-4e77-b114-7eee8427ce37.png"
                title="Carry Parcel"
              />
              <Card
                imageUrl="https://cdn.usegalileo.ai/stability/8d900686-5492-48b1-8b45-e5dca0e56001.png"
                title="User Profile"
              />
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/17e1af90-d027-4c30-9667-d5df78ba3d72.png"
                title="Help and Support"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ imageUrl, title, onClick }) => {
  return (
    <div
      className="flex flex-col gap-3 pb-3 cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div
        className="w-full aspect-square bg-center bg-cover rounded-xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <p className="text-white text-base font-medium">{title}</p>
    </div>
  );
};

export default Home;


// import React, { useEffect, useState } from 'react';
// import Logout from '../Auth/Logout';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from '../../context/AuthContext';

// const Home = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const response = await axios.get('/api/user/getname', { withCredentials: true });
//         setUsername(response.data.name);
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };
//     fetchUsername();
//   }, [token]);

//   const handleClick = () => {
//     navigate("/parcel/details");
//   };

//   return (
//     <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
//       <div className="layout-container flex h-full grow flex-col">
//         <header className="flex items-center justify-between border-b border-gray-700 px-10 py-3 bg-gray-900 shadow-md">
//           <div className="flex items-center gap-4 text-white">
//             <div className="w-6 h-6">
//               <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
//               </svg>
//             </div>
//             <h2 className="text-lg font-bold">Saman Bhejo</h2>
//           </div>
//           <nav className="flex gap-8">
//             <a className="text-gray-300 hover:text-white transition-colors" href="#">Home</a>
//             <a className="text-gray-300 hover:text-white transition-colors" href="#">About</a>
//             <a className="text-gray-300 hover:text-white transition-colors" href="#">Features</a>
//             <a className="text-gray-300 hover:text-white transition-colors" href="#">Pricing</a>
//             <a className="text-gray-300 hover:text-white transition-colors" href="#">Contact</a>
//           </nav>
//           <Logout />
//         </header>

//         <main className="flex flex-1 flex-col items-center px-10 md:px-40 py-10">
//           <h1 className="text-4xl font-bold text-center animate-fadeIn py-6">Welcome,{username}</h1>
//           <h2 className="text-2xl font-semibold py-5">Manage Your Parcels</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
//             <Card
//               imageUrl="https://cdn.usegalileo.ai/sdxl10/b5f666c4-2f14-4001-b667-06435e9eefa3.png"
//               title="Get Parcel"
//               onClick={handleClick}
//             />
//             <Card
//               imageUrl="https://cdn.usegalileo.ai/sdxl10/e72c4298-cc13-4e77-b114-7eee8427ce37.png"
//               title="Carry Parcel"
//             />
//             <Card
//               imageUrl="https://cdn.usegalileo.ai/stability/8d900686-5492-48b1-8b45-e5dca0e56001.png"
//               title="User Profile"
//             />
//             <Card
//               imageUrl="https://cdn.usegalileo.ai/sdxl10/17e1af90-d027-4c30-9667-d5df78ba3d72.png"
//               title="Help and Support"
//             />
//             {/* New Card for Parcel Status */}
//             <Card
//               imageUrl="https://cdn.usegalileo.ai/sdxl10/3b8f94b6-6e91-42b5-8b3d-7dca3f0989f8.png"
//               title="Parcel Status"
//             />
//           </div>
//         </main>
//       </div>

//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 1.5s ease-in-out;
//         }
        
//         .animate-glow {
//           animation: glow 1.5s ease-in-out infinite alternate;
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes glow {
//           from {
//             box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
//           }
//           to {
//             box-shadow: 0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.6);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Reusable Card component with animations
// const Card = ({ imageUrl, title, onClick }) => {
//   return (
//     <div
//       className="flex flex-col gap-3 p-5 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg shadow-md"
//       onClick={onClick}
//     >
//       <div
//         className="w-full aspect-square bg-center bg-cover rounded-lg shadow-lg transition-all transform hover:scale-110"
//         style={{ backgroundImage: `url(${imageUrl})` }}
//       ></div>
//       <p className="text-lg font-semibold text-white text-center animate-glow">{title}</p>
//     </div>
//   );
// };

// export default Home;
