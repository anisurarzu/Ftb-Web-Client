"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaUsers,
  FaRulerCombined,
  FaCity,
  FaCalendarAlt,
  FaUser,
  FaWifi,
  FaSwimmingPool,
  FaHotTub,
  FaBath,
  FaCocktail,
  FaChild,
  FaGamepad,
  FaWheelchair,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdSquareFoot } from "react-icons/md";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import getHotelRooms from "@/dataFetch/getHotelRooms";
import coreAxios from "@/components/coreAxios/Axios";

const Page = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await coreAxios?.get(`hotel/room/${id}`);
        if (res?.status === 200) {
          setRoom(res?.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);
  console.log("room", room);
  console.log("id---->", id);

  if (!room) {
    return <div className="text-center py-20 text-gray-600">Loading...</div>;
  }

  const facilities = [
    { icon: <FaWifi />, text: "High speed in-room wifi" },
    { icon: <FaSwimmingPool />, text: "Swimming pool" },
    { icon: <FaHotTub />, text: "Hot tub" },
    { icon: <FaBath />, text: "Bath" },
    { icon: <FaCocktail />, text: "Mini bar" },
    { icon: <FaChild />, text: "Child friendly" },
    { icon: <FaGamepad />, text: "Games room" },
    { icon: <FaWheelchair />, text: "Wheelchair access" },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-20 mt-32 mb-5 ">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-4 transition duration-200">
        <IoArrowBack className="text-xl" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800">
        {room.name}
      </h1>
      <div className="text-center text-gray-600 mt-2">
        <span className="inline-flex items-center gap-2">
          <FaUsers className="text-teal-500" /> Sleeps: {room.capacity}
        </span>{" "}
        |{" "}
        <span className="inline-flex items-center gap-2">
          <FaRulerCombined className="text-teal-500" /> Size: {room.size}
        </span>{" "}
        |{" "}
        <span className="inline-flex items-center gap-2">
          <FaCity className="text-teal-500" /> View: {room.view}
        </span>
      </div>
      <div className="mt-8 px-4 md:px-10 lg:px-20">
        <Carousel autoplay>
          {room?.hotelImages?.map((image, index) => (
            <div key={index} className="w-full">
              <img
                src={image?.image}
                alt={`Slide ${index}`}
                className="w-full h-auto md:h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="mt-8 px-4 md:px-10 lg:px-40">
        <div className="text-center container mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
            {room?.hotelName}
            <span className="block w-12 h-1 bg-teal-500 mx-auto mt-2"></span>
          </h3>
          <div className="max-w-3xl mx-auto mt-4 text-gray-600 space-y-4">
            <p className="leading-relaxed indent-8 text-center md:text-left">
              Etiam at hendrerit sem. Quisque porta velit quis dolor interdum,
              sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo
              ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse
              faucibus ac turpis et tincidunt.
            </p>
            <p className="leading-relaxed indent-8 text-center md:text-left">
              Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus
              fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 md:px-10 lg:px-40">
        {/* Section Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
            Rooms
            <span className="block w-12 h-1 bg-teal-500 mx-auto mt-2"></span>
          </h3>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {room?.roomCategories?.map((room, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden rounded-lg transition-transform transform hover:scale-105">
              <Link href={`/rooms/${room.id}`}>
                <img
                  src={room.categoryImage}
                  alt={room.name}
                  className="w-full h-60 object-cover rounded-t-lg cursor-pointer"
                />
              </Link>

              <div className="absolute top-4 left-4 bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-semibold">
                From {room.price} / Night
              </div>

              <div className="p-5 text-center">
                <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
                  {room.categoryName}
                </h4>
                <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 text-sm mt-3">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-teal-500 text-lg" />
                    <span>Capacity: {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdSquareFoot className="text-teal-500 text-lg" />
                    <span>Size: {room.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
