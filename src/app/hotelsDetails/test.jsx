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
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import coreAxios from "@/components/coreAxios/Axios";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const paymentMethods = [
  { value: "bKash", label: "bKash" },
  { value: "Nagad", label: "Nagad" },
];

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [submitting, setSubmitting] = useState(false);
  const [isKitchen, setIsKitchen] = useState(false);
  const [extraBed, setExtraBed] = useState(false);
  const [error, setError] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);

  const checkAuthAndData = () => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const storedBookingData = sessionStorage.getItem("bookingData");

    if (!token || !userInfo) {
      sessionStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
      return false;
    }

    if (!storedBookingData) {
      Modal.error({
        title: "Booking Data Missing",
        content: "Your booking session has expired. Please start again.",
        onOk: () => router.push("/hotels"),
      });
      return false;
    }

    try {
      const parsedData = JSON.parse(storedBookingData);
      setBookingData(parsedData);
      form.setFieldsValue({
        fullName: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        adults: parsedData.adults || 1,
        children: parsedData.children || 0,
        paymentMethod: "bKash",
      });
      setPageLoading(false);
      return true;
    } catch (error) {
      console.error("Error parsing booking data:", error);
      setError(error.message);
      Modal.error({
        title: "Invalid Booking Data",
        content: "Please restart your booking process.",
        onOk: () => router.push("/hotels"),
      });
      return false;
    }
  };

  useEffect(() => {
    checkAuthAndData();
  }, [router, form, user]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isImage && isLt2M;
  };

  const handleUpload = async (file) => {
    setUploadingScreenshot(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=06b717af6db1d3e1fd24a7d34d1ad80f",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setPaymentScreenshot(result.data.url);
        message.success("Payment screenshot uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload payment screenshot");
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);

    try {
      if (!bookingData) throw new Error("Booking data not loaded");

      const room = bookingData.selectedRooms[0];
      if (!room) throw new Error("No room selected");

      const totalBill = bookingData.selectedRooms.reduce(
        (sum, room) => sum + room.price,
        0
      );

      const finalTotalBill =
        totalBill + (isKitchen ? 500 : 0) + (extraBed ? 1000 : 0);

      // Prepare booking payload
      const bookingPayload = {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        nidPassport: values.nidPassport || "N/A",
        address: values.address || "N/A",
        hotelName: bookingData.hotelName,
        hotelID: bookingData.hotelId,
        roomCategoryID: room.categoryId,
        roomCategoryName: room.categoryName,
        roomPrice: room.price,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        nights: bookingData.nights,
        adults: values.adults,
        children: values.children,
        totalBill: finalTotalBill,
        advancePayment: finalTotalBill,
        duePayment: 0,
        paymentMethod: paymentMethods.find((p) => p.value === paymentMethod)
          ?.label,
        transactionId: "not available",
        paymentScreenshot: paymentScreenshot,
        isKitchen,
        extraBed,
        kitchenTotalBill: isKitchen ? 500 : 0,
        extraBedTotalBill: extraBed ? 1000 : 0,
        bookedBy: user?.username,
        bookedByID: user?._id,
        bookingID: `BID-${Date.now()}`,
        bookingNo: `BN-${Math.floor(100000 + Math.random() * 900000)}`,
        note: values.note || "N/A",
        statusID: 1,
      };

      const response = await coreAxios.post("/bookings", bookingPayload);

      Modal.success({
        title: "Booking Confirmed!",
        content: (
          <div>
            <p>Your booking has been successfully confirmed.</p>
            <p className="mt-2">
              Transaction ID: <strong>{values.transactionId}</strong>
            </p>
          </div>
        ),
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
      message.error(
        error.response?.data?.message || error.message || "Booking failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || pageLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorPage error={error} router={router} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GuestInfoCard form={form} />
            <StayDetailsCard
              form={form}
              bookingData={bookingData}
              isKitchen={isKitchen}
              setIsKitchen={setIsKitchen}
              extraBed={extraBed}
              setExtraBed={setExtraBed}
            />
            <PaymentDetailsCard
              form={form}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentMethods={paymentMethods}
              beforeUpload={beforeUpload}
              handleUpload={handleUpload}
              paymentScreenshot={paymentScreenshot}
              uploadingScreenshot={uploadingScreenshot}
            />
          </div>

          <BookingSummaryCard
            bookingData={bookingData}
            isKitchen={isKitchen}
            extraBed={extraBed}
            form={form}
            submitting={submitting}
            paymentMethod={paymentMethod}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

// Component for loading state
const LoadingSkeleton = () => (
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

// Component for error state
const ErrorPage = ({ error, router }) => (
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

// Component for page header
const PageHeader = () => (
  <div className="mt-8 mb-10">
    <Title level={1} className="text-4xl font-bold text-gray-800 mb-2">
      Complete Your Booking
    </Title>
    <Text className="text-lg text-gray-600">
      Review your details and confirm your reservation
    </Text>
  </div>
);

// Component for guest information form
const GuestInfoCard = ({ form }) => (
  <Card
    title={
      <Text className="text-xl font-semibold text-gray-800">
        Guest Information
      </Text>
    }
    className="shadow-sm rounded-lg border-0"
    headStyle={{ borderBottom: "1px solid #e5e7eb", padding: "20px 24px" }}
    bodyStyle={{ padding: "24px" }}
  >
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="fullName"
          label={<Text className="font-medium text-gray-700">Full Name</Text>}
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input size="large" className="rounded-lg h-12" />
        </Form.Item>
        <Form.Item
          name="phone"
          label={
            <Text className="font-medium text-gray-700">Phone Number</Text>
          }
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input size="large" className="rounded-lg h-12" />
        </Form.Item>
        <Form.Item
          name="email"
          label={<Text className="font-medium text-gray-700">Email</Text>}
        >
          <Input size="large" className="rounded-lg h-12" />
        </Form.Item>
        <Form.Item
          name="nidPassport"
          label={
            <Text className="font-medium text-gray-700">NID/Passport</Text>
          }
        >
          <Input size="large" className="rounded-lg h-12" />
        </Form.Item>
        <Form.Item
          name="address"
          label={<Text className="font-medium text-gray-700">Address</Text>}
          className="md:col-span-2"
        >
          <Input.TextArea rows={3} className="rounded-lg" />
        </Form.Item>
      </div>
    </Form>
  </Card>
);

// Component for stay details form
const StayDetailsCard = ({
  form,
  bookingData,
  isKitchen,
  setIsKitchen,
  extraBed,
  setExtraBed,
}) => (
  <Card
    title={
      <Text className="text-xl font-semibold text-gray-800">Stay Details</Text>
    }
    className="shadow-sm rounded-lg border-0"
    headStyle={{ borderBottom: "1px solid #e5e7eb", padding: "20px 24px" }}
    bodyStyle={{ padding: "24px" }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Form.Item
        name="adults"
        label={<Text className="font-medium text-gray-700">Adults</Text>}
        initialValue={bookingData?.adults || 1}
        rules={[
          { required: true, message: "Please enter number of adults" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const room = bookingData?.selectedRooms?.[0];
              if (!room || value <= (room.adultCount || 10)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  `Maximum ${room.adultCount} adults allowed for this room`
                )
              );
            },
          }),
        ]}
      >
        <InputNumber
          min={1}
          max={bookingData?.selectedRooms?.[0]?.adultCount || 10}
          size="large"
          className="w-full rounded-lg h-12"
        />
      </Form.Item>
      <Form.Item
        name="children"
        label={<Text className="font-medium text-gray-700">Children</Text>}
        initialValue={bookingData?.children || 0}
        rules={[
          { required: true, message: "Please enter number of children" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const room = bookingData?.selectedRooms?.[0];
              if (!room || value <= (room.childCount || 5)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  `Maximum ${room.childCount} children allowed for this room`
                )
              );
            },
          }),
        ]}
      >
        <InputNumber
          min={0}
          max={bookingData?.selectedRooms?.[0]?.childCount || 5}
          size="large"
          className="w-full rounded-lg h-12"
        />
      </Form.Item>
      <div className="md:col-span-2 flex items-center">
        <Switch checked={isKitchen} onChange={setIsKitchen} className="mr-3" />
        <Text className="text-gray-700">Kitchen Facility (+BDT 500)</Text>
      </div>
      <div className="md:col-span-2 flex items-center">
        <Switch checked={extraBed} onChange={setExtraBed} className="mr-3" />
        <Text className="text-gray-700">Extra Bed (+BDT 1000)</Text>
      </div>
      <Form.Item
        name="note"
        label={
          <Text className="font-medium text-gray-700">Special Requests</Text>
        }
        className="md:col-span-2"
      >
        <Input.TextArea rows={3} className="rounded-lg" />
      </Form.Item>
    </div>
  </Card>
);

// Component for payment details
const PaymentDetailsCard = ({
  form,
  paymentMethod,
  setPaymentMethod,
  paymentMethods,
  beforeUpload,
  handleUpload,
  paymentScreenshot,
  uploadingScreenshot,
}) => (
  <Card
    title={
      <Text className="text-xl font-semibold text-gray-800">
        Payment Details
      </Text>
    }
    className="shadow-sm rounded-lg border-0"
    headStyle={{ borderBottom: "1px solid #e5e7eb", padding: "20px 24px" }}
    bodyStyle={{ padding: "24px" }}
  >
    <Form.Item
      name="paymentMethod"
      label={<Text className="font-medium text-gray-700">Payment Method</Text>}
      initialValue="bKash"
      rules={[{ required: true, message: "Please select payment method" }]}
    >
      <Select
        size="large"
        className="w-full rounded-lg h-12"
        onChange={(value) => {
          setPaymentMethod(value);
        }}
      >
        {paymentMethods.map((method) => (
          <Option key={method.value} value={method.value}>
            {method.label}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <div className="mt-6">
      <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-100">
        <Text className="block text-blue-800 font-medium mb-2 text-lg">
          {paymentMethod} Payment Instructions
        </Text>
        {paymentMethod === "bKash" ? (
          <>
            <Text className="text-blue-700 block mb-1">
              1. Open bKash app and go to "Send Money"
            </Text>
            <Text className="text-blue-700 block mb-1">
              2. Send money to: <strong>017XXXXXXXX</strong>
            </Text>
            <Text className="text-blue-700 block mb-1">
              3. Enter amount:{" "}
              <strong>BDT {form.getFieldValue("totalBill") || "XXX"}</strong>
            </Text>
            <Text className="text-blue-700 block mb-1">
              4. Use your phone number as reference
            </Text>
            <Text className="text-blue-700 block mb-1">
              5. Enter the transaction ID below
            </Text>
            <Text className="text-blue-700 block">
              6. Upload payment screenshot for verification
            </Text>
          </>
        ) : (
          <>
            <Text className="text-blue-700 block mb-1">
              1. Open Nagad app and go to "Send Money"
            </Text>
            <Text className="text-blue-700 block mb-1">
              2. Send money to: <strong>016XXXXXXXX</strong>
            </Text>
            <Text className="text-blue-700 block mb-1">
              3. Enter amount:{" "}
              <strong>BDT {form.getFieldValue("totalBill") || "XXX"}</strong>
            </Text>
            <Text className="text-blue-700 block mb-1">
              4. Use your phone number as reference
            </Text>
            <Text className="text-blue-700 block mb-1">
              5. Enter the transaction ID below
            </Text>
            <Text className="text-blue-700 block">
              6. Upload payment screenshot for verification
            </Text>
          </>
        )}
      </div>

      {/* <Form.Item
        name="transactionId"
        label={
          <Text className="font-medium text-gray-700">Transaction ID</Text>
        }
        rules={[
          { required: true, message: "Please enter transaction ID" },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "Invalid transaction ID format",
          },
        ]}
      >
        <Input
          size="large"
          className="rounded-lg h-12"
          placeholder={`Enter ${paymentMethod} Transaction ID`}
        />
      </Form.Item> */}

      <Form.Item
        label={
          <Text className="font-medium text-gray-700">Payment Screenshot</Text>
        }
        required
        help="Upload a clear screenshot of your payment confirmation"
      >
        <Dragger
          name="paymentScreenshot"
          multiple={false}
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleUpload(file)}
          showUploadList={false}
          accept="image/*"
          className="rounded-lg"
        >
          {paymentScreenshot ? (
            <div className="p-4">
              <img
                src={paymentScreenshot}
                alt="Payment screenshot"
                className="max-h-40 mx-auto"
              />
              <Text className="block mt-2 text-green-600">
                Screenshot uploaded successfully
              </Text>
            </div>
          ) : (
            <div className="p-8">
              <p className="ant-upload-drag-icon">
                <UploadOutlined className="text-blue-500 text-2xl" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to upload payment screenshot
              </p>
              <p className="ant-upload-hint">Supports JPG, PNG up to 2MB</p>
            </div>
          )}
        </Dragger>
        {uploadingScreenshot && (
          <Text className="block text-blue-500 mt-2">Uploading...</Text>
        )}
      </Form.Item>
    </div>
  </Card>
);

// Component for booking summary
const BookingSummaryCard = ({
  bookingData,
  isKitchen,
  extraBed,
  form,
  submitting,
  paymentMethod,
  handleSubmit,
}) => {
  const calculateTotal = () => {
    if (!bookingData?.selectedRooms) return 0;
    const roomTotal = bookingData.selectedRooms.reduce(
      (sum, room) => sum + room.price,
      0
    );
    return roomTotal + (isKitchen ? 500 : 0) + (extraBed ? 1000 : 0);
  };

  return (
    <div className="lg:col-span-1">
      <Card
        title={
          <Text className="text-xl font-semibold text-gray-800">
            Booking Summary
          </Text>
        }
        className="shadow-lg rounded-lg border-0 sticky top-8"
        headStyle={{ borderBottom: "1px solid #e5e7eb", padding: "20px 24px" }}
        bodyStyle={{ padding: "24px" }}
      >
        <div className="space-y-5">
          <div>
            <Text className="text-gray-500 text-sm font-medium">Hotel</Text>
            <Text className="text-gray-900 text-lg font-semibold">
              {bookingData.hotelName}
            </Text>
          </div>

          <Divider className="my-4" />

          <div className="space-y-3">
            <Text className="text-gray-500 text-sm font-medium">Dates</Text>
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
                  {room.categoryName}
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
              BDT {calculateTotal().toLocaleString()}
            </Text>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            onClick={() =>
              form
                .validateFields()
                .then(handleSubmit)
                .catch(() => {})
            }
            className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-lg mt-6 text-lg font-semibold"
            size="large"
          >
            {submitting ? "Processing..." : "Confirm Booking"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
