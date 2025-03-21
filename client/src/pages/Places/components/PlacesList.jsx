import { Link } from "react-router-dom";

const PlacesList = ({ places, setPlace }) => {
  if (!places.length) return null;
  const handleClick = (place) => {
    setPlace(place);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4">
      {places.map((place) => {
        const {
          _id,
          title,
          description,
          address,
          photos,
          perks,
          checkIn,
          checkOut,
          maxGuests,
          price,
        } = place;
        return (
          <Link
            to={`update/${_id}`}
            key={_id}
            onClick={() => handleClick(place)}
            className="group flex flex-col md:flex-row lg:flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="relative md:w-2/5 lg:w-full aspect-[16/9] overflow-hidden">
              <img
                src={photos[0].secure_url}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="flex-1 p-4 md:p-6 flex flex-col gap-3 md:gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 line-clamp-1">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                    {address}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-gray-900">
                  <span className="font-medium">${price}</span>
                  <span className="text-gray-500 text-sm">/night</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span>Max. {maxGuests}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{checkIn} check-in</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{checkOut} check-out</span>
                </div>
              </div>

              {perks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {perks.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              )}

              <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit property
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default PlacesList;
