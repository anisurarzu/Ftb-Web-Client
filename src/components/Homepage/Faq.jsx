"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Collapse } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const faqData = [
  {
    question: "How can I book a hotel room?",
    answer:
      "You can book a hotel room directly on our website by selecting your destination, dates, and preferred room type.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Our cancellation policy varies depending on the hotel and rate selected. Please check the booking details for more information.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No, all charges including taxes and fees will be displayed during the booking process.",
  },
  {
    question: "How do I modify or cancel my booking?",
    answer:
      "You can modify or cancel your booking by visiting the 'My Bookings' section of our website and following the instructions.",
  },
];

const FAQSection = () => {
  const [activeKey, setActiveKey] = useState([]);

  const handlePanelChange = (keys) => {
    setActiveKey(keys);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="h-1 w-20 bg-green-500 mx-auto mb-12 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <AnimatePresence>
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={handlePanelChange}
            className="bg-white  rounded-2xl overflow-hidden"
            bordered={false}>
            {faqData.map((faq, index) => (
              <Panel
                key={index}
                header={
                  <div className="flex items-center">
                    <QuestionCircleOutlined className="text-green-600 text-xl mr-3" />
                    <span className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </span>
                  </div>
                }
                className="bg-gray-50 p-5 border-none hover:bg-gray-100 transition-all">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </motion.p>
              </Panel>
            ))}
          </Collapse>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQSection;
