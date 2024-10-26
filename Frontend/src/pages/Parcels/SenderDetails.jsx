import React from "react";

const SenderForm = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29374C] px-10 py-3">
          <div className="flex items-center gap-4 text-[#F8F9FB]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#F8F9FB] text-lg font-bold leading-tight tracking-[-0.015em]">
              Parcel
            </h2>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal">Step 2/6</p>
              </div>
              <div className="rounded bg-[#32415D]">
                <div className="h-2 rounded bg-[#F4C753]" style={{ width: "33%" }}></div>
              </div>
            </div>
            <h2 className="text-[#F8F9FB] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Sender Information
            </h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value=""
                  />
                  <div
                    className="text-[#8A9DC0] flex border border-[#32415D] bg-[#1D2A36] items-center justify-center pr-[15px] rounded-r-xl border-l-0"
                    data-icon="MapPin"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            {["City", "City", ""].map((placeholder, index) => (
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3" key={index}>
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder={placeholder}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                    value=""
                  />
                </label>
              </div>
            ))}
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Previous</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderForm;
