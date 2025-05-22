"use client";

import { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreAddOutlined,
  PhoneOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [token, setToken] = useState(null);

  const pathname = usePathname(); // dynamically updates on navigation

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Home", href: "/", icon: <HomeOutlined /> },
    { label: "About", href: "/about", icon: <InfoCircleOutlined /> },
    { label: "Services", href: "/service", icon: <AppstoreAddOutlined /> },
    { label: "Contact", href: "/contact", icon: <PhoneOutlined /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-white shadow-lg backdrop-blur-sm bg-opacity-95"
          : "bg-white"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <img
                  src="https://i.ibb.co.com/8QVXLJT/Whats-App-Image-2025-05-08-at-15-01-06-removebg-preview.png"
                  alt="Brand Logo"
                  className="h-20 w-auto object-contain"
                />
                <span className="text-xl font-semibold text-[#061A6E] hidden md:block font-['Poppins'] uppercase">
                  Fastrack Booking
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link href={item.href}>
                  <div
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all font-['Inter'] ${
                      pathname === item.href
                        ? "text-[#061A6E] font-semibold relative"
                        : "text-gray-600 hover:text-[#061A6E]"
                    }`}>
                    {pathname === item.href && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#061A6E]"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Auth Buttons */}
            <div className="ml-6 flex items-center space-x-3">
              {token ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link href="/profile">
                      <Button
                        type="text"
                        className="flex items-center text-[#061A6E] hover:text-[#061A6E] hover:bg-gray-100 px-4 py-1 rounded-lg font-['Inter']"
                        icon={<FiUser className="mr-2" />}>
                        Profile
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleLogout}
                      type="text"
                      danger
                      className="flex items-center px-4 py-1 rounded-lg hover:bg-red-50 font-['Inter']"
                      icon={<LogoutOutlined className="mr-2" />}>
                      Logout
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Link href="/login">
                    <Button
                      type="primary"
                      className="bg-[#061A6E] hover:bg-[#0d2b9e] flex items-center px-6 py-1 h-9 rounded-lg shadow-md hover:shadow-lg transition-all font-['Inter']"
                      icon={<LoginOutlined className="mr-2" />}>
                      Login
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {token && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/profile">
                  <FiUser className="h-5 w-5 text-[#061A6E]" />
                </Link>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDrawer}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#061A6E] hover:bg-gray-100 focus:outline-none">
              <MenuOutlined className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center font-['Poppins']">
            <img
              src="https://i.ibb.co.com/8QVXLJT/Whats-App-Image-2025-05-08-at-15-01-06-removebg-preview.png"
              alt="Brand Logo"
              className="h-8 w-auto mr-3"
            />
            <span className="text-lg font-semibold text-[#061A6E]">
              Fastrack Booking
            </span>
          </div>
        }
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{ padding: 0 }}
        headerStyle={{
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 20px",
        }}
        width="280px"
        closable={true}
        className="custom-drawer">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Link href={item.href}>
                  <div
                    className={`px-5 py-3 flex items-center border-b border-gray-100 transition-colors font-['Inter'] ${
                      pathname === item.href
                        ? "bg-[#061A6E] bg-opacity-10 text-[#061A6E] font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={toggleDrawer}>
                    <span className="mr-3 text-base">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            {token ? (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}>
                <Button
                  block
                  size="middle"
                  danger
                  onClick={() => {
                    handleLogout();
                    toggleDrawer();
                  }}
                  icon={<LogoutOutlined className="mr-2" />}
                  className="flex items-center justify-center h-10 text-sm font-medium font-['Inter']">
                  Logout
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}>
                <Link href="/login">
                  <Button
                    block
                    type="primary"
                    size="middle"
                    onClick={toggleDrawer}
                    icon={<LoginOutlined className="mr-2" />}
                    className="bg-[#061A6E] hover:bg-[#0d2b9e] flex items-center justify-center h-10 text-sm font-medium shadow-md font-['Inter']">
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </Drawer>

      <style jsx global>{`
        .custom-drawer .ant-drawer-content {
          border-radius: 12px 0 0 0 !important;
        }
        .custom-drawer .ant-drawer-header {
          border-radius: 12px 0 0 0 !important;
        }
      `}</style>
    </nav>
  );
}
