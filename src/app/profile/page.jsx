"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaClipboardList, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { Spin } from "antd"; 
import Order from "@/components/profile/Order";
import WishList from "@/components/profile/WishList";
import Account from "@/components/profile/Account";
import Rating from "@/components/profile/Rating";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
  const [selectedTab, setSelectedTab] = useState("User Account");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
          setLoading(false);
        }
      }, 1000);
    }
  }, [router]);

  const tabs = [
    { name: "User Account", icon: <FaUser /> },
    { name: "Bookings", icon: <FaClipboardList /> },
    { name: "Wish List", icon: <FaHeart /> },
    { name: "Reviews & Ratings", icon: <FaStar /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" style={{ color: "#0d9488" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <div className="bg-teal-700 text-white py-32 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-3 -mt-28">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <h1 className="text-xl font-semibold">Hi, {user || "User"}</h1>
            <p className="text-sm">Genius Level 1</p>
          </div>
        </div>
        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm md:mt-0 -mt-28">
          You’re 5 bookings away from Genius Level 2
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-4 rounded-lg shadow-md mx-4 md:mx-12 -mt-24 relative z-10">
          <div className="flex gap-4 overflow-auto text-center text-sm font-medium">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={`p-4 rounded-lg w-40 cursor-pointer flex flex-col items-center gap-2 ${
                  selectedTab === tab.name
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTab(tab.name)}>
                {tab.icon}
                {tab.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto p-4">
        {selectedTab === "User Account" && <Account mail={mail} user={user} />}
        {selectedTab === "Bookings" && <Order />}
        {selectedTab === "Wish List" && <WishList />}
        {selectedTab === "Reviews & Ratings" && <Rating />}
      </div>
    </div>
  );
}
