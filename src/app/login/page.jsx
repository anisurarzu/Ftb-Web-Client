"use client";

import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import coreAxios from "../../../utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // Get redirect path from query params or default to profile
  const redirect = searchParams.get("redirect") || "/profile";

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    publicIP: "",
    privateIP: "",
  });

  useEffect(() => {
    // Get Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => console.error("Error getting location:", error)
      );
    }

    // Get Public IP
    const fetchPublicIP = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setLocation((prev) => ({ ...prev, publicIP: data.ip }));
      } catch (error) {
        console.error("Error fetching public IP:", error);
      }
    };
    fetchPublicIP();

    // Get Private IP (WebRTC Trick)
    const getPrivateIP = async () => {
      try {
        const peerConnection = new RTCPeerConnection({ iceServers: [] });
        peerConnection.createDataChannel("");
        peerConnection
          .createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer));

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            const ipMatch = event.candidate.candidate.match(
              /(?:\d{1,3}\.){3}\d{1,3}/
            );
            if (ipMatch) {
              setLocation((prev) => ({ ...prev, privateIP: ipMatch[0] }));
            }
          }
        };
      } catch (error) {
        console.error("Error getting private IP:", error);
      }
    };
    getPrivateIP();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = {
        username: email,
        password: password,
        latitude: location.latitude,
        longitude: location.longitude,
        publicIP: location.publicIP,
        privateIP: location.privateIP,
        loginTime: new Date(),
      };
      const response = await coreAxios.post("/auth/web-login", loginData);
      if (response.status === 200) {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
          placement: "topRight",
          duration: 3,
        });

        // Store token and user info
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));

        // Update auth context
        login(response.data);

        // Redirect to the intended page or profile
        router.push(redirect);
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description:
          error.response?.data?.message ||
          "Invalid credentials, please try again.",
        placement: "topRight",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const whiteSpinner = (
    <LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 relative">
      <div className="absolute inset-0 bg-[url('/assets/images/room/room1.jpg')] bg-cover bg-center opacity-70"></div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg relative z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="userName">
              User Name
            </label>
            <input
              type="userName"
              id="userName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your User Name"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
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
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-sm text-teal-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex justify-center items-center"
            disabled={loading}>
            {loading ? (
              <Spin indicator={whiteSpinner} className="mr-3" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-6 flex flex-col space-y-4">
          <button className="w-full flex items-center justify-center border py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <FcGoogle className="w-6 h-6 mr-2" /> Login with Google
          </button>
          <button className="w-full flex items-center justify-center border py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <FaFacebook className="w-6 h-6 mr-2 text-blue-600" /> Login with
            Facebook
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <a href="/registration" className="text-teal-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
