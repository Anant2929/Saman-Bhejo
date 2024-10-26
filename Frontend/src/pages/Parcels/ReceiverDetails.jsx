import React from 'react';

const ReceiverAddress = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden"
      style={{
        '--checkbox-tick-svg':
          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(249,250,250)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
        fontFamily: '"Work Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3">
          <div className="flex items-center gap-4 text-[#F9FAFA]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#F9FAFA] text-lg font-bold leading-tight tracking-[-0.015em]">
              Glint
            </h2>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal">
                  Step 3: Receiver's Address
                </p>
              </div>
              <div className="rounded bg-[#505362]">
                <div className="h-2 rounded bg-[#607AFB]" style={{ width: '50%' }}></div>
              </div>
            </div>
            <h2 className="text-[#F9FAFA] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Receiver's Address
            </h2>
            {['First name', 'Last name', 'Address', 'Apartment, suite, etc. (optional)', 'City', 'State', 'Country', 'Zip Code'].map((placeholder, index) => (
              <div key={index} className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder={placeholder}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border-none bg-[#3C3F4A] focus:border-none h-14 placeholder:text-[#D5D6DD] p-4 text-base font-normal leading-normal"
                    defaultValue=""
                  />
                </label>
              </div>
            ))}
            <div className="px-4">
              <label className="flex gap-x-3 py-3 flex-row">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#505362] border-2 bg-transparent text-[#607AFB] checked:bg-[#607AFB] checked:border-[#607AFB] focus:ring-0 focus:ring-offset-0 focus:border-[#505362] focus:outline-none"
                />
                <p className="text-[#F9FAFA] text-base font-normal leading-normal">
                  Set as default address
                </p>
              </label>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#3C3F4A] text-[#F9FAFA] text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Previous</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#607AFB] text-[#F9FAFA] text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverAddress;
