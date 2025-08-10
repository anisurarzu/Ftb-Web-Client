"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Skeleton,
  Button,
  Divider,
  Tag,
  message,
  Modal,
  Tabs,
  Carousel,
  Descriptions,
  Badge,
} from "antd";
import {
  StarFilled,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  HomeOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  FaWater,
  FaMountain,
  FaCar,
  FaMapMarkerAlt,
  FaSwimmingPool,
  FaCoffee,
  FaStar,
  FaWallet,
  FaEllipsisH,
} from "react-icons/fa";
import { GiJeep } from "react-icons/gi";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Services from "./Services";
import FAQSection from "./Faq";
import ImageGallery from "../Commons/ImageGallery";
import WhatsApp from "@/components/WhatsApp";
import Image from "next/image";
import coreAxios from "../coreAxios/Axios";

const { TabPane } = Tabs;

const Homepage = ({ hotels, hotelList }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedHotels, setFetchedHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
    const fetchHotels = async () => {
      try {
        const response = await coreAxios.get("/web-hotels");
        const hotelData = response.data || [];
        const formattedHotels = hotelData?.map((hotel, index) => ({
          id: hotel.id || index,
          _id: hotel._id || index,
          name: hotel.name,
          location: hotel.location,
          rating: hotel.rating || 4,
          price: `৳${hotel.price}/night`,
          image: hotel.image,
          amenities: hotel.amenities || [],
          gradient:
            index % 4 === 0
              ? "from-blue-500 to-blue-700"
              : index % 4 === 1
              ? "from-green-500 to-green-700"
              : index % 4 === 2
              ? "from-purple-500 to-purple-700"
              : "from-amber-500 to-amber-700",
        }));

        setFetchedHotels(formattedHotels);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const fetchHotelDetails = async (hotelId) => {
    setDetailsLoading(true);
    try {
      const response = await coreAxios.get(`/web-hotel-details/${hotelId}`);
      setHotelDetails(response.data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      message.error("Failed to load hotel details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCardClick = (hotel) => {
    console.log("Selected hotel:", hotel);
    setSelectedHotel(hotel);
    setModalVisible(true);
    fetchHotelDetails(hotel._id);
  };

  const renderRoomOptions = (options) => {
    return options.map((option, index) => (
      <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-lg">{option.type}</h4>
            <div className="flex items-center text-gray-600">
              <UserOutlined className="mr-1" />
              <span>Max {option.adults} adults</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#061A6E]">
              ৳{option.price}
            </div>
            {option.originalPrice > option.price && (
              <div className="text-sm text-gray-500 line-through">
                ৳{option.originalPrice}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center">
            {option.breakfast ? (
              <>
                <CheckCircleOutlined className="text-green-500 mr-1" />
                <span>Breakfast included</span>
              </>
            ) : (
              <>
                <CloseCircleOutlined className="text-red-500 mr-1" />
                <span>No breakfast</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <InfoCircleOutlined className="text-blue-500 mr-1" />
            <span>{option.cancellation}</span>
          </div>
        </div>
        <Button
          type="primary"
          className="w-full bg-[#061A6E] hover:bg-[#0d2b9e]"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            message.info(
              "Please go to the top of the page and select check-in and check-out dates first."
            );
          }}
        >
          Book Now
        </Button>
      </div>
    ));
  };

  const renderAmenities = (amenities) => {
    return (
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <Tag key={index} color="blue" className="flex items-center">
            {amenity === "Wi-Fi" && <WifiOutlined className="mr-1" />}
            {amenity === "Parking" && <CarOutlined className="mr-1" />}
            {amenity === "Breakfast" && <CoffeeOutlined className="mr-1" />}
            {amenity}
          </Tag>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="font-sans bg-gray-50">
        <div className="h-screen bg-gray-200 animate-pulse"></div>
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
              className="text-4xl font-bold text-[#061A6E] mb-4"
            >
              Featured Hotels
            </motion.h2>
            <Divider className="w-32 mx-auto bg-[#061A6E] h-1" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
            >
              Discover our carefully selected premium accommodations across
              Bangladesh
            </motion.p>
          </div>

          {fetchedHotels.length === 0 ? (
            <p className="text-center text-gray-500">
              No featured hotels available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 md:mx-12 lg:mx-24 ">
              {fetchedHotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card
                    hoverable
                    className="shadow-lg border-0 rounded-lg overflow-hidden h-full flex flex-col"
                    cover={
                      <div
                        className="relative h-48 cursor-pointer"
                        onClick={() => handleCardClick(hotel)}
                      >
                        <Image
                          src={hotel.image?.[0]}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${hotel.gradient} to-transparent opacity-30`}
                        ></div>
                      </div>
                    }
                  >
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
                            className="text-xs bg-gray-100 border-0"
                          >
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
                        className="bg-[#061A6E] hover:bg-[#0d2b9e]"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          message.info(
                            "Please go to the top of the page and select check-in and check-out dates first."
                          );
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hotel Details Modal */}
      <Modal
        title={selectedHotel?.name}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
        className="top-10"
      >
        {detailsLoading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : (
          hotelDetails && (
            <div>
              <div className="mb-6">
                <Carousel autoplay>
                  {hotelDetails.images?.map((image, index) => (
                    <div key={index} className="relative h-64">
                      <Image
                        src={image}
                        alt={`${hotelDetails.name} ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="flex items-start mb-6">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2">
                    {hotelDetails.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <EnvironmentOutlined className="mr-2" />
                    <span>{hotelDetails.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Badge
                      count={hotelDetails.rating}
                      style={{ backgroundColor: "#061A6E" }}
                      showZero
                      className="mr-2"
                    />
                    <StarFilled className="text-yellow-400" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#061A6E]">
                    Starts from ৳
                    {Math.min(
                      ...hotelDetails.roomTypes?.flatMap((room) =>
                        room.options?.map((opt) => opt.price)
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Rooms" key="1">
                  {hotelDetails.roomTypes?.map((room, index) => (
                    <div key={index} className="mb-8">
                      <div className="flex mb-4">
                        <div className="w-1/3 pr-4">
                          <div className="relative h-40">
                            {room.roomImages?.[0] && (
                              <Image
                                src={room.roomImages[0]}
                                alt={room.name}
                                fill
                                className="object-cover rounded"
                              />
                            )}
                          </div>
                        </div>
                        <div className="w-2/3">
                          <h3 className="text-lg font-semibold mb-2">
                            {room.name}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {room.description}
                          </p>
                          <div className="mb-2">
                            {renderAmenities(room.amenities)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderRoomOptions(room.options)}
                      </div>
                    </div>
                  ))}
                </TabPane>
                <TabPane tab="Facilities" key="2">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hotelDetails.facilities?.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab="Policies" key="3">
                  {hotelDetails.policies?.length > 0 ? (
                    <Descriptions bordered column={1}>
                      {hotelDetails.policies?.map((policy, index) => (
                        <Descriptions.Item key={index} label={policy.type}>
                          {policy.description}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                  ) : (
                    <p>No policies information available</p>
                  )}
                </TabPane>
                <TabPane tab="Nearby" key="4">
                  {hotelDetails.whatsNearby?.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {hotelDetails.whatsNearby?.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No nearby information available</p>
                  )}
                </TabPane>
              </Tabs>
            </div>
          )
        )}
      </Modal>

      {/* Our Facilities Section */}
      {/* Our Facilities Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#061A6E]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-[#061A6E] mb-4"
            >
              Our Facilities
            </motion.h2>
            <Divider className="w-32 mx-auto bg-[#061A6E] h-1" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-4 md:mx-12 lg:mx-24">
            {facilities.map((facility, index) => {
              const facilityIcons = [
                <FaWater key="water" className="text-2xl text-[#061A6E]" />,
                <FaMountain
                  key="mountain"
                  className="text-2xl text-[#061A6E]"
                />,
                <FaCar key="car" className="text-2xl text-[#061A6E]" />,
                <GiJeep key="jeep" className="text-2xl text-[#061A6E]" />,
                <FaMapMarkerAlt
                  key="marker"
                  className="text-2xl text-[#061A6E]"
                />,
                <FaSwimmingPool
                  key="pool"
                  className="text-2xl text-[#061A6E]"
                />,
                <FaCoffee key="coffee" className="text-2xl text-[#061A6E]" />,
                <FaStar key="star" className="text-2xl text-[#061A6E]" />,
                <FaWallet key="wallet" className="text-2xl text-[#061A6E]" />,
                <FaEllipsisH
                  key="others"
                  className="text-2xl text-[#061A6E]"
                />,
              ];

              return (
                <motion.div
                  key={`facility-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center"
                >
                  <div className="bg-[#061A6E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {facilityIcons[index]}
                  </div>
                  <h3 className="font-medium text-[#061A6E]">{facility}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection />
      <WhatsApp />
    </div>
  );
};

export default Homepage;
