"use client";
import React from "react";
import { Button, Carousel } from "antd";
import { motion } from "framer-motion";
import SearchBookingSection2 from "./SearchBooking2";

const Banner = ({ hotels }) => {
  const banners = [
    {
      title: "Welcome To Fast Track Booking",
      description:
        "Your dream vacation starts here. FTB your ultimate travel partner.",
      bgImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "bg-gradient-to-r from-[#061A6E]/90 to-[#0d2b9e]/70",
    },
    {
      title: "Unwind in Style",
      description:
        "Experience luxury redefined with exclusive amenities and serene surroundings.",
      bgImage:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "bg-gradient-to-r from-[#061A6E]/80 to-[#3a56b4]/60",
    },
    {
      title: "Adventure Awaits",
      description:
        "Discover hidden gems and breathtaking views around Bangladesh.",
      bgImage:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      gradient: "bg-gradient-to-r from-[#061A6E]/70 to-[#5a6ec4]/50",
    },
    {
      title: "Prime Locations & Comfort",
      description:
        "Stay in the heart of the city with world-class hospitality.",
      bgImage:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "bg-gradient-to-r from-[#061A6E]/80 to-[#7a8ed4]/60",
    },
  ];

  return (
    <div className="w-full relative">
      {/* Carousel Section */}
      <Carousel
        autoplay
        autoplaySpeed={6000}
        dots={true}
        dotPosition="bottom"
        className="overflow-hidden">
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            {/* Background Image with Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.bgImage})` }}
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 ${banner.gradient}`} />

            {/* Content */}
            <motion.div
              className="h-[60vh] sm:h-[65vh] lg:h-[80vh] w-full flex items-center justify-center text-white relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}>
              <div className="text-center space-y-6 px-4 max-w-4xl w-full">
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}>
                  {banner.title}
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl font-light max-w-2xl mx-auto"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}>
                  {banner.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-[#061A6E] hover:bg-gray-100 border-none px-8 h-12 font-bold">
                    Explore Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      {/* Search Bar - Positioned differently for mobile and desktop */}
      <div
        className="w-full z-10 px-4
          lg:absolute lg:bottom-0 lg:left-0 lg:transform lg:translate-y-1/2
          mobile:relative mobile:mt-4 mobile:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-full max-w-6xl mx-auto">
          <SearchBookingSection2 hotels={hotels} />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
