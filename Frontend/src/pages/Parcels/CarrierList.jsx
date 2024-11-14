import React from "react";

const Header = () => (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#1a2238] px-10 py-3 bg-[#1e2a38] shadow-lg">
    <div className="flex items-center gap-4 text-white">
      <div className="w-8 h-8">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_6_319)">
            <path
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              fill="currentColor"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_6_319">
              <rect width="48" height="48" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <h2 className="text-white text-lg font-semibold tracking-tight">Saman Bhejo</h2>
    </div>
    <div className="flex flex-1 justify-end gap-8">
      <label className="flex flex-col min-w-40 h-10 max-w-64">
        <div className="flex w-full items-stretch rounded-full bg-[#293B49] h-full shadow-sm">
          <div className="text-[#9dabb8] flex bg-[#1e2a38] items-center justify-center pl-4 rounded-l-full border-r">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
          <input
            placeholder="Search"
            className="flex w-full rounded-r-full bg-[#293B49] text-white px-4 focus:outline-none"
          />
        </div>
      </label>
      <button className="flex items-center justify-center rounded-full bg-[#2d3d4f] text-white px-4 py-2 gap-2 hover:bg-[#354859] transition duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
        </svg>
      </button>
    </div>
  </header>
);

const SearchBar = () => (
  <div className="px-4 py-3">
    <label className="flex flex-col min-w-40 h-12 w-full">
      <div className="flex w-full items-stretch rounded-full bg-[#293B49] shadow-sm">
        <div className="text-[#9dabb8] flex bg-[#1e2a38] items-center justify-center pl-4 rounded-l-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          placeholder="Search"
          className="flex w-full rounded-r-full bg-[#293B49] text-white px-4 focus:outline-none"
        />
      </div>
    </label>
  </div>
);

const CarrierDetails = () => (
  <div className="bg-[#24313E] p-6 mt-4 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg">
    <h1 className="text-white text-xl font-bold mb-4">Carrier Details</h1>
    <div className="flex justify-between items-center gap-4 text-white bg-[#3a4753] p-4 rounded-xl hover:bg-[#435361] transition-colors duration-200 ease-in-out">
      <div className="flex items-center gap-4">
        <img src="https://via.placeholder.com/48" alt="Carrier Profile" className="rounded-full w-12 h-12" />
        <div>
          <p className="text-lg font-semibold">Carrier Name</p>
          <p className="text-sm">Rating: ★★★★☆</p>
        </div>
      </div>
      <button className="bg-[#55687A] text-white py-2 px-4 rounded-lg hover:bg-[#4a5c6c] transition duration-200">
        Open
      </button>
    </div>
  </div>
);

const App = () => (
  <div className="text-[#9dabb8] bg-[#1a2635] min-h-screen p-6">
    <Header />
    <SearchBar />
    <CarrierDetails />
  </div>
);

export default App;
