"use client";
import React, { useState } from "react";
import { DatePicker, Select, Button, notification, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function ProfessionalHotelSearch() {
  const router = useRouter();
  const [location] = useState("Cox's Bazar"); // Set default and make it constant
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [loading, setLoading] = useState(false);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const fetchAvailableHotels = async () => {
    if (!checkInDate || !checkOutDate) {
      notification.error({
        message: "Missing Fields",
        description: "Please select check-in and check-out dates.",
        placement: "topRight",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prepare search parameters for URL
      const searchParams = new URLSearchParams({
        location,
        checkIn: checkInDate.format("YYYY-MM-DD"),
        checkOut: checkOutDate.format("YYYY-MM-DD"),
        adults: adults.toString(),
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
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
         
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Location Field - Disabled with Cox's Bazar */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                DESTINATION
              </label>
              <Select
                className="w-full h-14 text-base"
                value={location}
                size="large"
                disabled
                style={{ background: "#f8fafc" }}>
                <Option value="Cox's Bazar">Cox's Bazar</Option>
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
                format="DD MMM YYYY"
                disabledDate={disabledDate}
                style={{ background: checkInDate ? "#f8fafc" : "#fff" }}
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
                format="DD MMM YYYY"
                disabledDate={disabledDate}
                style={{ background: checkOutDate ? "#f8fafc" : "#fff" }}
              />
            </div>

            {/* Guests (Adults only) */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[#061A6E] mb-1">
                GUESTS
              </label>
              <Select
                className="w-full h-14 text-base"
                placeholder="Select guests"
                size="large"
                value={`${adults} Adult${adults > 1 ? "s" : ""}`}
                onChange={setAdults}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Option key={num} value={num}>
                    {num} Adult{num > 1 ? "s" : ""}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto flex-1 lg:flex-none">
              <Button
                type="primary"
                size="large"
                onClick={fetchAvailableHotels}
                className="w-full h-14 text-base bg-[#FACC48] hover:bg-[#f8d974] text-[#061A6E] font-bold border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                loading={loading}>
                <span className="text-[16px]">SEARCH HOTELS</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}