import React from 'react';

const AllMyParcels = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">All My Parcels</h1>
      <div className="bg-white shadow-lg rounded-lg w-11/12 max-w-4xl p-6">
        <ul className="divide-y divide-gray-300 text-lg text-gray-700">
        <li className="py-4 flex justify-between">
            <span className="font-semibold">Tracking Status:</span>
            <span>--</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="font-semibold">Carrier Details:</span>
            <span>--</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="font-semibold">Parcel Details:</span>
            <span>--</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="font-semibold">Receiver Details:</span>
            <span>--</span>
          </li>
          <li className="py-4 flex justify-between">
            <span className="font-semibold">Payment:</span>
            <span>--</span>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default AllMyParcels;
