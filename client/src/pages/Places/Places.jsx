import { Link, useLocation, useParams } from "react-router-dom";
import PlaceForm from "./components/PlaceForm";
import { useEffect, useState } from "react";
import axios from "axios";
import PlacesList from "./components/PlacesList";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const { pathname } = useLocation();
  const { action } = useParams();
  const fetchUserPlaces = () => {
    if (pathname === "/account/places")
      axios.get("/places/user").then(({ data }) => {
        setPlaces(data);
      });
  };
  useEffect(() => {
    fetchUserPlaces();
  }, [pathname]);
  return (
    <div>
      {action === undefined && (
        <>
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 pr-6 pl-4 rounded-full mt-8"
              to="/account/places/new"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>
          <PlacesList places={places} />
        </>
      )}
      {(action === "new" || action === "update") && (
        <div>
          <PlaceForm />
        </div>
      )}
    </div>
  );
};

export default Places;
