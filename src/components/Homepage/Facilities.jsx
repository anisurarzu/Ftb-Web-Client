"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome, // For Apartment
  FaHotel, // For Hotel
  FaUmbrellaBeach, // For Resort
  FaTh, // For Others
  FaSwimmingPool, // For Swimming Pool
  FaWater, // For Sea View
  FaMountain, // For Hill View
  FaMapMarkerAlt, // For Prime Location
  FaChevronLeft, // Left arrow
  FaChevronRight, // Right arrow
} from "react-icons/fa";

// Facility Bar Items
const facilityBarItems = [
  {
    label: "Apartment",
    key: "apartment",
    icon: <FaHome />,
  },
  {
    label: "Hotel",
    key: "hotel",
    icon: <FaHotel />,
  },
  {
    label: "Resort",
    key: "resort",
    icon: <FaUmbrellaBeach />,
  },
  {
    label: "Swimming Pool",
    key: "swimmingPool",
    icon: <FaSwimmingPool />,
  },
  {
    label: "Sea View",
    key: "seaView",
    icon: <FaWater />,
  },
  {
    label: "Hill View",
    key: "hillView",
    icon: <FaMountain />,
  },
  {
    label: "Prime Location",
    key: "primeLocation",
    icon: <FaMapMarkerAlt />,
  },
  {
    label: "Others",
    key: "others",
    icon: <FaTh />,
  },
];

export default function Facilities() {
  const [current, setCurrent] = useState("apartment"); // State for selected facility
  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  // Handle facility item click
  const handleFacilityClick = (key) => {
    setCurrent(key);
  };

  // Scroll left by one item
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemWidth =
        scrollContainerRef.current.querySelector("button").offsetWidth; // Get width of one item
      scrollContainerRef.current.scrollBy({
        left: -itemWidth, // Scroll left by one item width
        behavior: "smooth",
      });
    }
  };

  // Scroll right by one item
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemWidth =
        scrollContainerRef.current.querySelector("button").offsetWidth; // Get width of one item
      scrollContainerRef.current.scrollBy({
        left: itemWidth, // Scroll right by one item width
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Facility Bar with Navigation Arrows */}

        {/* Facilities Section */}
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Facilities
        </motion.h2>

        <motion.div
          className="h-1 w-16 bg-teal-500 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="relative mb-4">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>

          {/* Scrollable Facility Bar */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 px-10"
          >
            {facilityBarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleFacilityClick(item.key)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg w-32 h-24 ${
                  current === item.key
                    ? "bg-teal-500 text-white"
                    : "bg-white text-gray-800"
                } hover:bg-teal-500 hover:text-white transition-all`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="mt-2 text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
          >
            <FaChevronRight className="text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
