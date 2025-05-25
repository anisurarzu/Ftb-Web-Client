import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Steps, Card } from "antd";
import {
  DownOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import coreAxios from "../../../utils/axiosInstance";

const Order = () => {
  const [viewProgress, setViewProgress] = useState(false); // To track view mode (Table vs Steps)
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userBooking, setUserBooking] = useState([]);
  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));

  useEffect(() => {
    getUserBookingByID();
  }, []);

  const getUserBookingByID = async () => {
    try {
      const res = await coreAxios.get(`/bookings/user/${userInfo?._id}`);
      if (res?.status === 200) {
        setUserBooking(res?.data);
      }
    } catch (err) {}
  };

  const columns = [
    {
      title: "Booking No",
      dataIndex: "bookingNo",
      key: "bookingNo",
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
    },
    {
      title: "Room Category",
      dataIndex: "roomCategory",
      key: "roomCategory",
    },
    {
      title: "Price",
      dataIndex: "bookingPrice",
      key: "bookingPrice",
      render: (text) => `$${text}`,
    },
    {
      title: "No of Nights",
      dataIndex: "noOfNights",
      key: "noOfNights",
    },
    {
      title: "No of Adults",
      dataIndex: "noOfAdult",
      key: "noOfAdult",
    },
    {
      title: "No of Children",
      dataIndex: "noOfChild",
      key: "noOfChild",
    },
    {
      title: "Status",
      dataIndex: "statusID",
      key: "statusID",
      render: (statusID) => (statusID === 1 ? "Confirmed" : "Pending"), // Customize based on your status IDs
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button className="bg-teal-500 text-white" icon={<DownOutlined />}>
            Actions
          </Button>
        </Dropdown>
      ),
    },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1" className="text-red-500 hover:text-red-700">
        Cancel
      </Menu.Item>
      <Menu.Item
        key="2"
        className="text-yellow-500 hover:text-yellow-700"
        onClick={() => {
          setSelectedRecord(record); // Store selected record for booking details
          setViewProgress(true); // Switch to progress view
        }}>
        Progress Status
      </Menu.Item>
    </Menu>
  );

  const data = [
    {
      key: "1",
      bookingNo: "B001",
      roomNo: "101",
      hotelName: "Hotel ABC",
      roomCategory: "Deluxe",
      price: 120,
      noOfNights: 3,
    },
    {
      key: "2",
      bookingNo: "B002",
      roomNo: "102",
      hotelName: "Hotel XYZ",
      roomCategory: "Standard",
      price: 80,
      noOfNights: 2,
    },
    // Add more data here
  ];

  const steps = [
    {
      title: "Step 1",
      description: "Step 1 description",
    },
    {
      title: "Step 2",
      description: "Step 2 description",
    },
    {
      title: "Step 3",
      description: "Step 3 description",
    },
  ];

  return (
    <div className="p-2">
      {viewProgress ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Button
                onClick={() => setViewProgress(false)}
                className="mr-2 bg-gray-200 text-gray-700 p-2 rounded-md"
                icon={<ArrowLeftOutlined />}>
                Back to Table
              </Button>
              <Button
                className="bg-green-500 text-white p-2 rounded-md"
                icon={<FileTextOutlined />}>
                Invoice
              </Button>
            </div>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6">
            <div className="text-xl font-semibold mb-4">Booking Details</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Booking No:</span>
                <span>{selectedRecord.bookingNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Room No:</span>
                <span>{selectedRecord.roomNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hotel Name:</span>
                <span>{selectedRecord.hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Room Category:</span>
                <span>{selectedRecord.roomCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${selectedRecord.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">No of Nights:</span>
                <span>{selectedRecord.noOfNights}</span>
              </div>
            </div>
          </Card>

          <Steps current={1} items={steps} />
        </div>
      ) : (
        <div>
          <div className="text-xl font-bold text-gray-700 mb-2">
            Booking List
          </div>
          <Table
            columns={columns}
            dataSource={userBooking}
            bordered
            pagination={{ pageSize: 5 }}
            className=""
            rowClassName="hover:bg-gray-100 transition-colors"
          />
        </div>
      )}
    </div>
  );
};

export default Order;
