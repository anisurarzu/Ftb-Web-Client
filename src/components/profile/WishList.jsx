import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const hotels = [
  {
    id: 1,
    name: "Samudra Bari",
    location: "Cox Bazar",
    image: "/assets/images/room/smb1.jpg",
    price: "$250/night",
  },
  {
    id: 2,
    name: "Shopno Bilash Holiday Suites",
    location: "Cox Bazar",
    image: "/assets/images/room/sb1.jpg",
    price: "$400/night",
  },
  {
    id: 3,
    name: "Mermaid Baywatch Resort",
    location: "Cox bazar",
    image: "/assets/images/room/mb1.jpg",
    price: "$180/night",
  },
];

const WishList = () => {
  const [wishlist, setWishlist] = useState(hotels);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((hotel) => hotel.id !== id));
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-semibold text-teal-500 mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {wishlist.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white overflow-hidden transition-transform transform hover:scale-105"
            >
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.location}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-teal-500 font-bold">{hotel.price}</span>
                  <button onClick={() => removeFromWishlist(hotel.id)} className="text-red-500 hover:text-red-700 transition">
                    <FaHeart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
