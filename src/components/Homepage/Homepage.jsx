"use client";
import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import Services from "./Services";
import Facilities from "./Facilities";
import FAQSection from "./Faq";
import ImageGallery from "../Commons/ImageGallery";
import WhatsApp from "@/components/WhatsApp";
import Image from "next/image";

const Homepage = ({ hotels, hotelList }) => {
  const [isLoading, setIsLoading] = useState(true);
  const demoImages = {
    luxuryRoom:
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    gourmetDining:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    spaService:
      "https://images.pexels.com/photos/3362433/pexels-photo-3362433.jpeg",
    concierge:
      "https://images.pexels.com/photos/7601666/pexels-photo-7601666.jpeg",
    eventSpace:
      "https://images.pexels.com/photos/274131/pexels-photo-274131.jpeg",
    transportation:
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="font-sans">
        {/* Skeleton for Banner */}
        <div className="h-screen bg-gray-100 animate-pulse"></div>

        {/* Skeleton for Image Gallery */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8 mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Skeleton for Services Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-12 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Banner hotels={hotels} />
      <ImageGallery />

      {/* Premium Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-200"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-100"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6 font-playfair tracking-tight leading-tight">
              <span className="font-normal text-blue-800">Exquisite</span>{" "}
              Hospitality Services
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
            <p className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
              Indulge in our carefully curated collection of premium services,
              where every detail is designed to elevate your stay into an
              unforgettable experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Luxury Accommodations",
                description:
                  "Immerse yourself in our elegantly appointed rooms and suites, featuring plush bedding, designer furnishings, and breathtaking views.",
                image: demoImages.luxuryRoom,
                alt: "Luxury hotel room with elegant decor",
              },
              {
                title: "Gourmet Dining",
                description:
                  "Savor culinary masterpieces crafted by our award-winning chefs, featuring locally-sourced ingredients and global flavors.",
                image: demoImages.gourmetDining,
                alt: "Elegant dining setting with gourmet food",
              },
              {
                title: "Serene Spa Retreat",
                description:
                  "Rejuvenate your senses with our holistic treatments in our tranquil spa sanctuary, featuring premium skincare products.",
                image: demoImages.spaService,
                alt: "Luxury spa treatment room",
              },
              {
                title: "Personal Concierge",
                description:
                  "Our dedicated team is available around the clock to fulfill your every request and create bespoke experiences.",
                image: demoImages.concierge,
                alt: "Professional concierge assisting guests",
              },
              {
                title: "Grand Event Venues",
                description:
                  "Host unforgettable events in our exquisite ballrooms and outdoor spaces, with customized catering and decor services.",
                image: demoImages.eventSpace,
                alt: "Elegant hotel event space",
              },
              {
                title: "Private Transfers",
                description:
                  "Travel in style with our luxury vehicle fleet, including airport transfers and personalized city tours.",
                image: demoImages.transportation,
                alt: "Luxury vehicle for hotel guests",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-4 font-playfair tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed tracking-wide">
                    {service.description}
                  </p>
                  <button className="mt-6 text-blue-700 hover:text-blue-900 font-light flex items-center transition-colors tracking-wide">
                    Discover more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Facilities />
      <Services hotelList={hotelList} />
      <FAQSection />
      <WhatsApp />
    </div>
  );
};

export default Homepage;
