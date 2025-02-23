import { Link } from "react-router-dom";

const PlacesList = ({ places }) => {
  if (!places.length) return null;

  return (
    <div className="mt-4 flex flex-col gap-6">
      {places.map(
        ({
          _id,
          title,
          description,
          address,
          photos,
          perks,
          checkIn,
          checkOut,
          maxGuests,
        }) => (
          <Link
            to={`update/${_id}`}
            key={_id}
            className="flex gap-6 bg-gray-100 p-5 rounded-2xl shadow-md hover:bg-gray-200 transition"
          >
            <div className="w-40 h-40 flex-shrink-0">
              <img
                src={`http://localhost:5001/${photos?.[0]}`}
                alt={title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{address}</p>

                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                  {description}
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-700 flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Max. {maxGuests} huéspedes
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Check-in: {checkIn}
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  Check-out: {checkOut}
                </span>
              </div>

              {perks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {perks.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default PlacesList;
