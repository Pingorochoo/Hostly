import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullScreenGallery from "./components/FullScreenGallery";
import PlaceGridPhotos from "./components/PlaceGridPhotos";
import BookingFormWidget from "./components/BookingFormWidget";

const Place = () => {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => setPlace(data));
  }, [id]);

  if (!place) return null;

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
    <div className="mt-6 p-6 md:p-10 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{place.title}</h1>
        <a
          href={`https://maps.google.com/?q=${place.address}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-primary hover:text-[#D60A48] transition font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          {place.address}
        </a>
      </div>

      <PlaceGridPhotos
        photos={place.photos}
        setShowAllPhotos={setShowAllPhotos}
      />

      <div className="grid gap-8 md:grid-cols-[2fr_1fr] mt-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Description
          </h2>
          <p className="text-gray-700 leading-6">{place.description}</p>

          <div className="mt-6 p-4 bg-white rounded-lg shadow-md border font-medium">
            <p>
              Check-in:&nbsp;
              <span className="text-gray-600">{place.checkIn}:00 hrs</span>
            </p>
            <p>
              Check-out:&nbsp;
              <span className="text-gray-600">{place.checkOut}:00 hrs</span>
            </p>
            <p>
              Max guests:&nbsp;
              <span className="text-gray-600">{place.maxGuests}</span>
            </p>
            <p>
              Price per night:&nbsp;
              <span className="font-semibold">${place.price}</span>
            </p>
          </div>

          {place.perks.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Amenities
              </h3>
              <ul className="text-gray-700 space-y-1">
                {place.perks.map((perk, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border max-h-fit">
          <BookingFormWidget place={place} />
        </div>
      </div>

      {place.extraInfo && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Additional Information
          </h3>
          <p className="text-gray-700 leading-6">{place.extraInfo}</p>
        </div>
      )}
    </div>
  );
};

export default Place;
