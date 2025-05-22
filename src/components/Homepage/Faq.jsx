"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Collapse, theme } from "antd";
import {
  QuestionCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { useToken } = theme;

const faqData = [
  {
    question: "How can I book a hotel room?",
    answer:
      "You can book a hotel room directly on our website by selecting your destination, dates, and preferred room type. Our platform offers real-time availability and instant confirmation.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies vary by property. Most hotels offer free cancellation up to 24-48 hours before check-in. During the booking process, you'll see the specific cancellation policy for your selected property.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No, we display all charges upfront including taxes and fees. The price you see during booking is the price you pay. Some hotels may require a security deposit upon arrival which will be refunded at checkout.",
  },
  {
    question: "How do I modify or cancel my booking?",
    answer:
      "You can manage your booking by logging into your account and visiting the 'My Bookings' section. For immediate assistance, our customer support team is available 24/7.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, Mastercard, American Express), mobile banking, and in some cases, cash payments upon arrival. Payment options are displayed during checkout.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard SSL encryption to protect all transactions. Your payment details are processed through secure payment gateways and we never store your full card information.",
  },
];

const FAQSection = () => {
  const { token } = useToken();
  const [activeKey, setActiveKey] = useState([]);

  const handlePanelChange = (keys) => {
    setActiveKey(keys);
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#061A6E]/5 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#061A6E] mb-4">
            Frequently Asked Questions
          </h2>
          <motion.div
            className="h-1 w-20 bg-[#061A6E] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about bookings, payments, and
            more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={handlePanelChange}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            bordered={false}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-[#061A6E]" />
              ) : (
                <PlusOutlined className="text-[#061A6E]" />
              )
            }
            expandIconPosition="end">
            {faqData.map((faq, index) => (
              <Panel
                key={index}
                header={
                  <div className="flex items-center py-3">
                    <QuestionCircleOutlined className="text-[#061A6E] text-lg mr-4" />
                    <span className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </span>
                  </div>
                }
                className="border-b border-gray-100 last:border-b-0"
                style={{
                  background: token.colorBgContainer,
                }}>
                <AnimatePresence>
                  {activeKey.includes(index.toString()) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <div className="pb-6 pl-10 pr-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Panel>
            ))}
          </Collapse>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}>
          <p className="text-gray-600 mb-6">
            Still have questions? Our team is here to help.
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-[#061A6E] hover:bg-[#0d2b9e] h-12 px-8">
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
