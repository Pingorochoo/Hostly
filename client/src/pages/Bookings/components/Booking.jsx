import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import BookingListDateFormat from "./BookingListDateFormat";
import PlaceGridPhotos from "../../../components/PlaceGridPhotos";
import FullScreenGallery from "../../../components/FullScreenGallery";

const Booking = ({ booking: { place, checkOutDate, checkInDate } }) => {
  const numberOfNights = differenceInCalendarDays(
    new Date(checkOutDate),
    new Date(checkInDate)
  );
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <FullScreenGallery
        photos={place.photos}
        title={place.title}
        setShowAllPhotos={setShowAllPhotos}
      />
    );
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingListDateFormat checkOut={checkOutDate} checkIn={checkInDate} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${place.price * numberOfNights}</div>
        </div>
      </div>
      <PlaceGridPhotos
        photos={place?.photos}
        setShowAllPhotos={setShowAllPhotos}
      />
    </div>
  );
};

export default Booking;
