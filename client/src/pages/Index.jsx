import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlaceCard = ({ place }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,
    pauseOnHover: false
  };

  return (
    <Link
      to={"/place/" + place._id}
      className="block group transition-transform hover:scale-[1.02] duration-200"
    >
      <div className="aspect-[4/3] mb-3 rounded-2xl overflow-hidden shadow-sm">
        <Slider {...settings} className="h-full">
          {place.photos.map((photo, index) => (
            <div key={index} className="relative w-full h-full aspect-[4/3]">
              <img
                src={photo.secure_url}
                className="object-cover object-center w-full h-full group-hover:brightness-95 transition-all duration-200"
                alt={place.title}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-1">
          <h2 className="font-medium text-[15px] text-gray-900 truncate">
            {place.title}
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {place.rating?.toFixed(1) || "New"}
          </div>
        </div>
        <p className="text-[15px] text-gray-500 truncate">{place.address}</p>
        <p className="text-[15px] text-gray-500">
          <span className="text-gray-900 font-medium">${place.price}</span>{" "}
          night
        </p>
      </div>
    </Link>
  );
};

const Index = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get("/places");
      setPlaces(data);
    } catch (err) {
      setError("Couldn't load places. Please try again later.");
      console.error("Failed to fetch places:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 mx-auto mb-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900">
            Something went wrong
          </h2>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={fetchPlaces}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4 animate-pulse">
            <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
            <div className="space-y-2.5">
              <div className="flex justify-between items-start gap-2">
                <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
                <div className="h-4 bg-gray-200 rounded-lg w-8" />
              </div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
              <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {places.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>

      {places.length === 0 && (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto mb-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900">
              No places found
            </h2>
            <p className="text-gray-500">Be the first to add a place!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
