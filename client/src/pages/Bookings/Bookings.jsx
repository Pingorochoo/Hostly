import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import Booking from "./components/Booking";
import BookingListDateFormat from "./components/BookingListDateFormat";

const Bookings = () => {
  const [bookingsAndAccomodations, setBookingsAndAccomodations] = useState([]);
  const { id } = useParams();
  const fetchUserBookings = () => {
      axios
        .get("/booking/user")
        .then(({ data }) => setBookingsAndAccomodations(data));
  };
  useEffect(() => {
    fetchUserBookings();
  }, [id]);
  if (id) {
    const booking = bookingsAndAccomodations.find(
      (booking) => booking._id === id
    );
    if (booking) return <Booking booking={booking} />;
  }
  return (
    <div className="flex flex-col gap-2 mt-4">
      {bookingsAndAccomodations.length > 0 &&
        bookingsAndAccomodations.map(
          ({ _id, place, checkOutDate, checkInDate }) => {
            let numberOfNights = differenceInCalendarDays(
              new Date(checkOutDate),
              new Date(checkInDate)
            );
            return (
              <Link
                to={_id}
                key={_id}
                className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="min-w-fit h-32">
                  <img
                    src={"http://localhost:5001/" + place.photos[0]}
                    alt="place"
                    className="rounded-2xl w-32 h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl">{place.title}</h2>
                  <BookingListDateFormat
                    checkOut={checkOutDate}
                    checkIn={checkInDate}
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${numberOfNights * place?.price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          }
        )}
    </div>
  );
};

export default Bookings;
