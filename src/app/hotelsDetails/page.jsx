"use client";
import React, { useState, Suspense, useEffect } from "react";
import dayjs from "dayjs";
import {
  StarFilled,
  EnvironmentFilled,
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  PrinterOutlined,
  DownOutlined,
  UpOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { Carousel, Divider, Button, Modal, Spin, Tabs, Tag } from "antd";

import { useAuth } from "@/context/AuthContext";
import coreAxios from "@/components/coreAxios/Axios";

const HotelsDetailsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const { user } = useAuth();

  const searchCriteria = {
    location: searchParams.get("location") || "Cox's Bazar",
    checkIn: searchParams.get("checkIn")
      ? dayjs(searchParams.get("checkIn"))
      : dayjs(),
    checkOut: searchParams.get("checkOut")
      ? dayjs(searchParams.get("checkOut"))
      : dayjs().add(1, "day"),
    adults: parseInt(searchParams.get("adults") || 2),
  };

  const hotelId = searchParams.get("id");
  const nights = searchCriteria.checkOut.diff(searchCriteria.checkIn, "day");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const { data } = await coreAxios.get(`/web-hotel-details/${hotelId}`);
        setHotel(data);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load hotel details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  const toggleFavorite = () => setFavorite(!favorite);

  // In the addRoom function (hotelDetails page):
  const addRoom = (category, priceRange) => {
    const priceForStay = priceRange.price * nights; // Calculate total price for stay duration

    const newRoom = {
      categoryId: category._id,
      categoryName: category.categoryName,
      description: category.categoryDetails,
      images: category.images,
      amenities: category.amenities,
      price: priceForStay, // Now storing total price for the stay
      pricePerNight: priceRange.price, // Keep original price per night
      taxes: priceRange.taxes,
      discountPercent: priceRange.discountPercent,
      dates: priceRange.dates,
      adultCount: category.adultCount, // Max adults allowed
      childCount: category.childCount, // Max children allowed
      roomId: `room-${category._id}-${Date.now()}`,
      roomType: category.categoryName,
      roomTypeId: category._id,
      roomNumber: `RN-${Date.now()}-${category._id}`,
      nights: nights, // Add nights to room data
    };
    setSelectedRooms([...selectedRooms, newRoom]);
  };

  const removeRoom = (index) => {
    const newRooms = [...selectedRooms];
    newRooms.splice(index, 1);
    setSelectedRooms(newRooms);
  };

  const toggleDescription = (roomId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const handleContinue = () => {
    if (selectedRooms.length === 0) {
      Modal.error({
        title: "No Rooms Selected",
        content: "Please select at least one room to continue",
      });
      return;
    }

    const bookingPayload = {
      selectedRooms,
      hotelName: hotel.name,
      hotelId: hotelId,
      checkInDate: searchCriteria.checkIn.format("YYYY-MM-DD"),
      checkOutDate: searchCriteria.checkOut.format("YYYY-MM-DD"),
      nights: nights,
      adults: searchCriteria.adults,
      timestamp: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("bookingData", JSON.stringify(bookingPayload));

      if (!user) {
        const modalInstance = Modal.confirm({
          title: "Login Required",
          content:
            "You need to login to proceed with booking. Do you want to login now?",
          okText: "Login",
          cancelText: "Cancel",
          onOk() {
            modalInstance.destroy?.();
            router.push(
              `/login?redirect=${encodeURIComponent(
                window.location.pathname + window.location.search
              )}`
            );
          },
          onCancel() {
            modalInstance.destroy?.();
            sessionStorage.removeItem("bookingData");
          },
        });
      } else {
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error saving booking data:", error);
      Modal.error({
        title: "Booking Error",
        content:
          error.message ||
          "Failed to save your booking details. Please try again.",
      });
    }
  };

  // Skeleton Loading Component
  const SkeletonLoading = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-2 w-3/4">
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>

      {/* Image Carousel Skeleton */}
      <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>

      {/* Rooms Skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-white">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3, 4].map((amenity) => (
                    <div
                      key={amenity}
                      className="h-6 bg-gray-200 rounded-full w-20"
                    ></div>
                  ))}
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="space-y-3">
                  {[1, 2].map((option) => (
                    <div
                      key={option}
                      className="border border-gray-200 rounded-lg p-3 bg-white"
                    >
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="flex justify-between">
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                          <div className="h-5 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-[#EBF0F4] min-h-screen">
        <div className="flex items-center mb-6">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            Back
          </Button>
        </div>
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="bg-white p-8 rounded-lg shadow-sm mt-6 text-center">
            <div className="text-red-500 mb-4">
              <CloseOutlined className="text-2xl" />
              <p className="mt-2">Failed to load hotel details</p>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              type="primary"
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBF0F4] min-h-screen">
      <div className="flex items-center mb-6">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          Back
        </Button>
      </div>
      <div className="max-w-6xl mx-auto p-4 font-sans">
        {/* Back Button */}
        <div className="flex items-center mb-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 font-medium"
          >
            Back to Results
          </Button>
        </div>

        {loading ? (
          <SkeletonLoading />
        ) : (
          <div className="space-y-6">
            {/* Part 1: Top Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Left Part: Slider */}
                <div className="relative h-64 md:h-80">
                  {hotel.categories && hotel.categories.length > 0 && (
                    <Carousel
                      arrows
                      prevArrow={
                        <LeftOutlined className="text-white bg-black bg-opacity-30 p-2 rounded-full" />
                      }
                      nextArrow={
                        <RightOutlined className="text-white bg-black bg-opacity-30 p-2 rounded-full" />
                      }
                      className="rounded-lg overflow-hidden h-full"
                    >
                      {hotel.categories[0].images.map((image, index) => (
                        <div key={index} className="h-full">
                          <img
                            src={image.url}
                            alt={`${hotel.name} ${index + 1}`}
                            className="w-full h-[320px] object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>

                {/* Right Part: Hotel Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-xl font-bold mb-2 text-gray-800">
                        {hotel.name}
                      </h1>
                      <div className="flex items-center text-gray-600 mb-3">
                        <StarFilled className="text-yellow-500 mr-1" />
                        <span className="mr-3 font-medium">4.5</span>
                        <EnvironmentFilled className="mr-1" />
                        <span>Cox's Bazar</span>
                      </div>
                    </div>
                    <button
                      onClick={toggleFavorite}
                      className="text-2xl hover:scale-110 transition-transform"
                      aria-label={
                        favorite ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      {favorite ? (
                        <HeartFilled className="text-red-500" />
                      ) : (
                        <HeartOutlined className="text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                  </div>

                  <Divider className="my-3" />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotel.categories && hotel.categories.length > 0 ? (
                        hotel.categories[0].amenities
                          .slice(0, 6)
                          .map((amenity, index) => (
                            <Tag
                              key={index}
                              color="blue"
                              className="flex items-center text-xs"
                            >
                              <CheckOutlined className="mr-1" />
                              {amenity}
                            </Tag>
                          ))
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No facilities listed
                        </p>
                      )}
                      {hotel.categories &&
                        hotel.categories[0]?.amenities?.length > 6 && (
                          <Tag className="text-xs">
                            +{hotel.categories[0].amenities.length - 6} more
                          </Tag>
                        )}
                    </div>
                  </div>

                  <Divider className="my-3" />

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {hotel.categories && hotel.categories.length > 0
                        ? hotel.categories[0].categoryDetails ||
                          "No description available"
                        : "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Bottom Section - Rooms */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                AVAILABLE ROOM CATEGORIES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotel.categories?.map((category) => (
                  <div
                    key={category._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white"
                  >
                    {/* Room Header */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {category.categoryName}
                      </h3>

                      {/* Room Image */}
                      <div className="h-40 rounded-lg overflow-hidden mb-3">
                        {category.images && category.images.length > 0 ? (
                          <img
                            src={category.images[0].url}
                            alt={category.categoryName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">
                              No image available
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Room Description with Read More */}
                      <div className="mb-3">
                        <p className="text-gray-600 text-sm">
                          {expandedDescriptions[category._id]
                            ? category.categoryDetails
                            : `${
                                category.categoryDetails?.substring(0, 100) ||
                                ""
                              }${
                                category.categoryDetails?.length > 100
                                  ? "..."
                                  : ""
                              }`}
                        </p>
                        {category.categoryDetails?.length > 100 && (
                          <button
                            onClick={() => toggleDescription(category._id)}
                            className="text-blue-600 text-xs mt-1 hover:text-blue-800"
                          >
                            {expandedDescriptions[category._id]
                              ? "Show less"
                              : "Read more"}
                          </button>
                        )}
                      </div>

                      {/* Room Amenities */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-sm text-gray-700">
                          Room Amenities:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.amenities &&
                          category.amenities.length > 0 ? (
                            category.amenities
                              .slice(0, 4)
                              .map((amenity, index) => (
                                <span
                                  key={index}
                                  className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                                >
                                  <CheckOutlined className="text-green-500 mr-1 text-xs" />
                                  {amenity}
                                </span>
                              ))
                          ) : (
                            <span className="text-xs text-gray-500">
                              No amenities listed
                            </span>
                          )}
                          {category.amenities &&
                            category.amenities.length > 4 && (
                              <span className="text-xs text-gray-500">
                                +{category.amenities.length - 4} more
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Room Capacity */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-sm text-gray-700">
                          Capacity:
                        </h4>
                        <div className="flex gap-4 text-xs">
                          <span className="text-gray-600">
                            Adults: {category.adultCount}
                          </span>
                          <span className="text-gray-600">
                            Children: {category.childCount}
                          </span>
                        </div>
                      </div>

                      {/* Price Ranges */}
                      <div className="space-y-3">
                        {category.priceRanges &&
                        category.priceRanges.length > 0 ? (
                          category.priceRanges.map((priceRange, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-3 bg-white hover:border-blue-200 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium text-sm mr-2 text-gray-800">
                                      {new Date(
                                        priceRange.dates[0]
                                      ).toLocaleDateString()}{" "}
                                      -{" "}
                                      {new Date(
                                        priceRange.dates[1]
                                      ).toLocaleDateString()}
                                    </h4>
                                  </div>
                                </div>
                              </div>

                              {priceRange.discountPercent && (
                                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
                                  {priceRange.discountPercent}% off
                                </div>
                              )}

                              <div className="flex justify-between items-end">
                                <div>
                                  <p className="text-xs text-gray-500 line-through">
                                    BDT{" "}
                                    {Math.round(
                                      priceRange.price /
                                        (1 - priceRange.discountPercent / 100)
                                    ).toLocaleString()}
                                  </p>
                                  <p className="text-base font-bold text-gray-800">
                                    BDT{" "}
                                    {priceRange.price?.toLocaleString() || "0"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    + BDT{" "}
                                    {priceRange.taxes?.toLocaleString() || "0"}{" "}
                                    taxes & fees
                                  </p>
                                </div>
                                <button
                                  onClick={() => addRoom(category, priceRange)}
                                  className="bg-[#FACC48] hover:bg-[#e6c042] text-[#061A6E] px-3 py-1 rounded font-medium transition-colors text-xs shadow-sm"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No pricing available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Rooms Summary */}
            {selectedRooms.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 sticky bottom-4 z-10 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Booking Summary
                  </h3>
                  <button className="text-blue-600 flex items-center text-sm hover:text-blue-800">
                    <PrinterOutlined className="mr-1" /> Print Summary
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto pr-2">
                  {selectedRooms.map((room, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                            {room.images && room.images.length > 0 ? (
                              <img
                                src={room.images[0].url}
                                alt={room.categoryName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-800">
                              {room.categoryName}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {new Date(room.dates[0]).toLocaleDateString()} -{" "}
                              {new Date(room.dates[1]).toLocaleDateString()}
                            </p>
                            {room.discountPercent && (
                              <p className="text-xs text-blue-600 mt-1">
                                {room.discountPercent}% discount
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-gray-800">
                            BDT {room.price?.toLocaleString() || "0"}
                          </p>
                          <p className="text-xs text-gray-500">
                            + BDT {room.taxes?.toLocaleString() || "0"} taxes
                          </p>
                          <button
                            onClick={() => removeRoom(index)}
                            className="text-red-500 text-xs mt-1 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">
                      {selectedRooms.length}{" "}
                      {selectedRooms.length > 1 ? "rooms" : "room"} selected
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      Total: BDT{" "}
                      {selectedRooms
                        .reduce(
                          (sum, room) =>
                            sum + (room.price || 0) + (room.taxes || 0),
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="bg-[#FACC48] hover:bg-[#e6c042] text-[#061A6E] px-6 py-2 rounded font-medium transition-colors shadow-md"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function HotelsDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#EBF0F4] min-h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <HotelsDetailsContent />
    </Suspense>
  );
}
