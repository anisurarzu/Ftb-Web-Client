"use client";
import React, { useState, useEffect } from "react";
import { Card, Skeleton, Button, Divider, Tag } from "antd";
import {
  StarFilled,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Services from "./Services";
import FAQSection from "./Faq";
import ImageGallery from "../Commons/ImageGallery";
import WhatsApp from "@/components/WhatsApp";
import Image from "next/image";

const { Meta } = Card;

const Homepage = ({ hotels, hotelList }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Demo hotels data with gradient colors
  const demoHotels = [
    {
      id: 1,
      name: "Sea Pearl Resort",
      location: "Cox's Bazar",
      rating: 4.8,
      price: "৳12,000/night",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      amenities: ["Sea View", "Swimming Pool", "Buffet Breakfast"],
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      name: "Hill Town Resort",
      location: "Bandarban",
      rating: 4.7,
      price: "৳10,500/night",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
      amenities: ["Hill View", "Vip Jeep", "Prime Location"],
      gradient: "from-green-500 to-green-700",
    },
    {
      id: 3,
      name: "Royal Tulip",
      location: "Dhaka",
      rating: 4.5,
      price: "৳9,000/night",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      amenities: ["Luxury Hotel", "Pick & Drop", "Pool"],
      gradient: "from-purple-500 to-purple-700",
    },
    {
      id: 4,
      name: "Sundarban Retreat",
      location: "Khulna",
      rating: 4.3,
      price: "৳8,500/night",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      amenities: ["Budget Friendly", "Prime Location", "Breakfast"],
      gradient: "from-amber-500 to-amber-700",
    },
  ];

  const facilities = [
    "Sea View",
    "Hill View",
    "Pick & Drop Service",
    "Vip tourist jeep",
    "Prime Location",
    "Swimming Pool",
    "Buffet Breakfast",
    "Luxury Hotel",
    "Budget Friendly Hotel",
    "Others",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="font-sans bg-gray-50">
        {/* Skeleton for Banner */}
        <div className="h-screen bg-gray-200 animate-pulse"></div>

        {/* Skeleton for Image Gallery */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Skeleton.Input active className="w-1/4 mb-8 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton.Image key={i} active className="w-full h-64" />
              ))}
            </div>
          </div>
        </div>

        {/* Skeleton for Hotels Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Skeleton.Input active className="w-1/3 mb-8 mx-auto" />
            <Skeleton.Input active className="w-1/2 mb-12 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="shadow-sm h-[500px]">
                  <Skeleton.Image active className="w-full h-48" />
                  <Skeleton active paragraph={{ rows: 3 }} />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50">
      <Banner hotels={hotels} />
      <ImageGallery />

      {/* Featured Hotels Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-[#061A6E] mb-4">
              Featured Hotels
            </motion.h2>
            <Divider className="w-32 mx-auto bg-[#061A6E] h-1" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Discover our carefully selected premium accommodations across
              Bangladesh
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoHotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="h-full">
                <Card
                  hoverable
                  className="shadow-lg border-0 rounded-lg overflow-hidden h-full flex flex-col"
                  cover={
                    <div className="relative h-48">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${hotel.gradient} to-transparent opacity-30`}></div>
                    </div>
                  }>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center bg-[#061A6E] text-white px-2 py-1 rounded">
                        <StarFilled className="text-yellow-300 mr-1" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <EnvironmentOutlined className="mr-2" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.map((amenity, index) => (
                        <Tag
                          key={index}
                          className="text-xs bg-gray-100 border-0">
                          {amenity}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[#061A6E] flex items-center">
                      <DollarOutlined className="mr-1" />
                      {hotel.price}
                    </span>
                    <Button
                      type="primary"
                      className="bg-[#061A6E] hover:bg-[#0d2b9e]">
                      Book Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#061A6E]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-[#061A6E] mb-4">
              Our Facilities
            </motion.h2>
            <Divider className="w-32 mx-auto bg-[#061A6E] h-1" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="bg-[#061A6E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && (
                    <EnvironmentOutlined className="text-2xl text-[#061A6E]" />
                  )}
                  {index === 1 && (
                    <i className="fas fa-mountain text-2xl text-[#061A6E]"></i>
                  )}
                  {index === 2 && (
                    <CarOutlined className="text-2xl text-[#061A6E]" />
                  )}
                  {index === 3 && (
                    <i className="fas fa-car text-2xl text-[#061A6E]"></i>
                  )}
                  {index === 4 && (
                    <i className="fas fa-map-marker-alt text-2xl text-[#061A6E]"></i>
                  )}
                  {index === 5 && (
                    <i className="fas fa-swimming-pool text-2xl text-[#061A6E]"></i>
                  )}
                  {index === 6 && (
                    <CoffeeOutlined className="text-2xl text-[#061A6E]" />
                  )}
                  {index === 7 && (
                    <StarFilled className="text-2xl text-[#061A6E]" />
                  )}
                  {index === 8 && (
                    <i className="fas fa-wallet text-2xl text-[#061A6E]"></i>
                  )}
                  {index === 9 && (
                    <i className="fas fa-ellipsis-h text-2xl text-[#061A6E]"></i>
                  )}
                </div>
                <h3 className="font-medium text-[#061A6E]">{facility}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <WhatsApp />
    </div>
  );
};

export default Homepage;
