"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin, Steps, Card, Button, Badge, Avatar, Divider } from "antd";
import {
  FaClipboardList,
  FaHeart,
  FaStar,
  FaUser,
  FaArrowLeft,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBed,
  FaUserFriends,
  FaChild,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaWallet,
  FaLock,
  FaUsersCog,
  FaCog,
  FaMailBulk,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
  const [selectedTab, setSelectedTab] = useState("bookings");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const router = useRouter();

  // Sample booking data
  const sampleBookings = [
    {
      _id: "6832a9923c6173de6a00c061",
      fullName: "Anisur Rahman Arzu",
      phone: "+8801313214171",
      email: "shakibanis1234@gmail.com",
      hotelName: "Samudra Bari",
      roomCategoryName: "2 Bed Apartment",
      roomNumberName: "RN-1748150645080-1",
      roomPrice: 5138,
      checkInDate: "2025-05-24T18:00:00.000Z",
      checkOutDate: "2025-05-25T18:00:00.000Z",
      nights: 1,
      adults: 1,
      children: 0,
      totalBill: 6638,
      paymentMethod: "Pay Later at Hotel",
      bookingID: "BID-1748150673870",
      bookingNo: "25052502",
      statusID: 1,
      isKitchen: true,
      extraBed: true,
      kitchenTotalBill: 500,
      extraBedTotalBill: 1000,
    },
    {
      _id: "68329d82412e0706ea12d54a",
      fullName: "Anisur Rahman Arzu",
      phone: "+8801313214171",
      email: "shakibanis1234@gmail.com",
      hotelName: "Samudra Bari",
      roomCategoryName: "2 Bed Apartment",
      roomNumberName: "RN-1748147531354-1",
      roomPrice: 5138,
      checkInDate: "2025-05-24T18:00:00.000Z",
      checkOutDate: "2025-05-25T18:00:00.000Z",
      nights: 1,
      adults: 1,
      children: 0,
      totalBill: 5138,
      paymentMethod: "Pay Later at Hotel",
      bookingID: "BID-1748147585436",
      bookingNo: "25052501",
      statusID: 1,
      isKitchen: false,
      extraBed: false,
      kitchenTotalBill: 0,
      extraBedTotalBill: 0,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("token");
      setTimeout(() => {
        if (!token) {
          router.push("/login");
        } else {
          setUser(userInfo?.username);
          setMail(userInfo?.email);
          setBookings(sampleBookings);
          setLoading(false);
        }
      }, 1000);
    }
  }, [router]);

  const tabs = [
    { id: "bookings", name: "Bookings", icon: <FaClipboardList /> },
    { id: "account", name: "Account", icon: <FaUser /> },
    { id: "wishlist", name: "Wish List", icon: <FaHeart /> },
    { id: "reviews", name: "Reviews", icon: <FaStar /> },
  ];

  const accountSections = [
    {
      title: "Personal Information",
      items: [
        {
          icon: <FaUser className="text-[#061A6E]" />,
          title: "Profile Details",
        },
        {
          icon: <FaLock className="text-[#061A6E]" />,
          title: "Security Settings",
        },
      ],
    },
    {
      title: "Payment Methods",
      items: [
        {
          icon: <FaWallet className="text-[#061A6E]" />,
          title: "Payment Options",
        },
        {
          icon: <FaMoneyBillWave className="text-[#061A6E]" />,
          title: "Billing History",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <FaMailBulk className="text-[#061A6E]" />,
          title: "Email Preferences",
        },
        {
          icon: <FaCog className="text-[#061A6E]" />,
          title: "Account Settings",
        },
      ],
    },
  ];

  const BookingDetailCard = ({ booking }) => {
    const steps = [
      {
        title: "Booking Confirmed",
        description: "Your booking has been confirmed",
      },
      {
        title: "Payment Processed",
        description:
          booking.paymentMethod === "Pay Later at Hotel"
            ? "You will pay at the hotel"
            : "Payment completed successfully",
      },
      {
        title: "Ready for Check-in",
        description: `Check-in after ${new Date(
          booking.checkInDate
        ).toLocaleTimeString()}`,
      },
    ];

    return (
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#061A6E] to-[#0d2b9e] flex items-center justify-center text-white">
                <FaHome className="text-4xl" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#061A6E] mb-2">
                {booking.hotelName}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {booking.roomCategoryName}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#061A6E]">
                    Booking Information
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#061A6E]" />
                    <span>
                      {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBed className="text-[#061A6E]" />
                    <span>
                      {booking.nights} night{booking.nights > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-[#061A6E]" />
                    <span>
                      {booking.adults} adult{booking.adults > 1 ? "s" : ""}
                    </span>
                  </div>
                  {booking.children > 0 && (
                    <div className="flex items-center gap-2">
                      <FaChild className="text-[#061A6E]" />
                      <span>
                        {booking.children} child
                        {booking.children > 1 ? "ren" : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-[#061A6E]">
                    Payment Details
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-[#061A6E]" />
                    <span>Total: ৳{booking.totalBill.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaWallet className="text-[#061A6E]" />
                    <span>Payment: {booking.paymentMethod}</span>
                  </div>
                  {booking.isKitchen && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#061A6E]">•</span>
                      <span>Kitchen: ৳{booking.kitchenTotalBill}</span>
                    </div>
                  )}
                  {booking.extraBed && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#061A6E]">•</span>
                      <span>Extra Bed: ৳{booking.extraBedTotalBill}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#061A6E] mb-2">
                  Contact Information
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <FaUser className="text-[#061A6E]" />
                  <span>{booking.fullName}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <FaPhone className="text-[#061A6E]" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#061A6E]" />
                  <span>{booking.email}</span>
                </div>
              </div>

              <Button
                type="primary"
                icon={<FaFileInvoice />}
                className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10">
                Download Invoice
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Booking Status" className="mt-6">
          <Steps current={1} items={steps} responsive={true} className="mt-4" />
        </Card>
      </div>
    );
  };

  const BookingListCard = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#061A6E]">Your Bookings</h2>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500">{`You don't have any bookings yet`}</p>
            <Button type="primary" className="mt-4 bg-[#061A6E]">
              Explore Hotels
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedBooking(booking)}>
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-[#061A6E] to-[#0d2b9e] flex items-center justify-center text-white">
                        <FaHome className="text-4xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-[#061A6E]">
                          {booking.hotelName}
                        </h3>
                        <Badge
                          status={
                            booking.statusID === 1 ? "success" : "warning"
                          }
                          text={
                            booking.statusID === 1 ? "Confirmed" : "Pending"
                          }
                        />
                      </div>
                      <p className="text-gray-600 mb-4">
                        {booking.roomCategoryName}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-[#061A6E]" />
                          <span>
                            {new Date(booking.checkInDate).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              booking.checkOutDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaBed className="text-[#061A6E]" />
                          <span>
                            {booking.nights} night
                            {booking.nights > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-[#061A6E]" />
                          <span className="font-bold">
                            ৳{booking.totalBill.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button
                        type="primary"
                        className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(booking);
                        }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AccountCard = () => {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar size={96} className="bg-[#061A6E] text-white text-4xl">
            {user?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-[#061A6E]">{user}</h2>
            <p className="text-gray-600">{mail}</p>
            <Button
              type="primary"
              className="mt-4 bg-[#061A6E] hover:bg-[#0d2b9e] h-10">
              Edit Profile
            </Button>
          </div>
        </div>

        {accountSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-[#061A6E]">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer">
                  <Card hoverable className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#061A6E]/10 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-gray-500 text-sm">
                          Manage your {item.title.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            {index < accountSections.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    );
  };

  const WishListCard = () => {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#061A6E] mb-4">
          Your Wish List
        </h2>
        <p className="text-gray-600 mb-6">{`You don't have any saved hotels yet`}</p>
        <Button type="primary" className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10">
          Explore Hotels
        </Button>
      </div>
    );
  };

  const ReviewsCard = () => {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#061A6E] mb-4">Your Reviews</h2>
        <p className="text-gray-600 mb-6">
          {` You haven't written any reviews yet`}
        </p>
        <Button type="primary" className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10">
          Write a Review
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" className="text-[#061A6E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-[#061A6E] text-white py-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              size={64}
              className="bg-white text-[#061A6E] text-2xl font-bold">
              {user?.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user || "User"}</h1>
              <p className="text-blue-100">{mail}</p>
            </div>
          </div>
          <Badge
            count="Genius Level 1"
            className="bg-yellow-400 text-[#061A6E] font-medium px-4 py-2 rounded-full"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 font-medium flex items-center gap-2 min-w-max ${
                  selectedTab === tab.id
                    ? "text-[#061A6E] border-b-2 border-[#061A6E]"
                    : "text-gray-500 hover:text-[#061A6E]"
                }`}
                onClick={() => {
                  setSelectedTab(tab.id);
                  setSelectedBooking(null);
                }}>
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedTab === "account" && <AccountCard />}
        {selectedTab === "bookings" &&
          (selectedBooking ? (
            <div className="space-y-6">
              <Button
                icon={<FaArrowLeft />}
                onClick={() => setSelectedBooking(null)}
                className="flex items-center gap-2 mb-6">
                Back to Bookings
              </Button>
              <BookingDetailCard booking={selectedBooking} />
            </div>
          ) : (
            <BookingListCard />
          ))}
        {selectedTab === "wishlist" && <WishListCard />}
        {selectedTab === "reviews" && <ReviewsCard />}
      </div>
    </div>
  );
}
