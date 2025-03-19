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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8">
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {place.title}
        </h1>

        <div className="flex items-center gap-6 mb-6">
          <a
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
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
              className="w-5 h-5"
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
            <span>{place.address}</span>
          </a>
          {place.perks && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{place.perks?.length} amenities</span>
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">
                Booking Details
              </h2>
              <div className="space-y-2">
                <BookingListDateFormat
                  checkOut={checkOutDate}
                  checkIn={checkInDate}
                />
                <p className="text-gray-600">
                  <span className="font-medium">{numberOfNights}</span>{" "}
                  {numberOfNights === 1 ? "night" : "nights"}
                </p>
                {place.checkIn && place.checkOut && (
                  <div className="text-gray-600">
                    <p>Check-in: {place.checkIn}</p>
                    <p>Check-out: {place.checkOut}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-primary p-6 text-white rounded-xl w-full text-center transform hover:scale-105 transition-transform">
                <div className="text-lg mb-2">Total Price</div>
                <div className="text-4xl font-bold">
                  ${place.price * numberOfNights}
                </div>
                <div className="text-sm mt-2">${place.price} per night</div>
              </div>
            </div>
          </div>
        </div>

        {place.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              About this place
            </h2>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
          </div>
        )}

        {place.perks && place.perks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {place.perks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-8 pb-8">
        <PlaceGridPhotos
          photos={place?.photos}
          setShowAllPhotos={setShowAllPhotos}
        />
      </div>
    </div>
  );
};

export default Booking;
