"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { notification, Spin } from "antd";
import dynamic from "next/dynamic";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import coreAxios from "../../../utils/axiosInstance";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const customValue = {
      ...values,
      loginHistory: [],
    };

    try {
      const response = await coreAxios.post("/auth/web-register", customValue);
      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered. Please log in.",
          placement: "topRight",
          duration: 3,
        });
        console.log("Response Data:", response.data);
        setLoading(false);
        router.push("/login");
      } else {
        notification.error({
          message: "Something went wrong",
          description: "Please try again.",
          placement: "topRight",
          duration: 3,
        });
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        notification.error({
          message: "Registration failed",
          description: error.response.data.message || "Please try again.",
          placement: "topRight",
          duration: 3,
        });
        setLoading(false);
      }
    }
  };
  const whiteSpinner = (
    <LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 relative">
      <div className="absolute inset-0 bg-[url('/assets/images/room/room1.jpg')] bg-cover bg-center opacity-70"></div>
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg relative z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter first name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter last name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter phone number"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center mt-6"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Confirm password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center mb-6"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Address
              </label>
              <textarea
                name="address"
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 resize-none"
                placeholder="Enter address"
                {...formik.getFieldProps("address")}></textarea>
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex justify-center items-center"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <Spin indicator={whiteSpinner} className="mr-3" /> // Ant Design Spin component
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
