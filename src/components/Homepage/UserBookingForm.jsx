"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, notification, Typography, Select } from "antd";
import coreAxios from "../../../utils/axiosInstance";

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CheckoutSchema = Yup.object().shape({
  userName: Yup.string().required("Full name is required"),
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  userPhone: Yup.string().required("Phone number is required"),
  userAddress: Yup.string().required("Address is required"),
  userNID: Yup.string().required("NID is required"),
  userGender: Yup.string().required("Gender is required"),
  noOfChild: Yup.number().default(0),
  noOfAdult: Yup.number().required("Number of adults is required"),
  noOfNights: Yup.number().required("Number of nights is required"),
  createdBy: Yup.string(),
  reason: Yup.string(),
});

const UserBookingForm = ({ bookingInfo, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));

  console.log("bookingInfo", bookingInfo);

  const handleOrderProcess = async (values) => {
    try {
      setLoading(true); // Start loading

      // Add userID from localStorage to the payload
      const payload = {
        ...values,
        userID: userInfo?._id, // Assuming userInfo contains the user's ID
        hotelID: bookingInfo.hotelID,
        hotelName: bookingInfo.hotelName,
        roomCategory: bookingInfo.roomCategory,
        roomName: bookingInfo.roomName,
        createdBy: userInfo?.username,
        roomName: bookingInfo?.roomNo,
      };
      console.log("-----", payload);

      // Make the API call
      const res = await coreAxios.post(`user-booking`, payload);

      if (res?.status === 200) {
        // Success: Show success message
        notification.success({
          message: "Success!",
          description: "Booking has been successfully created.",
        });
        handleCloseModal();
      } else {
        // Handle unexpected response
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      // Error: Show error message
      notification.error({
        message: "Error!",
        description:
          error.message || "There was an issue processing your booking.",
      });
    } finally {
      setLoading(false); // Stop loading (runs regardless of success or error)
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-md shadow-lg my-8">
      <h2 className="text-center text-xl lg:text-2xl font-semibold text-green-600 mb-6">
        Provide Booking Information
      </h2>
      <Formik
        initialValues={{
          userName: userInfo?.username || "",
          userEmail: userInfo?.email || "",
          userPhone: "",
          userAddress: "",
          userNID: "",
          userGender: "",
          noOfChild: 0,
          noOfAdult: 1,
          noOfNights: 1,
          bookingPrice: 0,
          createdBy: "",
          reason: "",
        }}
        validationSchema={CheckoutSchema}
        onSubmit={handleOrderProcess}>
        {({ errors, touched }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Field name="userName">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter your full name"
                  />
                )}
              </Field>
              {errors.userName && touched.userName ? (
                <div className="text-red-500 text-xs">{errors.userName}</div>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <Field name="userEmail">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter your email"
                  />
                )}
              </Field>
              {errors.userEmail && touched.userEmail ? (
                <div className="text-red-500 text-xs">{errors.userEmail}</div>
              ) : null}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Field name="userPhone">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter your phone number"
                  />
                )}
              </Field>
              {errors.userPhone && touched.userPhone ? (
                <div className="text-red-500 text-xs">{errors.userPhone}</div>
              ) : null}
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">Address</label>
              <Field name="userAddress">
                {({ field }) => (
                  <TextArea
                    {...field}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter your delivery address"
                  />
                )}
              </Field>
              {errors.userAddress && touched.userAddress ? (
                <div className="text-red-500 text-xs">{errors.userAddress}</div>
              ) : null}
            </div>

            {/* NID Number */}
            <div>
              <label className="text-sm font-medium">NID Number</label>
              <Field name="userNID">
                {({ field }) => (
                  <Input
                    {...field}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter your NID number"
                  />
                )}
              </Field>
              {errors.userNID && touched.userNID ? (
                <div className="text-red-500 text-xs">{errors.userNID}</div>
              ) : null}
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium">Gender</label>
              <Field name="userGender">
                {({ field, form }) => (
                  <Select
                    {...field}
                    value={field.value || undefined} // Ensure placeholder appears
                    onChange={(value) => form.setFieldValue(field.name, value)}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Select your gender">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                )}
              </Field>

              {errors.userGender && touched.userGender ? (
                <div className="text-red-500 text-xs">{errors.userGender}</div>
              ) : null}
            </div>

            {/* Number of Children */}
            <div>
              <label className="text-sm font-medium">Number of Children</label>
              <Field name="noOfChild">
                {({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter number of children"
                  />
                )}
              </Field>
              {errors.noOfChild && touched.noOfChild ? (
                <div className="text-red-500 text-xs">{errors.noOfChild}</div>
              ) : null}
            </div>

            {/* Number of Adults */}
            <div>
              <label className="text-sm font-medium">Number of Adults</label>
              <Field name="noOfAdult">
                {({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Enter number of adults"
                  />
                )}
              </Field>
              {errors.noOfAdult && touched.noOfAdult ? (
                <div className="text-red-500 text-xs">{errors.noOfAdult}</div>
              ) : null}
            </div>

            <div>
              <h2>Booking Details</h2>
              <p>Hotel: {bookingInfo.hotelName}</p>
              <p>Check-in: {bookingInfo.checkInDate}</p>
              <p>Check-out: {bookingInfo.checkOutDate}</p>
              <p>Number of Nights: {bookingInfo.numberOfNights}</p>
              <p>Room Category: {bookingInfo.roomCategory}</p>
              <p>Room Number: {bookingInfo.roomNo}</p>
              <p>Total Bill: </p>
              {/* Add your form fields here */}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-right">
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="bg-green-600 text-sm text-white rounded-md">
                Confirm Booking
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserBookingForm;
