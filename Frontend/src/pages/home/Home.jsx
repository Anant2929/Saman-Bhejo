import React from 'react';
import Logout from '../Auth/Logout';

const Home = () => {
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

            <Logout/>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="px-10 md:px-40 flex flex-1 justify-center py-5 ">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-white text-[32px] font-bold text-center py-6">Welcome, John Doe</h1>
            <h2 className="text-white text-[22px] font-bold py-5">Manage Parcel</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 ">
              <Card
                imageUrl="https://cdn.usegalileo.ai/sdxl10/b5f666c4-2f14-4001-b667-06435e9eefa3.png"
                title="Get Parcel"
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
const Card = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col gap-3 pb-3 ">
      <div
        className="w-full aspect-square bg-center bg-cover rounded-xl hover:scale-110 duration-300"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <p className="text-white text-base font-medium">{title}</p>
    </div>
  );
};

export default Home;
