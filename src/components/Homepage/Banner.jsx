"use client";
import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import SearchBookingSection2 from "./SearchBooking2";

const Banner = ({ hotels }) => {
  const banners = [
    {
      title: "Welcome To Fast Track Booking",
      description:
        "Your dream vacation starts here. FTB your ultimate travel partner.",
      bgImage:
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      title: "Unwind in Style",
      description:
        "Experience luxury redefined with exclusive amenities and serene surroundings.",
      bgImage:
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      title: "Adventure Awaits",
      description:
        "Discover hidden gems and breathtaking views around the world.",
      bgImage:
        "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
    {
      title: "City Lights & Skyline Views",
      description:
        "Stay in the heart of the city with world-class hospitality.",
      bgImage:
        "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1920",
    },
  ];

  return (
    <div className="w-full relative">
      {/* Carousel Section */}
      <Carousel autoplay autoplaySpeed={6000} dots={true}>
        {banners.map((banner, index) => (
          <div key={index}>
            <motion.div
              className="h-[60vh] sm:h-[65vh] lg:h-[70vh] w-full flex items-center justify-center text-white relative"
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${banner.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}>
              <div className="text-center space-y-4 px-4 max-w-4xl w-full">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {banner.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg">
                  {banner.description}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      {/* Search Bar - Different positioning for mobile and desktop */}
      <div
        className="w-full z-10 px-4
        lg:absolute lg:bottom-0 lg:left-0 lg:transform lg:translate-y-[-10%]
        mobile:relative mobile:mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full">
          <SearchBookingSection2 hotels={hotels} />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
