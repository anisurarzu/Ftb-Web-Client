"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaWallet,
  FaRegCreditCard,
  FaUser,
  FaLock,
  FaUsers,
  FaCogs,
  FaEnvelope,
  FaPlane,
  FaHeart,
  FaStar,
  FaHeadset,
  FaShieldAlt,
  FaBookOpen,
  FaCamera,
} from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setUser(userInfo?.username);
        setProfileImage(userInfo?.profileImage || null);
      }
    }
  }, [router]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Profile Completion Banner */}
      <div className="bg-white p-6 shadow-md rounded-lg mx-4 md:mx-12 my-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Complete your profile</h2>
          <p className="text-sm text-gray-600">
            Complete your profile and use this information for your next booking
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaCamera className="w-10 h-10 text-gray-400" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <div className="flex gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
              Complete now
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
              Not now
            </button>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Payment Information */}
        <ProfileCard
          title="Payment information"
          options={[
            { icon: <FaWallet />, text: "Rewards & Wallet" },
            { icon: <FaRegCreditCard />, text: "Payment methods" },
          ]}
        />

        {/* Manage Account */}
        <ProfileCard
          title="Manage account"
          options={[
            { icon: <FaUser />, text: "Personal details" },
            { icon: <FaLock />, text: "Security settings" },
            { icon: <FaUsers />, text: "Other travellers" },
          ]}
        />

        {/* Preferences */}
        <ProfileCard
          title="Preferences"
          options={[
            { icon: <FaCogs />, text: "Customisation preferences" },
            { icon: <FaEnvelope />, text: "Email preferences" },
          ]}
        />

        {/* Travel Activity */}
        <ProfileCard
          title="Travel activity"
          options={[
            { icon: <FaPlane />, text: "Trips and bookings" },
            { icon: <FaHeart />, text: "Saved lists" },
            { icon: <FaStar />, text: "My reviews" },
          ]}
        />

        {/* Help and Support */}
        <ProfileCard
          title="Help and support"
          options={[
            { icon: <FaHeadset />, text: "Contact customer service" },
            { icon: <FaShieldAlt />, text: "Safety resource centre" },
            { icon: <FaBookOpen />, text: "Dispute resolution" },
          ]}
        />

        {/* Legal and Privacy */}
        <ProfileCard
          title="Legal and privacy"
          options={[
            { icon: <FaShieldAlt />, text: "Privacy and data management" },
            { icon: <FaBookOpen />, text: "Content guidelines" },
          ]}
        />
      </div>
    </div>
  );
}

const ProfileCard = ({ title, options }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md"
          >
            <div className="flex items-center gap-3 text-gray-700">
              {option.icon}
              <span>{option.text}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
};
