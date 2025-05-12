import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Rating() {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/hotel/hotelList");

      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }

      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const chartData = hotels.map(hotel => ({
    name: hotel.hotelName,
    rating: parseFloat(hotel.rating),
    totalComments: hotel.totalComments
  }));

  return (
    <div className="p-6 bg-gray-100 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hotel Ratings and Reviews</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#38B2AC" name="Rating" barSize={30} />
            <Bar dataKey="totalComments" fill="#6C757D" name="Total Comments" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
