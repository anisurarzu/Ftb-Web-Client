export default async function getAllHotelList() {
  const result = await fetch(
    `https://fasttrack-booking-server.onrender.com/api/hotel/hotelList`
  );

  return result.json();
}
