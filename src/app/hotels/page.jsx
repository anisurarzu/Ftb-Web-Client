"use client";
import React, { Suspense } from "react";
import dayjs from "dayjs";
import { StarFilled, FilterOutlined, CrownFilled } from "@ant-design/icons";
import { Skeleton, Divider, Checkbox, Slider, Input, notification } from "antd";
import { useSearchParams } from "next/navigation";
import SearchBooking2 from "@/components/Homepage/SearchBooking2";
import coreAxios from "@/components/coreAxios/Axios";
import { useRouter } from "next/navigation";

// Main component that uses useSearchParams
const HotelListingContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [priceRange, setPriceRange] = React.useState([1000, 10000]);
  const [selectedStars, setSelectedStars] = React.useState([]);
  const [hotels, setHotels] = React.useState([]);
  const [searchCriteria, setSearchCriteria] = React.useState({
    location: "Cox's Bazar",
    checkIn: dayjs(),
    checkOut: dayjs().add(1, "day"),
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const searchHotels = async (criteria) => {
    try {
      setLoading(true);
  
      const params = new URLSearchParams({
        location: criteria.location || "",
        checkInDate: criteria.checkIn?.format("YYYY-MM-DD") || "",
        checkOutDate: criteria.checkOut?.format("YYYY-MM-DD") || "",
        rooms: criteria.rooms?.toString() || "",
        adults: criteria.adults?.toString() || "",
        children: criteria.children?.toString() || "",
        minPrice: priceRange[0]?.toString() || "",
        maxPrice: priceRange[1]?.toString() || "",
        stars: selectedStars?.toString() || "",
      });
  
      const response = await coreAxios.get(`/web-hotels/search?${params.toString()}`);
  
      setHotels(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to load hotels",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Parse search parameters from URL
    if (searchParams) {
      const params = {
        location: searchParams.get("location") || "Cox's Bazar",
        checkIn: searchParams.get("checkIn")
          ? dayjs(searchParams.get("checkIn"))
          : dayjs(),
        checkOut: searchParams.get("checkOut")
          ? dayjs(searchParams.get("checkOut"))
          : dayjs().add(1, "day"),
        rooms: parseInt(searchParams.get("rooms") || "1"),
        adults: parseInt(searchParams.get("adults") || "2"),
        children: parseInt(searchParams.get("children") || "0"),
      };
      setSearchCriteria(params);
      searchHotels(params);
    }
  }, [searchParams]);

  // Handle filter changes
  React.useEffect(() => {
    if (searchCriteria.location) {
      searchHotels(searchCriteria);
    }
  }, [priceRange, selectedStars, searchCriteria]);

  const handleHotelSelect = (hotelId) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", hotelId);
    queryParams.set("location", searchCriteria.location);
    queryParams.set("checkIn", searchCriteria.checkIn.format("YYYY-MM-DD"));
    queryParams.set("checkOut", searchCriteria.checkOut.format("YYYY-MM-DD"));
    queryParams.set("rooms", searchCriteria.rooms);
    queryParams.set("adults", searchCriteria.adults);
    queryParams.set("children", searchCriteria.children);
    
    router.push(`/hotelsDetails?${queryParams.toString()}`);
  };

  const starOptions = [
    { label: "5 Star", value: 5 },
    { label: "4 Star", value: 4 },
    { label: "3 Star", value: 3 },
    { label: "2 Star", value: 2 },
  ];

  // Calculate nights stay
  const nights = searchCriteria.checkOut.diff(searchCriteria.checkIn, "day");

  // Skeleton components
  const FilterSkeleton = () => (
    <div className="space-y-6">
      <div>
        <Skeleton.Input active size="small" className="mb-3 w-1/3" />
        <Skeleton.Input active block className="mb-2" />
        <div className="flex gap-2">
          <Skeleton.Input active className="w-1/2" />
          <Skeleton.Input active className="w-1/2" />
        </div>
      </div>
      <div>
        <Skeleton.Input active size="small" className="mb-3 w-1/3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton.Input key={item} active block />
          ))}
        </div>
      </div>
      <div>
        <Skeleton.Input active size="small" className="mb-3 w-1/3" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton.Button key={item} active shape="round" className="w-20" />
          ))}
        </div>
      </div>
    </div>
  );

  const HotelCardSkeleton = () => (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton.Image active className="w-full md:w-1/4 !h-48" />
        <div className="w-full md:w-3/4 space-y-3">
          <div className="flex justify-between">
            <Skeleton.Input active size="default" className="w-3/4" />
            <Skeleton.Button active shape="circle" size="small" />
          </div>
          <Skeleton.Input active size="small" className="w-1/2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton.Button key={item} active shape="round" size="small" />
            ))}
          </div>
          <Skeleton.Input active size="small" className="w-3/4" />
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <Skeleton.Input active size="small" className="w-1/2" />
              <Skeleton.Input active size="large" className="w-1/3" />
              <Skeleton.Input active size="small" className="w-2/3" />
            </div>
            <Skeleton.Button active className="w-24 h-9" />
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsHeaderSkeleton = () => (
    <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
      <Skeleton.Input active size="small" className="w-40" />
      <div className="flex gap-4">
        {[1, 2, 3].map((item) => (
          <Skeleton.Button key={item} active shape="round" size="small" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#EBF0F4] min-h-screen">
      <div className="max-w-6xl mx-auto p-4 font-sans">
        {/* Header Section */}
        <div className="mt-12">
          <SearchBooking2
            initialValues={{
              location: searchCriteria.location,
              checkInDate: searchCriteria.checkIn,
              checkOutDate: searchCriteria.checkOut,
              rooms: searchCriteria.rooms,
              adults: searchCriteria.adults,
              children: searchCriteria.children,
            }}
          />
        </div>

        <Divider className="my-4" />

        {/* Search Summary */}
        {!loading && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Hotels in {searchCriteria.location}
            </h2>
            <p className="text-gray-600">
              {searchCriteria.checkIn.format("ddd, MMM D, YYYY")} -{" "}
              {searchCriteria.checkOut.format("ddd, MMM D, YYYY")} •{nights}{" "}
              {nights > 1 ? "nights" : "night"} •{searchCriteria.rooms}{" "}
              {searchCriteria.rooms > 1 ? "rooms" : "room"} •
              {searchCriteria.adults}{" "}
              {searchCriteria.adults > 1 ? "adults" : "adult"}
              {searchCriteria.children > 0
                ? `, ${searchCriteria.children} ${
                    searchCriteria.children > 1 ? "children" : "child"
                  }`
                : ""}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-4 bg-white p-4 rounded-lg shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <FilterOutlined /> Filters
              </h3>
              {loading ? (
                <FilterSkeleton />
              ) : (
                <>
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider
                      range
                      min={1000}
                      max={15000}
                      defaultValue={priceRange}
                      onChange={setPriceRange}
                      tooltip={{ formatter: (value) => `BDT ${value}` }}
                    />
                    <div className="flex justify-between mt-2">
                      <Input
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="w-[45%]"
                      />
                      <span className="self-center">to</span>
                      <Input
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                        className="w-[45%]"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Star Rating</h4>
                    <Checkbox.Group
                      options={starOptions}
                      onChange={setSelectedStars}
                      className="flex flex-col gap-2"
                    />
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Popular Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Breakfast Included",
                        "Free Cancellation",
                        "Swimming Pool",
                        "Free WiFi",
                      ].map((filter) => (
                        <span
                          key={filter}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                          {filter}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Property Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Hotel", "Resort", "Villa", "Guest House"].map(
                        (type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            {type}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Hotel Listings */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <>
                <ResultsHeaderSkeleton />
                {[1, 2, 3, 4, 5].map((item) => (
                  <HotelCardSkeleton key={item} />
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    {hotels.length} properties found in{" "}
                    {searchCriteria.location}
                  </p>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium cursor-pointer hover:text-blue-600">
                      Top Selling
                    </span>
                    <span className="text-sm font-medium cursor-pointer hover:text-blue-600">
                      Best Rated
                    </span>
                    <span className="text-sm font-medium cursor-pointer hover:text-blue-600">
                      Price (Low to High)
                    </span>
                  </div>
                </div>

                {hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <div
                      key={hotel._id || hotel.id}
                      className="border border-gray-200 rounded-lg p-4 mb-6 hover:shadow-md transition-shadow bg-white relative">
                      {hotel.topSelling && (
                        <div className="absolute top-4 left-4 bg-[#FACC48] text-[#061A6E] px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold z-10">
                          <CrownFilled /> TOP SELLING
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/4 h-48 rounded-lg overflow-hidden relative">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full md:w-3/4">
                          <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">
                              {hotel.name}
                            </h3>
                            <div className="flex items-center text-yellow-500">
                              <StarFilled />
                              <span className="ml-1 text-gray-700">
                                {hotel.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-2">
                            {hotel.location}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {hotel.amenities?.map((amenity, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>

                          <p className="text-green-600 text-sm mb-2">
                            {hotel.discount}
                          </p>

                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-gray-500 text-sm">
                                Starts from BDT+47.30
                              </p>
                              <p className="text-2xl font-bold">
                                BDT {hotel.price?.toLocaleString()}
                              </p>
                              <p className="text-gray-500 text-sm">
                                for {nights} {nights > 1 ? "nights" : "night"},
                                per room
                              </p>
                            </div>
                            <button
                              onClick={() => handleHotelSelect(hotel._id || hotel.id)}
                              className="bg-[#FACC48] text-[#061A6E] px-6 py-2 rounded hover:bg-[#e6c042] font-medium transition-colors">
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      No hotels found
                    </h3>
                    <p className="text-gray-600">
                      {` We couldn't find any hotels matching your search criteria.`}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page component with Suspense boundary
export default function HotelListingPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#EBF0F4] min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading hotel listings...</div>
        </div>
      }>
      <HotelListingContent />
    </Suspense>
  );
}