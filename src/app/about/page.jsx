"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeHotel, setActiveHotel] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Demo images
  const demoImages = {
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    about:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    hotels: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719471380-cd82d1776fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
  };

  const hotels = [
    {
      name: "Mermaid",
      description:
        "A serene beachfront retreat with stunning ocean views and world-class amenities.",
      tagline: "Where the sea meets luxury",
    },
    {
      name: "Sea Paradise",
      description:
        "Nestled in nature, this hotel offers tranquility and luxury for a perfect escape.",
      tagline: "Your private slice of heaven",
    },
    {
      name: "Shopno Bilash",
      description:
        "A family-friendly destination with spacious rooms and fun activities for all ages.",
      tagline: "Making family memories",
    },
    {
      name: "Somudra Bari",
      description:
        "Experience coastal charm with modern comforts and exceptional hospitality.",
      tagline: "The ocean welcomes you home",
    },
  ];

  const SkeletonLoader = ({ className }) => (
    <div
      className={`bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-[#061A6E] text-white pb-20 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={demoImages.hero}
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isLoading ? (
            <>
              <SkeletonLoader className="h-12 w-80 mx-auto mb-8 rounded-full" />
              <SkeletonLoader className="h-8 w-96 mx-auto mb-12 rounded-full" />
            </>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6 font-['Poppins']">
                Welcome to{" "}
                <span className="text-cyan-300">Fast Track Booking</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold font-['Poppins']">
                  Book Easy! Stay Happy!
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl max-w-4xl mx-auto leading-relaxed font-['Inter']">
                Your dream vacation starts here. Fast Track Booking is your
                ultimate travel partner for seamless hotel reservations across
                Bangladesh.
              </motion.p>
            </>
          )}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* About Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {isLoading ? (
            <>
              <SkeletonLoader className="h-96 w-full rounded-2xl" />
              <div className="space-y-6">
                <SkeletonLoader className="h-8 w-48 rounded-full" />
                <SkeletonLoader className="h-4 w-full rounded-full" />
                <SkeletonLoader className="h-4 w-5/6 rounded-full" />
                <SkeletonLoader className="h-4 w-4/5 rounded-full" />
                <SkeletonLoader className="h-4 w-full rounded-full" />
                <SkeletonLoader className="h-12 w-40 rounded-full mt-8" />
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={demoImages.about}
                  alt="About Fast Track Booking"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#061A6E] to-transparent opacity-30"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                <h3 className="text-3xl font-bold text-[#061A6E] mb-6 font-['Poppins']">
                  Our Story
                </h3>
                <div className="space-y-4 text-gray-700 font-['Inter']">
                  <p className="text-lg leading-relaxed">
                    Founded with a vision to transform travel in Bangladesh, FTB
                    offers access to accommodations from budget-friendly to
                    luxury resorts — all at your fingertips.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our platform combines easy booking with secure payments and
                    24/7 support for a seamless experience every time.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We partner only with verified hotels and provide authentic
                    reviews so you can book with confidence.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 bg-[#061A6E] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                  Learn More About Us
                </motion.button>
              </motion.div>
            </>
          )}
        </section>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#061A6E] text-white rounded-2xl p-12 shadow-xl mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-8">
              <svg
                className="w-16 h-16 text-cyan-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
              Our Mission
            </h3>
            <p className="text-xl md:text-2xl opacity-90 font-['Inter'] leading-relaxed">
              {`To revolutionize travel in Bangladesh through effortless booking,
              trusted accommodations, and exceptional service that turns every
              trip into a memorable journey.`}
            </p>
          </div>
        </motion.div>

        {/* Hotels Section */}
        <section className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-6 font-['Poppins']">
            Discover Our Hotels
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto font-['Inter']">
            Each property offers a unique blend of luxury, comfort, and
            unforgettable experiences.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array(4)
                  .fill()
                  .map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-4">
                      <SkeletonLoader className="h-60 w-full rounded-2xl" />
                      <SkeletonLoader className="h-6 w-3/4 rounded-full" />
                      <SkeletonLoader className="h-4 w-full rounded-full" />
                    </motion.div>
                  ))
              : hotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                    onClick={() => setActiveHotel(index)}>
                    <div className="relative h-60">
                      <Image
                        src={demoImages.hotels[index]}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h4 className="text-2xl font-bold mb-1 font-['Poppins']">
                        {hotel.name}
                      </h4>
                      <p className="text-sm opacity-90 font-['Inter']">
                        {hotel.tagline}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                      <button className="bg-white text-[#061A6E] px-6 py-2 rounded-full font-medium shadow-md">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20">
          <div className="bg-[#061A6E] rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6 font-['Poppins']">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto font-['Inter']">
              Book with Fast Track Booking today and experience travel made
              simple.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#061A6E] px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Book Your Stay Now
            </motion.button>
          </div>
          <p className="mt-8 text-gray-600 font-['Inter']">
            Fast Track Booking — your ultimate travel partner.
          </p>
        </motion.section>
      </div>

      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {activeHotel !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveHotel(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative h-64 md:h-80">
                <Image
                  src={demoImages.hotels[activeHotel]}
                  alt={hotels[activeHotel].name}
                  fill
                  className="object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                  onClick={() => setActiveHotel(null)}>
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-[#061A6E] mb-2 font-['Poppins']">
                  {hotels[activeHotel].name}
                </h3>
                <p className="text-lg text-cyan-600 mb-6 font-['Inter']">
                  {hotels[activeHotel].tagline}
                </p>
                <p className="text-gray-700 mb-6 font-['Inter']">
                  {hotels[activeHotel].description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#061A6E] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-600 font-['Inter']">
                      Beachfront Location
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#061A6E] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <span className="text-gray-600 font-['Inter']">
                      Luxury Amenities
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#061A6E] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <span className="text-gray-600 font-['Inter']">
                      24/7 Room Service
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#061A6E] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-600 font-['Inter']">
                      Flexible Booking
                    </span>
                  </div>
                </div>
                <button className="w-full bg-[#061A6E] text-white py-3 rounded-lg font-semibold hover:bg-[#0d2b9e] transition-colors font-['Inter']">
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
