import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-14 bg-gray-200">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Welcome to{" "}
          <span className=" bg-teal-600  bg-clip-text text-transparent">
            FastTrack Booking
          </span>
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
          Your Gateway to Luxury Stays
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-8 text-center max-w-2xl mx-auto">
          At <span className="font-semibold text-teal-600">FastTrack Booking</span>, we redefine hospitality with our four exquisite hotels:{" "}
          <span className="font-semibold">Mermaid</span>,{" "}
          <span className="font-semibold">Sea Paradise</span>,{" "}
          <span className="font-semibold">Shopno Bilash</span>, and{" "}
          <span className="font-semibold">Somudra Bari</span>. Each property is designed to offer a unique blend of luxury, comfort, and unforgettable experiences. Whether youre planning a romantic getaway, a family vacation, or a business trip, we have the perfect stay for you.
        </p>
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-gray-700 text-center">
            Discover Our Hotels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h4 className="text-lg font-semibold text-teal-600 mb-3">
                Mermaid
              </h4>
              <p className="text-gray-600 text-sm">
                A serene beachfront retreat with stunning ocean views and world-class amenities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h4 className="text-lg font-semibold text-teal-600 mb-3">
                Sea Paradise
              </h4>
              <p className="text-gray-600 text-sm">
                Nestled in nature, this hotel offers tranquility and luxury for a perfect escape.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h4 className="text-lg font-semibold text-teal-600 mb-3">
                Shopno Bilash
              </h4>
              <p className="text-gray-600 text-sm">
                A family-friendly destination with spacious rooms and fun activities for all ages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h4 className="text-lg font-semibold text-teal-600 mb-3">
                Somudra Bari
              </h4>
              <p className="text-gray-600 text-sm">
                Experience coastal charm with modern comforts and exceptional hospitality.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className=" bg-teal-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-teal-400 transition-all duration-300 transform hover:scale-105 shadow-sm">
            Book Your Stay Now
          </button>
        </div>
      </div>
    </div>
  );
}