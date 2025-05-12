// pages/checkout.js
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
  { value: "later", label: "Pay Later at Hotel" },
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

  console.log("user", user);

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

        // Validate all required booking data
        const requiredFields = {
          selectedRooms: "array",
          hotelName: "string",
          hotelId: "number",
          checkInDate: "string",
          checkOutDate: "string",
          nights: "number",
        };

        const missingFields = [];
        const invalidFields = [];

        Object.entries(requiredFields).forEach(([field, type]) => {
          if (!parsedData[field]) {
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

        // Validate room data
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
          }
        });

        if (missingRoomFields.length > 0 || invalidRoomFields.length > 0) {
          let errorMessage = "Room data: ";
          if (missingRoomFields.length > 0) {
            errorMessage += `Missing fields: ${missingRoomFields.join(", ")}. `;
          }
          if (invalidRoomFields.length > 0) {
            errorMessage += `Invalid fields: ${invalidRoomFields.join(", ")}.`;
          }
          throw new Error(errorMessage);
        }

        // Format dates properly
        parsedData.checkInDate = dayjs(parsedData.checkInDate).toISOString();
        parsedData.checkOutDate = dayjs(parsedData.checkOutDate).toISOString();

        setBookingData(parsedData);

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
      // Final validation before submission
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
        // Guest Information
        fullName: values.fullName || "N/A",
        nidPassport: values.nidPassport || "N/A",
        address: values.address || "N/A",
        phone: values.phone || "N/A",
        email: values.email || "N/A",

        // Hotel Information
        hotelName: bookingData.hotelName,
        hotelID: bookingData.hotelId,

        // Room Information
        roomCategoryID: room.roomTypeId,
        roomCategoryName: room.roomType,
        roomNumberID: room.roomId,
        roomNumberName: room.roomNumber || "Not Specified",
        roomPrice: room.price,

        // Dates and Stay Details
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        nights: bookingData.nights,
        adults: values.adults || 1,
        children: values.children || 0,

        // Payment Information
        totalBill: finalTotalBill,
        advancePayment: paymentMethod === "later" ? 0 : finalTotalBill,
        duePayment: paymentMethod === "later" ? finalTotalBill : 0,
        paymentMethod:
          paymentMethods.find((p) => p.value === paymentMethod)?.label ||
          "Pay Later",
        transactionId: values.transactionId || "N/A",

        // Additional Services
        isKitchen: isKitchen,
        extraBed: extraBed,
        kitchenTotalBill: kitchenTotalBill,
        extraBedTotalBill: extraBedTotalBill,

        // Booking Metadata
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

      const response = await coreAxios.post("/booking", bookingPayload);

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
      <div className="bg-gray-50 min-h-screen py-8">
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
      <div className="bg-gray-50 min-h-screen py-8">
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
            size="large">
            Back to Hotels
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Title level={2} className="text-3xl font-bold mb-6 text-gray-800">
          Complete Your Booking
        </Title>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information Card */}
            <Card
              title={
                <Text strong className="text-lg">
                  Guest Information
                </Text>
              }
              className="shadow-sm">
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="fullName"
                    label={<Text strong>Full Name</Text>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}>
                    <Input
                      size="large"
                      placeholder="John Doe"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label={<Text strong>Phone Number</Text>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                    ]}>
                    <Input
                      size="large"
                      placeholder="+8801XXXXXXXXX"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<Text strong>Email</Text>}
                    rules={[
                      { type: "email", message: "Please enter a valid email" },
                    ]}>
                    <Input
                      size="large"
                      placeholder="john@example.com"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="nidPassport"
                    label={<Text strong>NID/Passport Number</Text>}>
                    <Input
                      size="large"
                      placeholder="Enter NID or Passport"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={<Text strong>Address</Text>}
                    className="md:col-span-2">
                    <Input.TextArea
                      rows={3}
                      placeholder="Your full address"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </div>
              </Form>
            </Card>

            {/* Stay Details Card */}
            <Card
              title={
                <Text strong className="text-lg">
                  Stay Details
                </Text>
              }
              className="shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="adults"
                  label={<Text strong>Adults</Text>}
                  initialValue={1}>
                  <InputNumber
                    min={1}
                    max={10}
                    size="large"
                    className="w-full rounded-lg"
                  />
                </Form.Item>
                <Form.Item
                  name="children"
                  label={<Text strong>Children</Text>}
                  initialValue={0}>
                  <InputNumber
                    min={0}
                    max={10}
                    size="large"
                    className="w-full rounded-lg"
                  />
                </Form.Item>
                <Form.Item
                  label={<Text strong>Kitchen Facility</Text>}
                  className="md:col-span-2">
                  <Switch
                    checked={isKitchen}
                    onChange={setIsKitchen}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                  <Text className="ml-2 text-gray-600">
                    Include kitchen facility (BDT 500)
                  </Text>
                </Form.Item>
                <Form.Item
                  label={<Text strong>Extra Bed</Text>}
                  className="md:col-span-2">
                  <Switch
                    checked={extraBed}
                    onChange={setExtraBed}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                  <Text className="ml-2 text-gray-600">
                    Include extra bed (BDT 1000)
                  </Text>
                </Form.Item>
                <Form.Item
                  name="note"
                  label={<Text strong>Special Requests</Text>}
                  className="md:col-span-2">
                  <Input.TextArea
                    rows={3}
                    placeholder="Any special requests or notes?"
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>
            </Card>

            {/* Payment Card */}
            <Card
              title={
                <Text strong className="text-lg">
                  Payment Details
                </Text>
              }
              className="shadow-sm">
              <Form.Item
                name="paymentMethod"
                label={<Text strong>Select Payment Method</Text>}
                initialValue="later"
                rules={[
                  { required: true, message: "Please select a payment method" },
                ]}>
                <Select
                  size="large"
                  onChange={(value) => setPaymentMethod(value)}
                  className="w-full rounded-lg">
                  {paymentMethods.map((method) => (
                    <Option key={method.value} value={method.value}>
                      {method.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {paymentMethod !== "later" && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                    <Text strong className="block text-blue-800 mb-2 text-lg">
                      Payment Instructions
                    </Text>
                    <Text className="text-blue-700 block">
                      Please send{" "}
                      {paymentMethod === "Bank" ? "the payment" : "money"} to:
                    </Text>
                    <Text className="font-bold text-blue-800 my-2 block text-lg">
                      {paymentMethod === "bKash"
                        ? "bKash: 017XXXXXXXX"
                        : paymentMethod === "Nagad"
                        ? "Nagad: 017XXXXXXXX"
                        : "Bank: ABC Bank, Account: 1234567890"}
                    </Text>
                    <Text className="text-blue-700 block">
                      Use your booking ID as reference. After payment, please
                      enter the transaction ID below.
                    </Text>
                  </div>

                  <Form.Item
                    name="transactionId"
                    label={<Text strong>Transaction ID</Text>}
                    rules={[
                      {
                        required: paymentMethod !== "later",
                        message: "Please enter your transaction ID",
                      },
                    ]}>
                    <Input
                      size="large"
                      placeholder="Enter transaction ID"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </>
              )}
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <Card
              title={
                <Text strong className="text-lg">
                  Booking Summary
                </Text>
              }
              className="shadow-sm sticky top-4">
              <div className="space-y-4">
                <div>
                  <Text strong className="text-gray-700 block text-base">
                    Hotel
                  </Text>
                  <Text className="text-gray-900 text-lg font-medium">
                    {bookingData.hotelName}
                  </Text>
                </div>

                <Divider className="my-3" />

                <div>
                  <Text strong className="text-gray-700 block text-base">
                    Dates
                  </Text>
                  <div className="flex justify-between mt-1">
                    <Text className="text-gray-600">Check-in:</Text>
                    <Text className="text-gray-900">
                      {dayjs(bookingData.checkInDate).format("DD MMM YYYY")}
                    </Text>
                  </div>
                  <div className="flex justify-between mt-1">
                    <Text className="text-gray-600">Check-out:</Text>
                    <Text className="text-gray-900">
                      {dayjs(bookingData.checkOutDate).format("DD MMM YYYY")}
                    </Text>
                  </div>
                  <div className="flex justify-between mt-1">
                    <Text className="text-gray-600">Nights:</Text>
                    <Text className="text-gray-900">{bookingData.nights}</Text>
                  </div>
                </div>

                <Divider className="my-3" />

                <div>
                  <Text strong className="text-gray-700 block text-base mb-2">
                    Room Details
                  </Text>
                  {bookingData.selectedRooms.map((room, index) => (
                    <div key={index} className="mb-4">
                      <Text strong className="block text-gray-800">
                        {room.roomType}
                      </Text>
                      <Text className="text-gray-600 text-sm block">
                        {room.description}
                      </Text>
                      <Text strong className="block mt-2 text-lg">
                        BDT {room.price.toLocaleString()}
                      </Text>
                    </div>
                  ))}
                </div>

                {isKitchen && (
                  <div className="flex justify-between pt-2">
                    <Text className="text-gray-600">Kitchen Facility:</Text>
                    <Text>BDT 500</Text>
                  </div>
                )}

                {extraBed && (
                  <div className="flex justify-between">
                    <Text className="text-gray-600">Extra Bed:</Text>
                    <Text>BDT 1,000</Text>
                  </div>
                )}

                <Divider className="my-3" />

                <div className="flex justify-between font-bold text-lg pt-2">
                  <Text>Total Amount:</Text>
                  <Text>
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold h-auto mt-4 text-lg border-0"
                  size="large">
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
