"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Spin,
  Steps,
  Card,
  Button,
  Badge,
  Avatar,
  Divider,
  Skeleton,
  Tabs,
  Tag,
  Modal,
  QRCode,
  Descriptions,
  List,
} from "antd";
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
  FaPrint,
  FaDownload,
  FaShareAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import coreAxios from "@/components/coreAxios/Axios";
import Image from "next/image";
import { message } from "antd";
import { toast } from "react-toastify";

const { Step } = Steps;
const { TabPane } = Tabs;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
  const [selectedTab, setSelectedTab] = useState("bookings");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const router = useRouter();
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        setUser(userInfo?.username);
        setMail(userInfo?.email);

        try {
          setBookingsLoading(true);
          const response = await coreAxios.get(
            `/web/bookings/user/${userInfo?._id}`
          );
          setBookings(response.data || []);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
          setBookings([]);
        } finally {
          setLoading(false);
          setBookingsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [router]);

  const navItems = [
    { key: "bookings", label: "Bookings", icon: <FaClipboardList /> },
    { key: "account", label: "Account", icon: <FaUser /> },
    { key: "wishlist", label: "Wish List", icon: <FaHeart /> },
    { key: "reviews", label: "Reviews", icon: <FaStar /> },
  ];

  const accountSections = [
    {
      title: "Personal Information",
      items: [
        {
          icon: <FaUser className="text-[#061A6E]" />,
          title: "Profile Details",
          description: "View and update your personal information",
        },
        {
          icon: <FaLock className="text-[#061A6E]" />,
          title: "Security Settings",
          description: "Change password and security options",
        },
      ],
    },
    {
      title: "Payment Methods",
      items: [
        {
          icon: <FaWallet className="text-[#061A6E]" />,
          title: "Payment Options",
          description: "Manage your saved payment methods",
        },
        {
          icon: <FaMoneyBillWave className="text-[#061A6E]" />,
          title: "Billing History",
          description: "View your transaction history",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <FaMailBulk className="text-[#061A6E]" />,
          title: "Email Preferences",
          description: "Manage your notification settings",
        },
        {
          icon: <FaCog className="text-[#061A6E]" />,
          title: "Account Settings",
          description: "Customize your account experience",
        },
      ],
    },
  ];

  const handleDownloadInvoice = () => {
    if (invoiceRef.current) {
      toPng(invoiceRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `invoice-${selectedBooking?.bookingNo}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating invoice:", err);
        });
    }
  };

  const InvoiceModal = ({ booking }) => {
    if (!booking) return null;

    return (
      <Modal
        title="Booking Invoice"
        open={invoiceModalVisible}
        onCancel={() => setInvoiceModalVisible(false)}
        width={800}
        footer={[
          <Button key="print" icon={<FaPrint />} onClick={() => window.print()}>
            Print
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<FaDownload />}
            onClick={handleDownloadInvoice}
          >
            Download
          </Button>,
          <Button
            key="share"
            icon={<FaShareAlt />}
            onClick={() => alert("Share functionality to be implemented")}
          >
            Share
          </Button>,
        ]}
      >
        <div ref={invoiceRef} className="bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#061A6E]">
                Fast Track Booking
              </h1>
              <p className="text-gray-500">Invoice #{booking.bookingNo}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Issued on</p>
              <p className="font-medium">
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Hotel Information</h3>
              <p className="font-medium">{booking.hotelName}</p>
              <p className="text-gray-600">{booking.roomCategoryName}</p>
              <p className="text-gray-600">Room: {booking.roomNumberName}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Guest Information</h3>
              <p className="font-medium">{booking.fullName}</p>
              <p className="text-gray-600">{booking.email}</p>
              <p className="text-gray-600">{booking.phone}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Check-in</p>
                <p className="font-medium">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p className="text-sm">After 12:00 PM</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Check-out</p>
                <p className="font-medium">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
                <p className="text-sm">Before 12:00 PM</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Duration</p>
                <p className="font-medium">
                  {booking.nights} night{booking.nights > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Description</th>
                    <th className="text-right p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Room ({booking.nights} nights)</td>
                    <td className="p-3 text-right">
                      ৳{booking.roomPrice.toLocaleString()}
                    </td>
                  </tr>
                  {booking.isKitchen && (
                    <tr className="border-t">
                      <td className="p-3">Kitchen</td>
                      <td className="p-3 text-right">
                        ৳{booking.kitchenTotalBill.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  {booking.extraBed && (
                    <tr className="border-t">
                      <td className="p-3">Extra Bed</td>
                      <td className="p-3 text-right">
                        ৳{booking.extraBedTotalBill.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr className="border-t font-semibold">
                    <td className="p-3">Total</td>
                    <td className="p-3 text-right">
                      ৳{booking.totalBill.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Advance Paid</td>
                    <td className="p-3 text-right">
                      ৳{booking.advancePayment.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t font-semibold bg-gray-50">
                    <td className="p-3">Balance Due</td>
                    <td className="p-3 text-right">
                      ৳{booking.duePayment.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <p>{booking.paymentMethod}</p>
              {booking.transactionId && (
                <p>Transaction ID: {booking.transactionId}</p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <QRCode
                value={`Booking ID: ${booking.bookingID}\nHotel: ${booking.hotelName}\nGuest: ${booking.fullName}`}
                size={120}
              />
              <p className="mt-2 text-sm text-gray-500">
                Scan for booking details
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
            <p>Thank you for your booking!</p>
            <p>For any inquiries, please contact our customer support.</p>
          </div>
        </div>
      </Modal>
    );
  };

  const BookingDetailCard = ({ booking }) => {
    const bookingStatusSteps = [
      {
        title: "Booking Confirmed",
        description: "Your booking has been confirmed",
        status: "finish",
      },
      {
        title: "Payment Processed",
        description:
          booking.paymentMethod === "Pay Later at Hotel"
            ? "You will pay at the hotel"
            : "Payment completed successfully",
        status: booking.statusID === 1 ? "wait" : "finish",
      },
      {
        title: "Ready for Check-in",
        description: `Check-in after ${new Date(
          booking.checkInDate
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        status: booking.statusID === 2 ? "process" : "wait",
      },
    ];

    // Add this function to your ProfilePage component
    // Add this function to your ProfilePage component
    const handleCancelBooking = async (bookingId, canceledBy, reason) => {
      try {
        const response = await coreAxios.put(`/web/booking/soft/${bookingId}`, {
          canceledBy,
          reason: reason || "N/A",
        });

        if (response.status !== 200) {
          message.error("Failed to cancel booking");
        } else {
          const updatedBooking = response.data.updatedBooking;

          if (updatedBooking) {
            setBookings(
              bookings.map((booking) =>
                booking._id === bookingId ? updatedBooking : booking
              )
            );

            if (selectedBooking?._id === bookingId) {
              setSelectedBooking(updatedBooking);
            }

            message.success("Booking cancelled successfully");

            // Close the modal (ensure this state exists in your component)
          } else {
          }
        }
      } catch (error) {
        console.error("Cancellation failed:", error);
        message.error(
          error.response?.data?.error || "Failed to cancel booking"
        );
      }
    };

    return (
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-64 relative rounded-lg overflow-hidden">
              {booking.hotelImage ? (
                <Image
                  src={booking.hotelImage}
                  alt={booking.hotelName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-[#061A6E] to-[#0d2b9e] flex items-center justify-center text-white">
                  <FaHome className="text-4xl" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#061A6E] mb-1">
                    {booking.hotelName}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {booking.roomCategoryName}
                  </p>
                </div>
                <Tag
                  color={
                    booking.statusID === 1
                      ? "orange"
                      : booking.statusID === 2
                      ? "green"
                      : "red"
                  }
                  className="text-sm font-medium"
                >
                  {booking.statusID === 1
                    ? "Pending"
                    : booking.statusID === 2
                    ? "Confirmed"
                    : "Cancelled"}
                </Tag>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#061A6E] text-lg">
                    Booking Information
                  </h3>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Check-in/Check-out">
                      {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Duration">
                      {booking.nights} night{booking.nights > 1 ? "s" : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Guests">
                      {booking.adults} adult{booking.adults > 1 ? "s" : ""}
                      {booking.children > 0 &&
                        `, ${booking.children} child${
                          booking.children > 1 ? "ren" : ""
                        }`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Room Number">
                      {booking.roomNumberName || "To be assigned"}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#061A6E] text-lg">
                    Payment Details
                  </h3>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Total Amount">
                      ৳{booking.totalBill.toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Method">
                      {booking.paymentMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="Advance Paid">
                      ৳{booking.advancePayment.toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Balance Due">
                      ৳{booking.duePayment.toLocaleString()}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#061A6E] text-lg mb-3">
                  Contact Information
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <FaUser className="text-[#061A6E]" />
                    <span>{booking.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <FaPhone className="text-[#061A6E]" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <FaEnvelope className="text-[#061A6E]" />
                    <span>{booking.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  icon={<FaFileInvoice />}
                  className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10"
                  disabled={booking.statusID !== 2}
                  onClick={() => {
                    if (booking.statusID === 2) {
                      setInvoiceModalVisible(true);
                    } else {
                      toast.error(
                        "Invoice is only available for confirmed bookings"
                      );
                    }
                  }}
                >
                  View Invoice
                </Button>
                <Button icon={<FaPhone />} className="h-10">
                  Contact Hotel
                </Button>

                {booking.statusID === 1 && (
                  <Button
                    danger
                    className="h-10"
                    onClick={() => {
                      Modal.confirm({
                        title: "Confirm Cancellation",
                        content:
                          "Are you sure you want to cancel this booking?",
                        okText: "Confirm",
                        cancelText: "Go Back",
                        onOk: () => handleCancelBooking(booking._id),
                      });
                    }}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Booking Status" className="mt-6">
          <Steps
            current={
              booking.statusID === 1 ? 0 : booking.statusID === 2 ? 1 : 2
            }
          >
            {bookingStatusSteps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                status={step.status}
              />
            ))}
          </Steps>
        </Card>

        <InvoiceModal booking={booking} />
      </div>
    );
  };

  const BookingListCard = () => {
    if (bookingsLoading) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#061A6E]">Your Bookings</h2>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#061A6E]">Your Bookings</h2>
          <Button
            type="primary"
            className="bg-[#061A6E]"
            onClick={() => router.push("/hotels")}
          >
            Book New Stay
          </Button>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Image
                src="/empty-booking.svg"
                alt="No bookings"
                width={200}
                height={200}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">
                You {`haven't`} made any bookings yet. Start exploring our
                hotels to find your perfect stay.
              </p>
              <Button
                type="primary"
                className="bg-[#061A6E]"
                onClick={() => router.push("/hotels")}
              >
                Explore Hotels
              </Button>
            </div>
          </Card>
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            dataSource={bookings}
            renderItem={(booking) => (
              <List.Item
                key={booking._id}
                extra={
                  <div className="hidden md:block w-48 h-32 relative">
                    {booking.hotelImage ? (
                      <Image
                        src={booking.hotelImage}
                        alt={booking.hotelName}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[#061A6E] to-[#0d2b9e] flex items-center justify-center text-white rounded-lg">
                        <FaHome className="text-2xl" />
                      </div>
                    )}
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="large"
                      src={booking.hotelImage}
                      icon={<FaHome />}
                    />
                  }
                  title={
                    <div className="flex items-center gap-3">
                      <span
                        className="cursor-pointer hover:text-[#0d2b9e]"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        {booking.hotelName}
                      </span>
                      <Tag
                        color={
                          booking.statusID === 1
                            ? "orange"
                            : booking.statusID === 2
                            ? "green"
                            : "red"
                        }
                      >
                        {booking.statusID === 1
                          ? "Pending"
                          : booking.statusID === 2
                          ? "Confirmed"
                          : "Cancelled"}
                      </Tag>
                    </div>
                  }
                  description={
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <FaCalendarAlt className="text-[#061A6E]" />
                          <span>
                            {new Date(booking.checkInDate).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              booking.checkOutDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaBed className="text-[#061A6E]" />
                          <span>
                            {booking.nights} night
                            {booking.nights > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaUserFriends className="text-[#061A6E]" />
                          <span>
                            {booking.adults} adult
                            {booking.adults > 1 ? "s" : ""}
                            {booking.children > 0 &&
                              `, ${booking.children} child${
                                booking.children > 1 ? "ren" : ""
                              }`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaMoneyBillWave className="text-[#061A6E]" />
                        <span className="font-semibold">
                          ৳{booking.totalBill.toLocaleString()}
                        </span>
                        {booking.paymentMethod && (
                          <span className="text-gray-500">
                            • Paid via {booking.paymentMethod}
                          </span>
                        )}
                      </div>
                    </div>
                  }
                />
                <div className="mt-4">
                  <Button
                    type="primary"
                    className="bg-[#061A6E] hover:bg-[#0d2b9e]"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    View Details
                  </Button>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  };

  const AccountCard = () => {
    if (loading) {
      return (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Skeleton.Avatar active size={96} />
            <div className="space-y-4">
              <Skeleton.Input active size="large" />
              <Skeleton.Input active size="default" />
              <Skeleton.Button active />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton.Input active block style={{ height: 28, width: 200 }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((j) => (
                  <Card key={j}>
                    <Skeleton active avatar paragraph={{ rows: 1 }} />
                  </Card>
                ))}
              </div>
              {i < 3 && <Divider />}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar
            size={96}
            className="bg-[#061A6E] text-white text-4xl shadow-md"
          >
            {user?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-[#061A6E]">{user}</h2>
            <p className="text-gray-600">{mail}</p>
            <div className="flex gap-3 mt-4">
              <Button
                type="primary"
                className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10"
              >
                Edit Profile
              </Button>
              <Button className="h-10">Change Photo</Button>
            </div>
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
                  className="cursor-pointer"
                >
                  <Card
                    hoverable
                    className="h-full transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#061A6E]/10 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {item.description}
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
        <div className="max-w-md mx-auto">
          <Image
            src="/empty-wishlist.svg"
            alt="Empty wishlist"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-[#061A6E] mb-4">
            Your Wish List is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Save your favorite hotels to easily find them later
          </p>
          <Button
            type="primary"
            className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10"
            onClick={() => router.push("/hotels")}
          >
            Browse Hotels
          </Button>
        </div>
      </div>
    );
  };

  const ReviewsCard = () => {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Image
            src="/empty-reviews.svg"
            alt="No reviews"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-[#061A6E] mb-4">
            No Reviews Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Share your experience to help other travelers
          </p>
          <Button
            type="primary"
            className="bg-[#061A6E] hover:bg-[#0d2b9e] h-10"
          >
            Write Your First Review
          </Button>
        </div>
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
      <div className="bg-gradient-to-r from-[#061A6E] to-[#0d2b9e] text-white py-16 px-4 md:px-12 mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                size={64}
                className="bg-white text-[#061A6E] text-2xl font-bold shadow-lg"
              >
                {user?.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Welcome back, {user || "User"}
                </h1>
                <p className="text-blue-100">{mail}</p>
              </div>
            </div>
            <Badge
              count="Genius Level 1"
              className="hidden md:block bg-yellow-400 text-[#061A6E] font-medium px-4 py-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <Card className="rounded-xl shadow-md">
          <Tabs
            activeKey={selectedTab}
            onChange={(key) => {
              setSelectedTab(key);
              setSelectedBooking(null);
            }}
            tabBarStyle={{ marginBottom: 0 }}
            className="profile-tabs"
          >
            {navItems.map((item) => (
              <TabPane
                key={item.key}
                tab={
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                }
              />
            ))}
          </Tabs>
        </Card>
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
                className="flex items-center gap-2 mb-6"
              >
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
