"use client";
import React, { useState } from "react";
import { DatePicker, Select, Button, notification, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function ProfessionalHotelSearch() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);

  const locations = [
    { name: "Dhaka", country: "" },
    { name: "Cox's Bazar", country: "" },
    { name: "Chittagong", country: "" },
    { name: "Sylhet", country: "" },
  ];

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const fetchAvailableHotels = async () => {
    if (!location || !checkInDate || !checkOutDate) {
      notification.error({
        message: "Missing Fields",
        description: "Please fill in all required fields before searching.",
        placement: "topRight",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would make an actual API call here
      // For demo purposes, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prepare search parameters for URL
      const searchParams = new URLSearchParams({
        location,
        checkIn: checkInDate.format("YYYY-MM-DD"),
        checkOut: checkOutDate.format("YYYY-MM-DD"),
        rooms: rooms.toString(),
        adults: adults.toString(),
        children: children.toString(),
      });

      // Redirect to /hotels with search parameters
      router.push(`/hotels?${searchParams.toString()}`);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch available hotels.",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const getGuestText = () => {
    let text = `${rooms} Room${rooms > 1 ? "s" : ""}`;
    text += `, ${adults} Adult${adults > 1 ? "s" : ""}`;
    if (children > 0) {
      text += `, ${children} Child${children > 1 ? "ren" : ""}`;
    }
    return text;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#061A6E",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
          colorBorder: "#d1d5db",
          controlHeight: 48,
          colorText: "#061A6E",
        },
      }}>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Location Field */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                CITY/HOTEL/RESORT/AREA
              </label>
              <Select
                className="w-full h-14 text-base"
                placeholder="Select city or hotel"
                value={location}
                onChange={setLocation}
                showSearch
                optionFilterProp="children"
                size="large"
                dropdownStyle={{ padding: "8px", borderRadius: "8px" }}
                notFoundContent="No locations found">
                {locations.map((loc) => (
                  <Option key={loc.name} value={loc.name}>
                    <div className="flex flex-col">
                      <span className="font-medium">{loc.name}</span>
                      <span className="text-xs text-gray-500">
                        {loc.country}
                      </span>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            {/* Check-in Date */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                CHECK IN
              </label>
              <DatePicker
                className="w-full h-14 text-base"
                placeholder="Select date"
                size="large"
                value={checkInDate}
                onChange={setCheckInDate}
                format="DD MMM YY"
                disabledDate={disabledDate}
              />
            </div>

            {/* Check-out Date */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                CHECK OUT
              </label>
              <DatePicker
                className="w-full h-14 text-base"
                placeholder="Select date"
                size="large"
                value={checkOutDate}
                onChange={setCheckOutDate}
                format="DD MMM YY"
                disabledDate={disabledDate}
              />
            </div>

            {/* Rooms & Guests */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                ROOMS & GUESTS
              </label>
              <Select
                className="w-full h-14 text-base"
                placeholder="Select rooms & guests"
                size="large"
                value={getGuestText()}
                dropdownRender={() => (
                  <div className="p-2 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#061A6E] mb-1">
                        Rooms
                      </label>
                      <Select
                        className="w-full"
                        value={rooms}
                        onChange={setRooms}
                        size="middle">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <Option key={num} value={num}>
                            {num} Room{num > 1 ? "s" : ""}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#061A6E] mb-1">
                        Adults
                      </label>
                      <Select
                        className="w-full"
                        value={adults}
                        onChange={setAdults}
                        size="middle">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <Option key={num} value={num}>
                            {num} Adult{num > 1 ? "s" : ""}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#061A6E] mb-1">
                        Children
                      </label>
                      <Select
                        className="w-full"
                        value={children}
                        onChange={setChildren}
                        size="middle">
                        {[0, 1, 2, 3, 4].map((num) => (
                          <Option key={num} value={num}>
                            {num} Child{num !== 1 ? "ren" : ""}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto flex-1 lg:flex-none">
              <Button
                type="primary"
                size="large"
                onClick={fetchAvailableHotels}
                className="w-full h-14 text-base bg-[#FACC48] hover:bg-[#f8d974] text-[#061A6E] font-medium border-none shadow-md hover:shadow-lg transition-all duration-300"
                loading={loading}>
                <span className="text-[15px] font-semibold">SEARCH HOTELS</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
