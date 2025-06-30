"use client";
import React from "react";
import { Carousel, Image } from "antd";
import { motion } from "framer-motion";

const ImageGallery = () => {
  const galleryImages = [
    "https://i.ibb.co/jnb7M7d/SB-Living-Room-1.jpg",
    "https://i.ibb.co/bMX3HyNC/SB-Bedroom-2.jpg",
    "https://i.ibb.co/XftzmQtf/Sea-paradise-1.jpg",
    "https://i.ibb.co/bMX3HyNC/SB-Bedroom-2.jpg",
  ];

  return (
    <div className="w-full">
      {/* Image Gallery at the Bottom of the Carousel */}
      <div className="w-full bg-white/20 backdrop-blur-sm py-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Carousel
            autoplay
            autoplaySpeed={3000}
            dots={false}
            slidesToShow={4}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className="px-2">
                <motion.div
                  className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-24 sm:h-32 object-cover"
                    preview={false}
                  />
                </motion.div>
              </div>
            ))}
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageGallery;
