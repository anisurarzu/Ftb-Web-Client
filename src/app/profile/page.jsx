"use client";
import {
  Alert,
  Modal,
  Spin,
  Upload,
  message,
  Card,
  Divider,
  Tag,
  Skeleton,
  Tabs,
  Avatar,
  Button,
  Badge,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  StarOutlined,
  LockOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
// import ChangePassword from "./ChangePassword";
// import UpdateProfile from "./UpdateProfile";
// import OrderHistory from "./OrderHistory";
// import Wishlist from "./Wishlist";
// import Reviews from "./Reviews";

const { TabPane } = Tabs;

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = () => {
      if (typeof window !== "undefined") {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        setTimeout(() => {
          if (!token) {
            router.push("/login");
          } else {
            setUserData({
              ...userInfo,
              // Mock additional data for demonstration
              joinDate: new Date().toISOString(),
              orders: 5,
              wishlistItems: 12,
              reviews: 8,
              verificationStatus: "pending",
              profileCompletion: 75,
            });
            setLoading(false);
          }
        }, 1000);
      }
    };

    fetchUserData();
  }, [router]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const renderVerificationStatus = () => {
    if (!userData) return null;

    switch (userData.verificationStatus) {
      case "verified":
        return (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Verified
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<SyncOutlined spin />} color="orange">
            Pending Verification
          </Tag>
        );
      default:
        return (
          <Tag icon={<CloseCircleOutlined />} color="red">
            Not Verified
          </Tag>
        );
    }
  };

  const ProfileHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <Badge
              count={
                <CameraOutlined className="text-white bg-blue-500 p-1 rounded-full" />
              }
              offset={[-10, 80]}>
              <Avatar
                size={96}
                src={userData?.image || "https://via.placeholder.com/150"}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
            </Badge>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              {renderVerificationStatus()}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">
              {userData?.username || "User"}
              <span className="ml-2 text-sm font-normal bg-blue-500 px-2 py-1 rounded">
                Member
              </span>
            </h1>
            <p className="text-blue-100">
              <MailOutlined className="mr-1" />
              {userData?.email || "user@example.com"}
            </p>
            <p className="text-blue-100">
              Member since{" "}
              {new Date(userData?.joinDate || new Date()).toLocaleDateString()}
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <Button
                onClick={() => setIsProfileModalOpen(true)}
                icon={<EditOutlined />}
                className="bg-white text-blue-600 hover:bg-blue-50">
                Edit Profile
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                icon={<LockOutlined />}
                className="bg-white text-blue-600 hover:bg-blue-50">
                Change Password
              </Button>
            </div>
          </div>
          <div className="ml-auto hidden md:block">
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow">
              <div className="font-medium">Genius Level 1</div>
              <div className="text-sm">{`You're 5 bookings away from Level 2`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsCard = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card className="text-center border-0 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">
          {userData?.orders || 0}
        </div>
        <div className="text-gray-500">Orders</div>
      </Card>
      <Card className="text-center border-0 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">
          {userData?.wishlistItems || 0}
        </div>
        <div className="text-gray-500">Wishlist</div>
      </Card>
      <Card className="text-center border-0 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">
          {userData?.reviews || 0}
        </div>
        <div className="text-gray-500">Reviews</div>
      </Card>
    </div>
  );

  const ProfileSkeleton = () => (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <Skeleton.Avatar active size={96} shape="circle" />
            </div>
            <div className="text-center md:text-left">
              <Skeleton.Input active style={{ width: 200, height: 32 }} />
              <Skeleton.Input
                active
                style={{ width: 180, height: 20 }}
                className="mt-2"
              />
              <Skeleton.Input
                active
                style={{ width: 220, height: 20 }}
                className="mt-1"
              />
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                <Skeleton.Button active size="default" shape="round" />
                <Skeleton.Button active size="default" shape="round" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileHeader />
          <div className="container mx-auto p-6">
            <StatsCard />

            <Card className="shadow-sm">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabPosition="top"
                size="large">
                <TabPane
                  tab={
                    <span>
                      <UserOutlined />
                      Account
                    </span>
                  }
                  key="account">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Info */}
                    <Card
                      title="Personal Information"
                      bordered={false}
                      className="border border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">Username</div>
                          <div className="font-medium">
                            {userData?.username}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">{userData?.email}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Member Since
                          </div>
                          <div className="font-medium">
                            {new Date(userData?.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Account Status */}
                    <Card
                      title="Account Status"
                      bordered={false}
                      className="border border-gray-200">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Profile Completion</span>
                          <Tag
                            color={
                              userData.profileCompletion > 75
                                ? "green"
                                : "orange"
                            }>
                            {userData.profileCompletion}%
                          </Tag>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Verification Status</span>
                          {renderVerificationStatus()}
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Account Type</span>
                          <Tag color="blue">Standard</Tag>
                        </div>
                      </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card
                      title="Quick Actions"
                      bordered={false}
                      className="border border-gray-200">
                      <div className="space-y-2">
                        <Button
                          block
                          icon={<EditOutlined />}
                          onClick={() => setIsProfileModalOpen(true)}>
                          Edit Profile
                        </Button>
                        <Button
                          block
                          icon={<LockOutlined />}
                          onClick={() => setIsModalOpen(true)}>
                          Change Password
                        </Button>
                        <Button block icon={<IdcardOutlined />}>
                          Verify Identity
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <ShoppingOutlined />
                      Orders
                    </span>
                  }
                  key="orders">
                  {/* <OrderHistory /> */}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <HeartOutlined />
                      Wishlist
                    </span>
                  }
                  key="wishlist">
                  {/* <Wishlist /> */}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <StarOutlined />
                      Reviews
                    </span>
                  }
                  key="reviews">
                  {/* <Reviews /> */}
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </>
      )}

      {/* Modals */}
      {/* <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <ChangePassword onCancel={handleCancel} />
      </Modal>
      <Modal
        title="Update Profile"
        open={isProfileModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <UpdateProfile userData={userData} onCancel={handleCancel} />
      </Modal> */}
    </div>
  );
}
