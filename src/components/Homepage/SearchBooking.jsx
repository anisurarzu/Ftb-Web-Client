"use client";
import React, { useState } from "react";
import { DatePicker, Select, Button } from "antd";
import { motion } from "framer-motion";
import Head from "next/head";

const { Option } = Select;

export default function SearchBookingSection() {
  const [hotelList, setHotelList] = useState("");

  return (
    <div className="absolute bottom-8 w-full flex justify-center px-4 md:px-2 pt-8 md:pt-2 lg:pt-0 xl:pt-0">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center bg-white bg-opacity-30 rounded-lg p-4 max-w-4xl w-full">
        {/* Date Fields Row - Always in row layout */}
        <div className="flex flex-nowrap gap-4 w-full sm:w-auto">
          <DatePicker
            className="p-2 text-[#52C0C2] text-sm rounded-md focus:outline-none flex-1 min-w-[150px] sm:w-[210px]"
            placeholder="Check-in"
          />
          <DatePicker
            className="p-2 text-[#52C0C2] text-sm rounded-md focus:outline-none flex-1 min-w-[150px] sm:w-[210px]"
            placeholder="Check-out"
          />
        </div>

        {/* Hotel List Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full sm:w-auto flex-1">
          <Select
            className="no-border-select rounded-md p-2 h-[38px] w-full sm:w-[210px]"
            value={hotelList || undefined}
            onChange={(value) => setHotelList(value)}
            style={{ backgroundColor: "white" }}
            placeholder="Select Hotel">
            <Option value="Hotel1">Hotel 1</Option>
            <Option value="Hotel2">Hotel 2</Option>
            <Option value="Hotel3">Hotel 3</Option>
          </Select>
        </motion.div>

        {/* Search Button */}
        <Button
          type="primary"
          className="text-sm p-2 h-[38px] w-full sm:w-[150px] rounded-2xl bg-[#71D2D3] text-white border-none shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          Search
        </Button>
      </div>
    </div>
  );
}
