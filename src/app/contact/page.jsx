"use client";

import { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Skeleton } from "antd";
import { motion } from "framer-motion";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Message sent successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <EnvironmentOutlined className="text-[#061A6E] text-xl" />,
      title: "Experience Center",
      content: "N.H.A Building No- 09, Kolatoli, Cox's Bazar-4700",
    },
    {
      icon: <PhoneOutlined className="text-[#061A6E] text-xl" />,
      title: "Phone",
      content: "+8801811-822421",
    },
    {
      icon: <MailOutlined className="text-[#061A6E] text-xl" />,
      title: "Email",
      content: "fasttrackbookingbd@gmail.com",
    },
    {
      icon: <GlobalOutlined className="text-[#061A6E] text-xl" />,
      title: "Website",
      content: "fasttrackbookingbd.com",
    },
  ];

  const socialItems = [
    {
      icon: <FacebookOutlined className="text-[#061A6E] text-xl" />,
      title: "Facebook",
      url: "https://www.facebook.com/fasttrackbookingbd",
    },
    {
      icon: <WhatsAppOutlined className="text-[#061A6E] text-xl" />,
      title: "WhatsApp",
      url: "https://wa.me/8801811822421",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-32 text-center bg-[#061A6E] bg-opacity-90">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          {pageLoading ? (
            <>
              <Skeleton.Input
                active
                size="large"
                className="w-64 h-12 mx-auto mb-4"
              />
              <Skeleton.Input
                active
                size="default"
                className="w-96 h-6 mx-auto"
              />
            </>
          ) : (
            <>
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg text-white opacity-90 max-w-2xl mx-auto">
                Reach out to our team for any inquiries or assistance
              </motion.p>
            </>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {pageLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
            <Card>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}>
              <Card
                title="Our Contact Details"
                className="shadow-sm border-0 rounded-lg"
                headStyle={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  border: "none",
                  color: "#061A6E",
                }}>
                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start">
                      <div className="bg-[#061A6E] bg-opacity-10 p-3 rounded-lg mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Connect With Us
                    </h4>
                    <div className="flex space-x-4">
                      {socialItems.map((item, index) => (
                        <motion.a
                          key={index}
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-[#061A6E] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all">
                          {item.icon}
                          <span className="ml-2 text-[#061A6E]">
                            {item.title}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-[#061A6E] bg-opacity-10 p-3 rounded-lg mr-4">
                        <ClockCircleOutlined className="text-[#061A6E] text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Business Hours
                        </h4>
                        <p className="text-gray-600">
                          <span className="block">
                            Monday - Friday: 9:00 AM - 6:00 PM
                          </span>
                          <span className="block">
                            Saturday: 10:00 AM - 4:00 PM
                          </span>
                          <span className="block">Sunday: Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}>
              <Card
                title="Send Us a Message"
                className="shadow-sm border-0 rounded-lg"
                headStyle={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  border: "none",
                  color: "#061A6E",
                }}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Please input your name" },
                    ]}>
                    <Input size="large" placeholder="Your name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: "Please input your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}>
                    <Input size="large" placeholder="your.email@example.com" />
                  </Form.Item>

                  <Form.Item name="phone" label="Phone Number">
                    <Input size="large" placeholder="+880 1XXX-XXXXXX" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Your Message"
                    rules={[
                      { required: true, message: "Please input your message" },
                    ]}>
                    <TextArea rows={5} placeholder="How can we help you?" />
                  </Form.Item>

                  <Form.Item>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-[#061A6E] hover:bg-[#0d2b9e] border-none h-12">
                        Send Message
                      </Button>
                    </motion.div>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </div>
        )}
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative h-96 w-full bg-gray-200 overflow-hidden">
        {pageLoading ? (
          <Skeleton active className="h-full w-full" />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://maps.googleapis.com/maps/api/staticmap?center=Kolatoli,Cox's+Bazar&zoom=15&size=1600x900&maptype=roadmap&markers=color:red%7CKolatoli,Cox's+Bazar&key=YOUR_API_KEY')",
              }}
            />
            <div className="absolute inset-0 bg-[#061A6E] bg-opacity-20 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-4">
                <EnvironmentOutlined className="text-3xl text-[#061A6E] mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Our Location
                </h3>
                <p className="text-gray-600 mb-4">
                  {`N.H.A Building No- 09, Kolatoli, Cox's Bazar-4700`}
                </p>
                <Button
                  type="primary"
                  className="bg-[#061A6E] hover:bg-[#0d2b9e] border-none"
                  href="https://maps.google.com?q=N.H.A+Building+No-+09,+Kolatoli,+Cox's+Bazar-4700"
                  target="_blank">
                  Get Directions
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
