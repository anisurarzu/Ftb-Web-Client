import React from "react";
import { FaUmbrellaBeach, FaTree, FaHome, FaWater } from "react-icons/fa"; // Import icons from react-icons

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-200 py-14 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-8">
          Our Services at{" "}
          <span className="text-teal-600">FastTrack Booking</span>
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-12 text-center max-w-2xl mx-auto">
          Discover the perfect stay with our four luxurious hotels:{" "}
          <span className="font-semibold">Mermaid</span>,{" "}
          <span className="font-semibold">Sea Paradise</span>,{" "}
          <span className="font-semibold">Shopno Bilash</span>, and{" "}
          <span className="font-semibold">Somudra Bari</span>. Each hotel offers
          unique experiences tailored to your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <FaUmbrellaBeach className="text-3xl text-teal-600" />{" "}
              {/* Icon */}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Mermaid
            </h2>
            <p className="text-gray-600 text-xs">
              A serene beachfront retreat with stunning ocean views and
              world-class amenities.
            </p>
            <ul className="text-gray-600 text-xs text-left list-disc list-inside mt-4">
              <li>Private beach access</li>
              <li>Luxury spa services</li>
              <li>Fine dining restaurants</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <FaTree className="text-3xl text-teal-600" /> {/* Icon */}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sea Paradise
            </h2>
            <p className="text-gray-600 text-xs">
              Nestled in nature, this hotel offers tranquility and luxury for a
              perfect escape.
            </p>
            <ul className="text-gray-600 text-xs text-left list-disc list-inside mt-4">
              <li>Nature trails and hiking</li>
              <li>Infinity pool with mountain views</li>
              <li>Organic farm-to-table dining</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <FaHome className="text-3xl text-teal-600" /> {/* Icon */}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shopno Bilash
            </h2>
            <p className="text-gray-600 text-xs">
              A family-friendly destination with spacious rooms and fun
              activities for all ages.
            </p>
            <ul className="text-gray-600 text-xs text-left list-disc list-inside mt-4">
              <li>Kids play area and activities</li>
              <li>Family suites with kitchenettes</li>
              <li>Evening entertainment and bonfires</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <FaWater className="text-3xl text-teal-600" /> {/* Icon */}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Somudra Bari
            </h2>
            <p className="text-gray-600 text-xs">
              Experience coastal charm with modern comforts and exceptional
              hospitality.
            </p>
            <ul className="text-gray-600 text-xs text-left list-disc list-inside mt-4">
              <li>Beachfront cabanas</li>
              <li>Water sports and activities</li>
              <li>Seafood specialties at the on-site restaurant</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">CONTACT US</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us for personalized
            support and bookings.
          </p>
          <button className="bg-teal-600 text-white px-8 py-2 rounded-full text-base font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
