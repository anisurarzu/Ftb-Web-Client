"use client";
import React, { useState, Suspense } from "react";
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
} from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { Carousel, Collapse, Divider, Button, Modal } from "antd";
import SearchBooking2 from "@/components/Homepage/SearchBooking2";
import { useAuth } from "@/context/AuthContext";

const { Panel } = Collapse;

// Main content component that uses useSearchParams
const HotelsDetailsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [searchCriteria] = useState({
    location: searchParams.get("location") || "Cox's Bazar",
    checkIn: searchParams.get("checkIn")
      ? dayjs(searchParams.get("checkIn"))
      : dayjs(),
    checkOut: searchParams.get("checkOut")
      ? dayjs(searchParams.get("checkOut"))
      : dayjs().add(1, "day"),
    rooms: parseInt(searchParams.get("rooms") || 1),
    adults: parseInt(searchParams.get("adults") || 2),
    children: parseInt(searchParams.get("children") || 0),
  });

  const { user } = useAuth();

  // Sample hotel data - replace with your actual data source
  const hotel = {
    id: 1,
    name: "Samudra Bari",
    location: "Kalatoli, Cox's Bazar, Bangladesh",
    rating: 4.2,
    images: [
      "https://i.ibb.co.com/rKFwNNhQ/SB-Front-side.jpg",
      "https://i.ibb.co.com/846gxKts/SB-Front-Desk.jpg",
      "https://i.ibb.co.com/JF8jL992/SB-Roof-Top.jpg",
    ],
    roomTypes: [
      {
        id: 1,
        name: "2 Bed Apartment",
        description: "2 King Bed, Maximum Room Capacity: 6",
        images: [
          "https://i.ibb.co.com/tPx5Xfk1/SB-Living-Room-1.jpg ",
          "https://i.ibb.co.com/YzxBDRg/SB-Bedroom-1.jpg",
        ],
        amenities: ["Ceiling Fan", "Air Conditioning", "Toiletries", "Wi-Fi"],
        options: [
          {
            id: 1,
            type: "Non-Refundable",
            breakfast: false,
            adults: 2,
            description: "NO Complimentary BREAKFAST - Non refundable",
            price: 5138,
            originalPrice: 14230,
            discountPercent: 63,
            taxes: 1361,
            discount: "Extra 5% discount for bKash payment.",
            cancellation: "No cancellation",
          },
          {
            id: 2,
            type: "Refundable",
            breakfast: true,
            adults: 2,
            description:
              "Complimentary buffet breakfast with unlimited swimming pool & airport transfer",
            price: 6719,
            originalPrice: 14230,
            taxes: 1780,
            cancellation: "Free cancellation before 00:01 on Nov. 12 May 2025",
          },
        ],
      },
      {
        id: 2,
        name: "3 Bed Apartment",
        description: "3 King Bed, Maximum Room Capacity: 6",
        images: [
          "https://i.ibb.co.com/YzxBDRg/SB-Bedroom-2.jpg",
          "https://i.ibb.co.com/twQftC26/SB-Bedroom-3.jpg",
        ],
        amenities: ["Ceiling Fan", "Air Conditioning", "Toiletries", "Wi-Fi"],
        options: [
          {
            id: 1,
            type: "Non-Refundable",
            breakfast: false,
            adults: 2,
            description: "NO Complimentary BREAKFAST - Non refundable",
            price: 5138,
            originalPrice: 14230,
            discountPercent: 63,
            taxes: 1361,
            discount: "Extra 5% discount for bKash payment.",
            cancellation: "No cancellation",
          },
          {
            id: 2,
            type: "Refundable",
            breakfast: true,
            adults: 2,
            description:
              "Complimentary buffet breakfast with unlimited swimming pool & airport transfer",
            price: 6719,
            originalPrice: 14230,
            taxes: 1780,
            cancellation: "Free cancellation before 00:01 on Nov. 12 May 2025",
          },
        ],
      },
    ],
    whatsNearby: [{ name: "Paluarick Sea Beach", distance: "4.1 km" }],
    facilities: ["Clothes Diver", "Large Vehicle Parking"],
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
  };

  const nights = searchCriteria.checkOut.diff(searchCriteria.checkIn, "day");

  const toggleFavorite = () => setFavorite(!favorite);

  const addRoom = (roomOption, roomType) => {
    const newRoom = {
      ...roomOption,
      roomType: roomType.name,
      roomTypeId: roomType.id,
      roomId: `room-${roomType.id}-${roomOption.id}`,
      roomImages: roomType.images,
      description: roomType.description,
      amenities: roomType.amenities,
      roomNumber: `RN-${Date.now()}-${roomType.id}`,
      price: roomOption.price,
      taxes: roomOption.taxes,
    };
    setSelectedRooms([...selectedRooms, newRoom]);
  };

  const removeRoom = (index) => {
    const newRooms = [...selectedRooms];
    newRooms.splice(index, 1);
    setSelectedRooms(newRooms);
  };

  const toggleRoomExpand = (roomId) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
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
      selectedRooms: selectedRooms.map((room) => ({
        roomTypeId: room.roomTypeId,
        roomType: room.roomType,
        roomId: room.roomId,
        roomNumber: room.roomNumber,
        price: room.price,
        description: room.description,
        images: room.roomImages,
        amenities: room.amenities,
        optionType: room.type,
        taxes: room.taxes,
      })),
      hotelName: hotel.name,
      hotelId: hotel.id,
      checkInDate: searchCriteria.checkIn.format("YYYY-MM-DD"),
      checkOutDate: searchCriteria.checkOut.format("YYYY-MM-DD"),
      nights: nights,
      adults: searchCriteria.adults,
      children: searchCriteria.children,
      timestamp: new Date().toISOString(),
    };

    try {
      const requiredFields = [
        "selectedRooms",
        "hotelName",
        "hotelId",
        "checkInDate",
        "checkOutDate",
        "nights",
      ];

      const missingFields = requiredFields.filter(
        (field) => !bookingPayload[field]
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

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
            router.push("/login?redirect=/checkout");
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

  if (loading) {
    return (
      <div className="bg-[#EBF0F4] min-h-screen">
        <div className="max-w-6xl mx-auto p-4 font-sans">
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
          <div className="bg-white p-8 rounded-lg shadow-sm mt-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Hotel Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
          {/* Hotel Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center text-gray-600">
                  <StarFilled className="text-yellow-500 mr-1" />
                  <span className="mr-3">{hotel.rating}</span>
                  <EnvironmentFilled className="mr-1" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className="text-2xl text-red-500">
                {favorite ? <HeartFilled /> : <HeartOutlined />}
              </button>
            </div>
          </div>

          {/* Main Hotel Image Carousel */}
          <div className="relative mb-8">
            <Carousel
              arrows
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
              className="rounded-lg overflow-hidden">
              {hotel.images.map((image, index) => (
                <div key={index} className="h-96">
                  <img
                    src={image}
                    alt={`${hotel.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Room Types Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">ROOMS</h2>

            {hotel.roomTypes.map((room) => (
              <div
                key={room.id}
                className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
                {/* Room Header */}
                <div
                  className="p-4 bg-white cursor-pointer"
                  onClick={() => toggleRoomExpand(room.id)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      <p className="text-gray-600">{room.description}</p>
                    </div>
                    {expandedRoom === room.id ? (
                      <UpOutlined />
                    ) : (
                      <DownOutlined />
                    )}
                  </div>
                </div>

                {/* Expanded Room Content */}
                {expandedRoom === room.id && (
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    {/* Room Image Carousel */}
                    <div className="mb-6">
                      <Carousel
                        arrows
                        prevArrow={<LeftOutlined className="text-black" />}
                        nextArrow={<RightOutlined className="text-black" />}
                        className="rounded-lg overflow-hidden">
                        {room.images.map((image, index) => (
                          <div key={index} className="h-64">
                            <img
                              src={image}
                              alt={`${room.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>

                    {/* Room Amenities */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Room Amenities:</h4>
                      <div className="flex flex-wrap gap-3">
                        {room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <CheckOutlined className="text-green-500 mr-1" />{" "}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Divider className="my-4" />

                    {/* Room Options */}
                    <div className="space-y-4">
                      {room.options.map((option) => (
                        <div
                          key={option.id}
                          className="border border-gray-200 rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium mr-2">
                                  {option.type}
                                </h4>
                                {option.type === "Non-Refundable" ? (
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    💬
                                  </span>
                                ) : (
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    💬
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <span className="mr-2">
                                  🔍 {option.adults} Adults
                                </span>
                                <span className="mr-2">|</span>
                                <span>
                                  🔍{" "}
                                  {option.breakfast
                                    ? "Breakfast Included"
                                    : "Room Only"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-2">
                            {option.description}
                          </p>

                          {option.discountPercent && (
                            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded inline-block mb-2">
                              {option.discountPercent}% off
                            </div>
                          )}

                          <div className="flex justify-between items-end">
                            <div>
                              {option.discount && (
                                <p className="text-xs text-blue-600 mb-1">
                                  *{option.discount}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 line-through">
                                Starts from BDT-
                                {option.originalPrice.toLocaleString()}
                              </p>
                              <p className="text-lg font-bold">
                                BDT {option.price.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                + BDT {option.taxes.toLocaleString()} Taxes &
                                Fees for {nights}{" "}
                                {nights > 1 ? "nights" : "night"}
                              </p>
                            </div>
                            <button
                              onClick={() => addRoom(option, room)}
                              className="bg-[#FACC48] text-[#061A6E] px-4 py-2 rounded hover:bg-[#e6c042] font-medium transition-colors text-sm">
                              Add Room
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected Rooms Summary */}
          {selectedRooms.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 sticky bottom-0 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
                <button className="text-blue-600 flex items-center text-sm">
                  <PrinterOutlined className="mr-1" /> Print Summary
                </button>
              </div>

              {selectedRooms.map((room, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 mb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                        <img
                          src={room.roomImages[0]}
                          alt={room.roomType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{room.roomType}</h4>
                        <p className="text-xs text-gray-600">{room.type}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {room.discount}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">
                        BDT {room.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        + BDT {room.taxes.toLocaleString()} Taxes & Fees
                      </p>
                      <button
                        onClick={() => removeRoom(index)}
                        className="text-red-500 text-xs mt-1">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  {selectedRooms.length}{" "}
                  {selectedRooms.length > 1 ? "rooms" : "room"} selected
                </p>
                <button
                  onClick={handleContinue}
                  className="bg-[#FACC48] text-[#061A6E] px-6 py-2 rounded hover:bg-[#e6c042] font-medium transition-colors">
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main page component with Suspense boundary
export default function HotelsDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#EBF0F4] min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading hotel details...</div>
        </div>
      }>
      <HotelsDetailsContent />
    </Suspense>
  );
}
