// import React, { useState, useEffect } from 'react';

// const trackingSteps = [
//   { status: 'Receiver Side Confirmation', description: 'Receiver confirmed' },
//   { status: 'Carrier Picking', description: 'Picking carrier for parcel' },
//   { status: 'Carrier Picked Up', description: 'Carrier picked up' },
//   { status: 'Carrier Departed from City A', description: 'Carrier departed from city A' },
//   { status: 'Carrier Reached City B', description: 'Carrier reached city B' },
//   { status: 'Carrier Arrived in Receiver’s City', description: 'Carrier arrived in the same city as receiver' },
//   { status: 'Parcel Delivered', description: 'Parcel delivered to the receiver' }
// ];

// const ParcelTracking = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentStep < trackingSteps.length - 1) {
//         setCurrentStep(prevStep => prevStep + 1);
//       }
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentStep]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-inter">
//       <header className="border-b border-gray-800 py-4 px-6 flex justify-between items-center bg-gray-950 shadow-md">
//         <div className="flex items-center gap-3">
//           <div className="text-2xl font-bold text-green-500 animate-pulse">Delivr</div>
//           <span className="text-sm text-gray-400">Tracking your parcel</span>
//         </div>
//         <nav className="flex gap-6">
//           <a href="#track" className="text-gray-300 hover:text-green-400 transition-colors">Track</a>
//           <a href="#help" className="text-gray-300 hover:text-green-400 transition-colors">Help</a>
//           <div className="bg-gray-800 p-2 rounded-full cursor-pointer hover:scale-105 transition-transform">
//             <img
//               src="https://cdn.usegalileo.ai/stability/0cace939-95bb-4948-8bff-ecd10069ab13.png"
//               alt="user avatar"
//               className="rounded-full w-8 h-8"
//             />
//           </div>
//         </nav>
//       </header>

//       <div className="px-10 py-10">
//         <h2 className="text-3xl font-bold mb-8 text-center animate-fadeIn">Tracking Number: 1Z12345E0291980793</h2>
        
//         <div className="relative h-2 mb-8 bg-gray-800 rounded-full">
//           <div
//             className="absolute h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
//             style={{ width: `${((currentStep + 1) / trackingSteps.length) * 100}%` }}
//           ></div>
//         </div>

//         <div className="space-y-6">
//           {trackingSteps.map((step, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-4 p-5 rounded-lg transition-all duration-500 ease-out transform 
//                 ${index <= currentStep ? 'bg-green-700 scale-105 shadow-lg' : 'bg-gray-800 scale-100 shadow-md'}
//                 ${index === currentStep ? 'animate-glow' : ''}`}
//             >
//               <div className="text-white rounded-full bg-green-800 p-2 animate-pulse">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                   <path
//                     d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"
//                   ></path>
//                 </svg>
//               </div>
//               <div>
//                 <p className={`text-lg font-semibold ${index <= currentStep ? 'text-white' : 'text-gray-400'}`}>{step.status}</p>
//                 <p className="text-gray-400 text-sm">{step.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <button
//           onClick={() => setCurrentStep(currentStep === trackingSteps.length - 1 ? 0 : currentStep + 1)}
//           className="mt-12 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none shadow-lg shadow-green-700"
//         >
//           {currentStep === trackingSteps.length - 1 ? 'Reset Tracking' : 'Next Step'}
//         </button>
//       </div>

//       <style jsx>{`
//         .animate-glow {
//           animation: glow 1.5s ease-in-out infinite alternate;
//         }
        
//         @keyframes glow {
//           from {
//             box-shadow: 0 0 10px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.3);
//           }
//           to {
//             box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.5);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ParcelTracking;


import React, { useState, useEffect } from 'react';

const trackingSteps = [
  { status: 'Receiver Side Confirmation', description: 'Receiver confirmed' },
  { status: 'Carrier Picking', description: 'Picking carrier for parcel' },
  { status: 'Carrier Picked Up', description: 'Carrier picked up' },
  { status: 'Carrier Departed from City A', description: 'Carrier departed from city A' },
  { status: 'Carrier Reached City B', description: 'Carrier reached city B' },
  { status: 'Carrier Arrived in Receiver’s City', description: 'Carrier arrived in the same city as receiver' },
  { status: 'Parcel Delivered', description: 'Parcel delivered to the receiver' }
];

const ParcelTracking = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < trackingSteps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-inter">
      <header className="border-b border-gray-700 py-4 px-6 flex justify-between items-center bg-gray-950 shadow-md">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-teal-500 animate-pulse">Delivr</div>
          <span className="text-sm text-gray-400">Tracking your parcel</span>
        </div>
        <nav className="flex gap-6">
          <a href="#track" className="text-gray-300 hover:text-teal-400 transition-colors">Track</a>
          <a href="#help" className="text-gray-300 hover:text-teal-400 transition-colors">Help</a>
          <div className="bg-gray-800 p-2 rounded-full cursor-pointer hover:scale-105 transition-transform">
            <img
              src="https://cdn.usegalileo.ai/stability/0cace939-95bb-4948-8bff-ecd10069ab13.png"
              alt="user avatar"
              className="rounded-full w-8 h-8"
            />
          </div>
        </nav>
      </header>

      <div className="px-10 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center animate-fadeIn">Tracking Number: 1Z12345E0291980793</h2>

        <div className="flex justify-center items-center space-x-6 mb-10 relative">
          {trackingSteps.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div
                  className={`h-1 w-20 bg-teal-500 ${index <= currentStep ? 'opacity-100' : 'opacity-30'}`}
                  style={{
                    transition: 'all 0.5s ease-in-out',
                    transform: index <= currentStep ? 'scaleX(1.05)' : 'scaleX(0.9)',
                  }}
                ></div>
              )}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                  index <= currentStep ? 'bg-teal-500 shadow-teal-500/50 shadow-lg scale-110' : 'bg-gray-600 scale-100'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  boxShadow: index === currentStep ? '0 0 10px 4px rgba(56, 178, 172, 0.4)' : 'none',
                }}
              >
                <div className="text-lg font-bold text-gray-200">{index + 1}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-8">
          {trackingSteps.map((step, index) => (
            <div
              key={index}
              className={`transition-transform duration-700 ease-out transform ${
                index <= currentStep ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-5'
              }`}
            >
              <p className={`text-xl font-semibold ${index === currentStep ? 'text-teal-400' : 'text-gray-400'}`}>
                {step.status}
              </p>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentStep(currentStep === trackingSteps.length - 1 ? 0 : currentStep + 1)}
          className="mt-12 px-8 py-3 bg-teal-600 hover:bg-teal-700 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none shadow-lg shadow-teal-700/40"
        >
          {currentStep === trackingSteps.length - 1 ? 'Reset Tracking' : 'Next Step'}
        </button>
      </div>

      <style jsx>{`
        .animate-glow {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(56, 178, 172, 0.4), 0 0 20px rgba(56, 178, 172, 0.3);
          }
          to {
            box-shadow: 0 0 20px rgba(56, 178, 172, 0.6), 0 0 30px rgba(56, 178, 172, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default ParcelTracking;

