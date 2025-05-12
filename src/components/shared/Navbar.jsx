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

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [token, setToken] = useState(null);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setToken(token);
      setActiveLink(window.location.pathname);
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
          ? "bg-white shadow-lg backdrop-blur-sm bg-opacity-90"
          : "bg-white"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co.com/8QVXLJT/Whats-App-Image-2025-05-08-at-15-01-06-removebg-preview.png"
                  alt="Brand Logo"
                  className="h-12 w-auto sm:h-14"
                />
                <span className="ml-2 text-xl font-semibold text-[#061A6E] hidden sm:block"></span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link href={item.href}>
                  <div
                    className={`px-1 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                      activeLink === item.href
                        ? "text-[#061A6E] border-b-2 border-[#061A6E]"
                        : "text-[#061A6E] hover:text-[#061A6E] hover:opacity-80"
                    }`}>
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-4">
              {token ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link href="/profile">
                      <Button
                        type="text"
                        className="flex items-center text-[#061A6E] hover:text-[#061A6E] hover:opacity-80"
                        icon={<FiUser className="mr-1" />}>
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
                      className="flex items-center text-[#061A6E] hover:text-[#061A6E] hover:opacity-80"
                      icon={<LogoutOutlined className="mr-1" />}>
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
                      className="bg-[#061A6E] hover:bg-[#061A6E] hover:opacity-90 flex items-center text-white"
                      icon={<LoginOutlined className="mr-1" />}>
                      Login
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            {token && (
              <Link href="/profile" className="mr-4">
                <FiUser className="h-6 w-6 text-[#061A6E]" />
              </Link>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDrawer}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#061A6E] hover:opacity-80 focus:outline-none"
              aria-expanded="false">
              <MenuOutlined className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <img
              src="https://i.ibb.co.com/8QVXLJT/Whats-App-Image-2025-05-08-at-15-01-06-removebg-preview.png"
              alt="Brand Logo"
              className="h-8 w-auto mr-2"
            />
            <span className="text-lg font-semibold text-[#061A6E]">Menu</span>
          </div>
        }
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ borderBottom: "1px solid #f0f0f0" }}
        width="280px">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`px-4 py-3 flex items-center border-b border-gray-100 ${
                    activeLink === item.href
                      ? "bg-gray-100 text-[#061A6E]"
                      : "text-[#061A6E] hover:bg-gray-50"
                  }`}
                  onClick={toggleDrawer}>
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            {token ? (
              <Button
                block
                onClick={() => {
                  handleLogout();
                  toggleDrawer();
                }}
                icon={<LogoutOutlined />}
                className="mb-2 text-[#061A6E] hover:text-[#061A6E]">
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  block
                  type="primary"
                  onClick={toggleDrawer}
                  icon={<LoginOutlined />}
                  className="bg-[#061A6E] hover:bg-[#061A6E] text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
