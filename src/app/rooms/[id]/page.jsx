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

const Page = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      const demoRooms = [
        {
          id: 1,
          name: "Deluxe Queen Room",
          image: "/assets/images/room/room1.jpg",
          images: [
            "/assets/images/room/smb1.jpg",
            "/assets/images/room/smb2.jpg",
            "/assets/images/room/smb3.jpg",
            "/assets/images/room/smb4.jpg",
            "/assets/images/room/smb5.jpg",
            "/assets/images/room/smb6.jpg",
            "/assets/images/room/smb9.jpg",
          ],
          price: 300,
          size: "35sqm",
          capacity: "2 Adults",
          view: "City",
          video:
            "https://www.youtube.com/embed/q5JIpxMHidQ?si=ZANkt5ZG0bX4ruZZ",
          description: `Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, 
                        sit amet imperdiet leo posuere...`,
        },
        {
          id: 2,
          name: "King Ensuite Room",
          image: "/assets/images/room/room2.jpg",
          images: [
            "/assets/images/room/sb1.jpg",
            "/assets/images/room/sb2.jpg",
            "/assets/images/room/sb3.jpg",
            "/assets/images/room/sb4.jpg",
            "/assets/images/room/sb5.jpg",
          ],
          price: 250,
          size: "40sqm",
          capacity: "3 Adults",
          view: "Garden",
          video:
            "https://www.youtube.com/embed/e514JlbCZcU?si=S7hUWCSCsgm3qrbc",
          description: `Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum...`,
        },
        {
          id: 3,
          name: "King LOL Room",
          image: "/assets/images/room/room3.jpg",
          images: [
            "/assets/images/room/mb1.jpg",
            "/assets/images/room/mb2.jpg",
            "/assets/images/room/mb3.jpg",
            "/assets/images/room/mb4.jpg",
            "/assets/images/room/mb5.jpg",
            "/assets/images/room/mb6.jpg",
          ],
          price: 250,
          size: "40sqm",
          capacity: "3 Adults",
          view: "Garden",
          video:
            "https://www.youtube.com/embed/M620pvZRiuw?si=aNYkrJqm3y1WKHuj",
          description: `Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum...`,
        },
        {
          id: 4,
          name: "Sea Paradise",
          image: "/assets/images/room/sp2.jpg",
          images: [
            "/assets/images/room/sp1.jpg",
            "/assets/images/room/sp2.jpg",
            "/assets/images/room/sp3.jpg",
          ],
          price: 250,
          size: "40sqm",
          capacity: "3 Adults",
          view: "Garden",
          description: `Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum...`,
          video:
            "https://www.youtube.com/embed/M620pvZRiuw?si=aNYkrJqm3y1WKHuj",
          demoData: [
            {
              id: 1,
              image: "/assets/images/room/sp1.jpg",
              price: "$300",
              name: "Deluxe Queen Room",
              capacity: "2 Adults",
              size: "35sqm",
            },
            {
              id: 2,
              image: "/assets/images/room/sp2.jpg",
              price: "$150",
              name: "Queen Room",
              capacity: "2 Adults",
              size: "35sqm",
            },
            {
              id: 3,
              image: "/assets/images/room/sp3.jpg",
              price: "$200",
              name: "Deluxe Ensuite Room",
              capacity: "2 Adults",
              size: "35sqm",
            },
          ],
        },
      ];

      const selectedRoom = demoRooms.find((room) => room.id == id);
      setRoom(selectedRoom);
    };

    console.log("ID----<", id);
    console.log("ROOM----<", room);

    fetchRoom();
  }, [id]);

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
  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="container mx-auto px-4 lg:px-20 mt-32 mb-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-4 transition duration-200"
      >
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
          {room.images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg shadow-md md:shadow-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="mt-8 px-4 md:px-10 lg:px-20">
        <div className="text-center container mx-auto">
          <div className="flex justify-center items-center max-w-[90%] md:max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
              Room Description
              <span className="block w-12 h-1 bg-teal-500 mx-auto mt-4"></span>
            </h3>
          </div>
          <div className="text-center sm:text-left max-w-[90%] md:max-w-2xl mx-auto mt-4">
            <p className="text-gray-600 leading-relaxed sm:leading-loose indent-4 sm:indent-8">
              Etiam at hendrerit sem. Quisque porta velit quis dolor interdum,
              sit amet imperdiet leo posuere. Nam id nisl scelerisque, commodo
              ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse
              faucibus ac turpis et tincidunt. Cras non quam mauris. Nullam
              commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum
              aliquet, ultrices vel purus.
            </p>
            <p className="text-gray-600 leading-relaxed sm:leading-loose indent-4 sm:indent-8 mt-4">
              Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus
              fermentum nunc ac dui faucibus consequat. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Proin hendrerit sit amet est at laoreet. Nam auctor rhoncus
              accumsan. Morbi et turpis ac ligula tempor tincidunt.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 sm:px-10 md:px-20">
        <div className="text-center container mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
            Facilities
            <span className="block w-12 h-1 bg-teal-500 mx-auto mt-4"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6 max-w-full md:max-w-2xl mx-auto">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <span className="text-teal-500 text-2xl">{facility.icon}</span>
                <span className="text-gray-700 text-sm">{facility.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 sm:px-10 md:px-20">
        <div className="text-center container mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
            Video Tour
            <span className="block w-12 h-1 bg-teal-500 mx-auto mt-4"></span>
          </h3>
        </div>
        <div className="relative mt-6 flex justify-center">
          {room?.video ? (
            <iframe
              className="w-full max-w-[700px] h-[400px] rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${getYouTubeId(room.video)}`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-center text-gray-500">No video available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
