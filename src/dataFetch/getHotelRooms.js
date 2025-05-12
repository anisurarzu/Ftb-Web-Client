export default async function getHotelRooms(id) {
  const result = await fetch(
    `https://fasttrack-booking-server.onrender.com/api/hotel/room/${id}`
  );
  return result.json();
  /*  */
}
