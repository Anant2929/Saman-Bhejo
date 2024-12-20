import React, { useEffect, useState } from "react";
import axios from "axios";

const ParcelList = () => {
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: "",
    deliveryDate: "",
    sortBy: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("/api/carrier/parcelList", {
          withCredentials: true,
        });
        setParcels(response.data);
        setFilteredParcels(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setParcels([]); // Clear parcels
          setFilteredParcels([]); // Clear filtered parcels
          setError("Parcels not found for this date"); // Set error message
        } else {
          setError("An error occurred while fetching parcels");
        }
      }
    };

    fetchParcels();
  }, []);

  // Handle filtering and sorting
  const applyFilters = () => {
    let updatedParcels = [...parcels];

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      updatedParcels = updatedParcels.filter(
        (parcel) => parcel.price >= minPrice && parcel.price <= maxPrice
      );
    }

    if (filters.deliveryDate) {
      updatedParcels = updatedParcels.filter(
        (parcel) => parcel.deliveryDate === filters.deliveryDate
      );
    }

    if (filters.sortBy === "priceLowToHigh") {
      updatedParcels.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceHighToLow") {
      updatedParcels.sort((a, b) => b.price - a.price);
    }

    setFilteredParcels(updatedParcels);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-black dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#333333] px-10 py-3">
          <div className="flex items-center gap-4 text-[#FFFFFF]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_330)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_330">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em]">
              Saman Bhejo
            </h2>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#FFFFFF] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Available Parcels to Carry
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <select
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
              >
                <option value="">Price Range</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-500">$200 - $500</option>
              </select>

              <input
                type="date"
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.deliveryDate}
                onChange={(e) =>
                  setFilters({ ...filters, deliveryDate: e.target.value })
                }
              />

              <select
                className="rounded-xl bg-[#333333] text-[#FFFFFF] p-2"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
              >
                <option value="">Sort By</option>
                <option value="priceLowToHigh">Price (Lowest First)</option>
                <option value="priceHighToLow">Price (Highest First)</option>
              </select>
            </div>

            {/* Parcels */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 p-4">
              {error ? (
                <p className="text-[#FFFFFF] text-lg font-bold text-center w-full">
                  {error}
                </p>
              ) : (
                filteredParcels.map((parcel, index) => (
                  <div key={index} className="flex flex-col gap-3 pb-3">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                        backgroundImage:
                          `url("https://via.placeholder.com/150")` ||
                          parcel.img,
                      }}
                    ></div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#FFFFFF] text-base font-medium leading-normal">
                        {parcel.description}
                      </p>
                      <p className="text-green-500 text-sm font-bold">
                        ${parcel.price}
                      </p>
                    </div>
                    <p className="text-[#CBCBCB] text-sm font-normal leading-normal">
                      Pickup: {parcel.pickupAddress}
                    </p>
                    <p className="text-[#CBCBCB] text-sm font-normal leading-normal">
                      Dropoff: {parcel.dropoffAddress}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelList;
