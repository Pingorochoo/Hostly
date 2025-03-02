import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [places, setPlaces] = useState([]);
  const fetchPlaces = async () => {
    const { data: places } = await axios.get("/places");
    setPlaces(places);
  };
  useEffect(() => {
    fetchPlaces();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-4 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 rounded-2xl h-60 overflow-hidden">
              <img
                src={"http://localhost:5001/" + place.photos[0]}
                className="rounded-2xl object-cover h-full w-full"
                alt="place"
              />
            </div>
            <h2 className="font-bold mt-2">{place.title}</h2>
            <h3 className="text-sm text-gray-500">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span>/ per night
            </div>
          </Link>
        ))}
    </div>
  );
};
export default Index;
