import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PlaceForm from "./components/PlaceForm";
import PlacesList from "./components/PlacesList";

const Places = () => {
  const { action, id } = useParams();
  const { pathname } = useLocation();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetchUserPlaces();
  }, [pathname]);
  const fetchUserPlaces = async () => {
    try {
      if (pathname === "/account/places") {
        const { data } = await axios.get("/places/user");
        setPlaces(data);
        setPlace(null);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserPlaceToUpdate = async () => {
    try {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data);
    } catch (error) {
      console.error("Error fetching place:", error);
    }
  };
  if (action === "new") {
    return <PlaceForm />;
  }

  if (action === "update") {
    if (!place) {
      fetchUserPlaceToUpdate();
    }
    return place ? <PlaceForm place={place} /> : null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Properties
          </h1>
          <p className="text-gray-500 mt-1 hidden md:block">
            Manage and update your property listings
          </p>
        </div>
        <Link
          to="new"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Property
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : places.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No properties yet
          </h2>
          <p className="text-gray-500 mb-6">
            Get started by adding your first property
          </p>
          <Link
            to="new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Your First Property
          </Link>
        </div>
      ) : (
        <PlacesList places={places} setPlace={setPlace} />
      )}
    </div>
  );
};

export default Places;
