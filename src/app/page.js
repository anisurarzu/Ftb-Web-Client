import Homepage from "@/components/Homepage/Homepage";

import getAllHotelList from "@/dataFetch/getAllHotelList";
import getAllHotels from "@/dataFetch/getAllHotels";

export default async function Home() {
  // const hotels = await getAllHotels();
  // const hotelList = await getAllHotelList();

  return (
    <main className="bg-base-100">
      <Homepage hotels={[]} hotelList={[]} />
    </main>
  );
}
