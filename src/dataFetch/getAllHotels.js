export default async function getAllHotels() {
  const result = await fetch(
    `https://fasttrack-booking-server.onrender.com/api/getHotelsDropdown`
  );
  return result.json();
}
