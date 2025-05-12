/* eslint-disable @next/next/no-img-element */
"use client";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Carousel, Rate } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots, FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import coreAxios from "../../../utils/axiosInstance";

const Services = ({ hotelList }) => {
  console.log("hotelList2", hotelList);
  const [likedRooms, setLikedRooms] = useState({});
  const [ratings, setRatings] = useState({});
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [comments, setComments] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [rating, setRating] = useState(0); // Store user rating
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleStarClick = (value) => {
    setRating(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("token");
      setUserID(userInfo?._id);
      setUserName(userInfo?.username);
      setUserImg(userInfo?.image);
      setToken(token);
    }
  }, []);

  const toggleLike = async (hotelID) => {
    if (!token) {
      return router.push("/login"); // Redirect to login if no token
    }
    try {
      const hotel = hotelList.find((hotel) => hotel.hotelID === hotelID);
      const userLike = hotel?.likes?.find((like) => like.userID === userID);
      const newIsLiked = userLike ? !userLike.isLiked : true;
      setLikedRooms((prev) => ({
        ...prev,
        [hotelID]: newIsLiked,
      }));
      const response = await fetch("http://localhost:8000/api/hotel/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelID, userID, isLiked: newIsLiked }),
      });

      if (response.ok) {
        console.log("Post Successfully");
      }
    } catch (error) {
      console.error("Error liking hotel:", error);
    }
  };

  useEffect(() => {
    const initialLikes = hotelList.reduce((acc, hotel) => {
      const sortedLikes = hotel.likes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const userLike = sortedLikes.find((like) => like.userID === userID);
      if (userLike) {
        acc[hotel.hotelID] = userLike.isLiked;
      } else {
        acc[hotel.hotelID] = false;
      }
      return acc;
    }, {});
    setLikedRooms(initialLikes);
  }, [hotelList, userID]);
  //Rating Functionality
  const handleRatingChange = async (hotelID, value) => {
    if (!token) {
      return router.push("/login"); // Redirect to login if no token
    }
    try {
      setRatings((prev) => ({
        ...prev,
        [hotelID]: value,
      }));

      await fetch("http://localhost:8000/api/hotel/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelID, userID, rating: value }),
      });
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  console.log("userIMGGGG", userImg);
  const defaultUrl = "https://randomuser.me/api/portraits/men/1.jpg";

  //Comment Functionality
  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = async (hID) => {
    if (!token) {
      return router.push("/login"); // Redirect to login if no token
    }
    console.log("Hotel ID", hID);
    if (!newComment.trim()) return alert("Please enter a comment!");
    if (!rating) return alert("Please select a rating!"); // Ensure a rating is selected

    const imageUrl = "https://randomuser.me/api/portraits/men/1.jpg";
    const commentData = {
      userID: userInfo?._id,
      userName: userInfo?.username,
      comment: newComment,
      rating: rating, // Include the rating
      hotelID: isModalOpen?.hotelID,
      imageUrl: imageUrl,
    };

    try {
      const response = await coreAxios.post(`hotel/comment`, commentData);

      if (response.ok || response.status === 201) {
        setNewComment(""); // Clear input field
        setRating(0); // Reset rating after submission
        fetchComments(isModalOpen?.hotelID);
      } else {
        alert("Failed to add comment!");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const fetchComments = async (hotelID) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/hotel/${hotelID}/comments`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComments([]); // Reset comments
  };

  return (
    <div className="text-slate-800 mb-24 bg-gray-200 py-12 px-4">
      <div className="text-center container mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
          Our Hotels
          <span className="block w-12 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit amet.
          Nulla mattis, urna et posuere ornare, neque leo dapibus ante, nec
          dignissim.
        </p>
      </div>
      <div className="container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-10 md:px-20">
        {hotelList?.map((room) => (
          <div
            key={room?.hotelID}
            className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="relative">
              <Carousel autoplay>
                {room?.hotelImages?.map((imgObj, index) => (
                  <img
                    key={index}
                    src={imgObj.image}
                    alt={room?.name}
                    className="w-full h-56 object-cover"
                  />
                ))}
              </Carousel>
              <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-sm font-semibold shadow-md">
                🏆 Guest favorite
              </div>
              <button
                className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-xl bg-white rounded-full shadow-md"
                onClick={() => toggleLike(room.hotelID)}>
                {likedRooms[room.hotelID] ? (
                  <HeartFilled className="text-red-500" />
                ) : (
                  <HeartOutlined className="text-gray-600" />
                )}
              </button>
            </div>

            {/* Room Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center border-b border-gray-200 pb-3">
                <Link
                  href={`/services/${room?.hotelID}`}
                  className="text-teal-500 font-semibold hover:underline text-sm">
                  {room?.hotelName}
                </Link>
              </h3>

              <div className="mt-3 text-gray-600 space-y-2 text-sm">
                <p>
                  <strong>{room.location}</strong>
                </p>
                <p>
                  Stay with {room.hostName} &bull; {room.hostProfession}
                </p>
                <p>{room.date}</p>
                <p className="font-bold">${room.price} / night</p>
              </div>

              {/* Rating */}
              <div className="mt-3 flex justify-between items-center">
                <Rate
                  value={ratings[room.hotelID] || room.rating}
                  // onChange={(value) => handleRatingChange(room.hotelID, value)}
                  onClick={() => {
                    fetchComments(room.hotelID); // Call API to fetch comments
                    setIsModalOpen(room); // Open modal
                  }}
                  allowHalf
                  className="text-yellow-500"
                />
                <div className="flex items-center gap-2">
                  <FaRegCommentDots
                    className="text-gray-600 hover:text-gray-800 cursor-pointer text-lg"
                    onClick={() => {
                      fetchComments(room.hotelID); // Call API to fetch comments
                      setIsModalOpen(room); // Open modal
                    }}
                  />
                  <span className="font-semibold text-gray-800">
                    {room?.totalComments}
                  </span>
                </div>
                {/* <span className="font-semibold text-gray-800">
                  {ratings[room.hotelID] || room.rating}
                </span> */}
              </div>
              {/* Modal start */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 p-4 text-sm">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[500px] relative flex flex-col">
                    <IoClose
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl"
                      onClick={() => {
                        closeModal();
                        setIsModalOpen(false);
                      }}
                    />
                    <div className="border rounded-md p-4 mb-4 mt-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold">{userName}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`cursor-pointer text-2xl transition ${
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleStarClick(star)}>
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        rows="3"
                        className="w-full border-none focus:ring-0 focus:outline-none mt-2 text-gray-700"
                        placeholder={
                          !token ? "Please Login First" : "Write a Review..."
                        }
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={!token}
                      />
                      <div className="flex justify-end items-center mt-2">
                        <button
                          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                          onClick={() => handleCommentSubmit(room?.hotelID)}
                          disabled={!newComment}>
                          Submit Review
                        </button>
                      </div>
                    </div>
                    {/* Scrollable Comment List */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                      {comments?.map((comment, index) => (
                        <div key={index} className="p-3 border-b flex gap-3">
                          <img
                            src={
                              comment.imageUrl === "undefined"
                                ? defaultUrl
                                : comment.imageUrl
                            }
                            alt="User"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <span className="font-semibold text-teal-500">
                              {comment.userName}
                            </span>
                            <div className="flex gap-1 text-yellow-500">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                  {comment.rating >= star ? "★" : "☆"}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-700">{comment.comment}</p>
                            <div className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                              ,{" "}
                              {new Date(comment.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Modal End */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
