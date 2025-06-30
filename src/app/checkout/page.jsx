"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Form,
  Button,
  Switch,
  InputNumber,
  Typography,
  Select,
  Skeleton,
  Card,
  Divider,
  Alert,
} from "antd";
import dayjs from "dayjs";
import coreAxios from "@/components/coreAxios/Axios";

const { Title, Text } = Typography;
const { Option } = Select;

const paymentMethods = [
  { value: "bKash", label: "bKash" },
  { value: "Nagad", label: "Nagad" },
  { value: "Bank", label: "Bank Transfer" },
];

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("later");
  const [submitting, setSubmitting] = useState(false);
  const [isKitchen, setIsKitchen] = useState(false);
  const [extraBed, setExtraBed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthAndData = () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("userInfo");
      const storedBookingData = sessionStorage.getItem("bookingData");

      if (!token || !userInfo) {
        sessionStorage.setItem("redirectAfterLogin", "/checkout");
        router.push("/login");
        return;
      }

      if (!storedBookingData) {
        Modal.error({
          title: "Booking Data Missing",
          content: "Your booking session has expired. Please start again.",
          onOk: () => router.push("/hotels"),
        });
        return;
      }

      try {
        const parsedData = JSON.parse(storedBookingData);

        // Validate main booking data structure
        const requiredFields = {
          selectedRooms: "array",
          hotelName: "string",
          hotelId: "string",
          checkInDate: "string",
          checkOutDate: "string",
          nights: "number",
        };

        const missingFields = [];
        const invalidFields = [];

        Object.entries(requiredFields).forEach(([field, type]) => {
          if (!(field in parsedData)) {
            missingFields.push(field);
          } else if (type === "array" && !Array.isArray(parsedData[field])) {
            invalidFields.push(field);
          } else if (type === "number" && isNaN(parsedData[field])) {
            invalidFields.push(field);
          } else if (
            type === "string" &&
            typeof parsedData[field] !== "string"
          ) {
            invalidFields.push(field);
          }
        });

        if (missingFields.length > 0 || invalidFields.length > 0) {
          let errorMessage = "";
          if (missingFields.length > 0) {
            errorMessage += `Missing required fields: ${missingFields.join(
              ", "
            )}. `;
          }
          if (invalidFields.length > 0) {
            errorMessage += `Invalid fields: ${invalidFields.join(", ")}.`;
          }
          throw new Error(errorMessage);
        }

        if (parsedData.selectedRooms.length === 0) {
          throw new Error("No rooms selected");
        }

        // Enhanced room data validation with defaults
        parsedData.selectedRooms = parsedData.selectedRooms.map((room) => {
          // Add default values for missing required fields
          return {
            roomTypeId:
              room.roomTypeId ||
              `temp-id-${Math.random().toString(36).substr(2, 9)}`,
            price: room.price || 1000, // Default price if missing or 0
            ...room,
          };
        });

        const room = parsedData.selectedRooms[0];
        const requiredRoomFields = {
          roomTypeId: "string",
          roomType: "string",
          roomId: "string",
          price: "number",
        };

        const missingRoomFields = [];
        const invalidRoomFields = [];

        Object.entries(requiredRoomFields).forEach(([field, type]) => {
          if (!room[field]) {
            missingRoomFields.push(field);
          } else if (type === "number" && isNaN(room[field])) {
            invalidRoomFields.push(field);
          } else if (type === "number" && room[field] <= 0) {
            invalidRoomFields.push(`${field} (must be greater than 0)`);
          }
        });

        if (missingRoomFields.length > 0 || invalidRoomFields.length > 0) {
          let errorMessage = "Room data issue: ";
          if (missingRoomFields.length > 0) {
            errorMessage += `Missing fields: ${missingRoomFields.join(", ")}. `;
          }
          if (invalidRoomFields.length > 0) {
            errorMessage += `Invalid values: ${invalidRoomFields.join(", ")}.`;
          }
          throw new Error(errorMessage);
        }

        // Format dates
        parsedData.checkInDate = dayjs(parsedData.checkInDate).toISOString();
        parsedData.checkOutDate = dayjs(parsedData.checkOutDate).toISOString();

        setBookingData(parsedData);

        // Set form values
        form.setFieldsValue({
          fullName: user?.name || "",
          phone: user?.phone || "",
          email: user?.email || "",
          nidPassport: "",
          address: "",
          adults: parsedData.adults || 1,
          children: parsedData.children || 0,
          isKitchen: false,
          extraBed: false,
          note: "",
          paymentMethod: "later",
        });

        setPageLoading(false);
      } catch (error) {
        console.error("Error parsing booking data:", error);
        setError(error.message);
        Modal.error({
          title: "Invalid Booking Data",
          content: error.message || "Please restart your booking process.",
          onOk: () => router.push("/hotels"),
        });
      }
    };

    checkAuthAndData();
  }, [router, form, user]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);

    try {
      if (!bookingData) {
        throw new Error("Booking data not loaded");
      }

      const room = bookingData.selectedRooms[0];
      if (!room) {
        throw new Error("No room selected");
      }

      const totalBill = bookingData.selectedRooms.reduce(
        (sum, room) => sum + room.price,
        0
      );

      const kitchenTotalBill = isKitchen ? 500 : 0;
      const extraBedTotalBill = extraBed ? 1000 : 0;
      const finalTotalBill = totalBill + kitchenTotalBill + extraBedTotalBill;

      const bookingPayload = {
        fullName: values.fullName || "N/A",
        nidPassport: values.nidPassport || "N/A",
        address: values.address || "N/A",
        phone: values.phone || "N/A",
        email: values.email || "N/A",
        hotelName: bookingData.hotelName,
        hotelID: bookingData.hotelId,
        roomCategoryID: room.roomTypeId,
        roomCategoryName: room.roomType,
        roomNumberID: room.roomId,
        roomNumberName: room.roomNumber || "Not Specified",
        roomPrice: room.price,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        nights: bookingData.nights,
        adults: values.adults || 1,
        children: values.children || 0,
        totalBill: finalTotalBill,
        advancePayment: paymentMethod === "later" ? 0 : finalTotalBill,
        duePayment: paymentMethod === "later" ? finalTotalBill : 0,
        paymentMethod:
          paymentMethods.find((p) => p.value === paymentMethod)?.label ||
          "Pay Later",
        transactionId: values.transactionId || "N/A",
        isKitchen: isKitchen,
        extraBed: extraBed,
        kitchenTotalBill: kitchenTotalBill,
        extraBedTotalBill: extraBedTotalBill,
        bookedBy: user?.username || "N/A",
        bookedByID: user?._id || "N/A",
        updatedByID: user?._id || "N/A",
        bookingID: `BID-${Date.now()}`,
        bookingNo: `BN-${Math.floor(100000 + Math.random() * 900000)}`,
        serialNo: Math.floor(1000 + Math.random() * 9000),
        note: values.note || "N/A",
        statusID: 1,
        canceledBy: "N/A",
        reason: "N/A",
        reference: "N/A",
        createTime: new Date(),
      };

      const response = await coreAxios.post("/web/booking", bookingPayload);

      Modal.success({
        title: "Booking Confirmed!",
        content: "Your booking has been successfully confirmed.",
        onOk: () => {
          sessionStorage.removeItem("bookingData");
          router.push("/profile");
        },
      });
    } catch (error) {
      console.error("Booking error:", error);
      setError(
        error.response?.data?.message || error.message || "Booking failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Skeleton active paragraph={{ rows: 0 }} className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
              <Card>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
              <Card>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <Skeleton active paragraph={{ rows: 8 }} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Alert
            message="Booking Error"
            description={
              <div>
                <p>{error}</p>
                <p className="mt-2">Please go back and try again.</p>
              </div>
            }
            type="error"
            showIcon
            className="mb-6"
          />
          <Button
            type="primary"
            onClick={() => router.push("/hotels")}
            className="bg-blue-600"
            size="large"
          >
            Back to Hotels
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mb-10">
          <Title
            level={1}
            className="text-4xl font-bold text-gray-800 mb-2 font-serif"
          >
            Complete Your Booking
          </Title>
          <Text className="text-lg text-gray-600">
            Review your details and confirm your reservation
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information Card */}
            <Card
              title={
                <Text className="text-xl font-semibold text-gray-800">
                  Guest Information
                </Text>
              }
              className="shadow-sm rounded-lg border-0"
              headStyle={{
                borderBottom: "1px solid #e5e7eb",
                padding: "20px 24px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="fullName"
                    label={
                      <Text className="font-medium text-gray-700">
                        Full Name
                      </Text>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input size="large" className="rounded-lg h-12" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label={
                      <Text className="font-medium text-gray-700">
                        Phone Number
                      </Text>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                    ]}
                  >
                    <Input size="large" className="rounded-lg h-12" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <Text className="font-medium text-gray-700">Email</Text>
                    }
                  >
                    <Input size="large" className="rounded-lg h-12" />
                  </Form.Item>
                  <Form.Item
                    name="nidPassport"
                    label={
                      <Text className="font-medium text-gray-700">
                        NID/Passport
                      </Text>
                    }
                  >
                    <Input size="large" className="rounded-lg h-12" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={
                      <Text className="font-medium text-gray-700">Address</Text>
                    }
                    className="md:col-span-2"
                  >
                    <Input.TextArea rows={3} className="rounded-lg" />
                  </Form.Item>
                </div>
              </Form>
            </Card>

            {/* Stay Details Card */}
            <Card
              title={
                <Text className="text-xl font-semibold text-gray-800">
                  Stay Details
                </Text>
              }
              className="shadow-sm rounded-lg border-0"
              headStyle={{
                borderBottom: "1px solid #e5e7eb",
                padding: "20px 24px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="adults"
                  label={
                    <Text className="font-medium text-gray-700">Adults</Text>
                  }
                  initialValue={1}
                >
                  <InputNumber
                    min={1}
                    max={10}
                    size="large"
                    className="w-full rounded-lg h-12"
                  />
                </Form.Item>
                <Form.Item
                  name="children"
                  label={
                    <Text className="font-medium text-gray-700">Children</Text>
                  }
                  initialValue={0}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    size="large"
                    className="w-full rounded-lg h-12"
                  />
                </Form.Item>
                <div className="md:col-span-2 flex items-center">
                  <Switch
                    checked={isKitchen}
                    onChange={setIsKitchen}
                    className="mr-3"
                  />
                  <Text className="text-gray-700">
                    Kitchen Facility (+BDT 500)
                  </Text>
                </div>
                <div className="md:col-span-2 flex items-center">
                  <Switch
                    checked={extraBed}
                    onChange={setExtraBed}
                    className="mr-3"
                  />
                  <Text className="text-gray-700">Extra Bed (+BDT 1000)</Text>
                </div>
                <Form.Item
                  name="note"
                  label={
                    <Text className="font-medium text-gray-700">
                      Special Requests
                    </Text>
                  }
                  className="md:col-span-2"
                >
                  <Input.TextArea rows={3} className="rounded-lg" />
                </Form.Item>
              </div>
            </Card>

            {/* Payment Card */}
            <Card
              title={
                <Text className="text-xl font-semibold text-gray-800">
                  Payment Details
                </Text>
              }
              className="shadow-sm rounded-lg border-0"
              headStyle={{
                borderBottom: "1px solid #e5e7eb",
                padding: "20px 24px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <Form.Item
                name="paymentMethod"
                label={
                  <Text className="font-medium text-gray-700">
                    Payment Method
                  </Text>
                }
                initialValue="later"
                rules={[
                  { required: true, message: "Please select payment method" },
                ]}
              >
                <Select
                  size="large"
                  className="w-full rounded-lg h-12"
                  onChange={(value) => setPaymentMethod(value)}
                >
                  {paymentMethods.map((method) => (
                    <Option key={method.value} value={method.value}>
                      {method.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {paymentMethod !== "later" && (
                <div className="mt-6">
                  <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-100">
                    <Text className="block text-blue-800 font-medium mb-2 text-lg">
                      Payment Instructions
                    </Text>
                    <Text className="text-blue-700 block mb-1">
                      Send payment to:{" "}
                      <span className="font-bold">
                        {paymentMethod === "bKash"
                          ? "bKash: 017XXXXXXXX"
                          : paymentMethod === "Nagad"
                          ? "Nagad: 017XXXXXXXX"
                          : "Bank: ABC Bank, Account: 1234567890"}
                      </span>
                    </Text>
                    <Text className="text-blue-700 block">
                      Use booking ID as reference
                    </Text>
                  </div>
                  <Form.Item
                    name="transactionId"
                    label={
                      <Text className="font-medium text-gray-700">
                        Transaction ID
                      </Text>
                    }
                    rules={
                      paymentMethod !== "later"
                        ? [
                            {
                              required: true,
                              message: "Please enter transaction ID",
                            },
                          ]
                        : []
                    }
                  >
                    <Input size="large" className="rounded-lg h-12" />
                  </Form.Item>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <Card
              title={
                <Text className="text-xl font-semibold text-gray-800">
                  Booking Summary
                </Text>
              }
              className="shadow-lg rounded-lg border-0 sticky top-8"
              headStyle={{
                borderBottom: "1px solid #e5e7eb",
                padding: "20px 24px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div className="space-y-5">
                <div>
                  <Text className="text-gray-500 text-sm font-medium">
                    Hotel
                  </Text>
                  <Text className="text-gray-900 text-lg font-semibold">
                    {bookingData.hotelName}
                  </Text>
                </div>

                <Divider className="my-4" />

                <div className="space-y-3">
                  <Text className="text-gray-500 text-sm font-medium">
                    Dates
                  </Text>
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Check-in:</Text>
                    <Text className="text-gray-900 font-medium">
                      {dayjs(bookingData.checkInDate).format("DD MMM YYYY")}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Check-out:</Text>
                    <Text className="text-gray-900 font-medium">
                      {dayjs(bookingData.checkOutDate).format("DD MMM YYYY")}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Nights:</Text>
                    <Text className="text-gray-900 font-medium">
                      {bookingData.nights}
                    </Text>
                  </div>
                </div>

                <Divider className="my-4" />

                <div>
                  <Text className="text-gray-500 text-sm font-medium mb-3">
                    Room Details
                  </Text>
                  {bookingData.selectedRooms.map((room, index) => (
                    <div key={index} className="mb-4">
                      <Text className="block text-gray-900 font-medium">
                        {room.roomType}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {room.description}
                      </Text>
                      <Text className="block mt-2 text-lg font-semibold">
                        BDT {room.price.toLocaleString()}
                      </Text>
                    </div>
                  ))}
                </div>

                {isKitchen && (
                  <div className="flex justify-between pt-1">
                    <Text className="text-gray-600">Kitchen Facility:</Text>
                    <Text className="font-medium">BDT 500</Text>
                  </div>
                )}

                {extraBed && (
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Extra Bed:</Text>
                    <Text className="font-medium">BDT 1,000</Text>
                  </div>
                )}

                <Divider className="my-4" />

                <div className="flex justify-between items-center pt-2">
                  <Text className="text-lg font-semibold">Total Amount:</Text>
                  <Text className="text-2xl font-bold text-blue-600">
                    BDT{" "}
                    {(
                      bookingData.selectedRooms.reduce(
                        (sum, room) => sum + room.price,
                        0
                      ) +
                      (isKitchen ? 500 : 0) +
                      (extraBed ? 1000 : 0)
                    ).toLocaleString()}
                  </Text>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  onClick={() => form.submit()}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-lg mt-6 text-lg font-semibold"
                  size="large"
                >
                  {submitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
