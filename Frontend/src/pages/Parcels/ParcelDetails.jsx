import React from 'react';



export default function ParcelForm(){
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between"><p className="text-[#F9FAFA] text-base font-medium leading-normal">Step 1 of 5</p></div>
              <div className="rounded bg-[#505362]"><div className="h-2 rounded bg-[#607AFB]" style={{ width: '20%' }}></div></div>
            </div>
            <h1 className="text-[#F9FAFA] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Parcel Details</h1>
            
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Parcel Name</p>
                <input
                  placeholder="E.g. Birthday Gift"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Weight</p>
                <input
                  placeholder="1 lb"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Type</p>
                <input
                  placeholder="Box"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Description</p>
                <textarea
                  placeholder="E.g. A box of chocolates"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] min-h-36 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Photo URL</p>
                <input
                  placeholder="(Optional)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Volume</p>
                <input
                  placeholder="E.g. 1ft x 1ft x 1ft"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};