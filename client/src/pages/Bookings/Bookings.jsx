import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import Booking from "./components/Booking";
import BookingListDateFormat from "./components/BookingListDateFormat";
import apiUrl from "../../../config/api";

const Bookings = () => {
  const [bookingsAndAccomodations, setBookingsAndAccomodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchUserBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/booking/user");
      setBookingsAndAccomodations(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section - Responsive for both mobile and desktop */}
      <div className="flex justify-between items-center flex-wrap gap-4 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Your Trips</h1>
          <p className="text-gray-500 mt-1 hidden md:block">Manage and view your travel itineraries</p>
        </div>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            onClick={() => fetchUserBookings()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span className="hidden md:inline">Refresh list</span>
            <span className="md:hidden">Refresh</span>
          </button>
        </div>
      </div>

      {bookingsAndAccomodations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No trips booked...yet!</h3>
          <p className="text-gray-600 mb-6">Time to dust off your bags and start planning your next adventure</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Start searching
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {bookingsAndAccomodations.map(({ _id, place, checkOutDate, checkInDate }) => {
            const numberOfNights = differenceInCalendarDays(
              new Date(checkOutDate),
              new Date(checkInDate)
            );
            
            return (
              <Link
                to={_id}
                key={_id}
                className="group flex flex-col md:flex-row lg:flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative md:w-2/5 lg:w-full aspect-[16/9]">
                  <img
                    src={apiUrl + place.photos[0]}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="flex-1 p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                  <div>
                    <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-1 line-clamp-1">{place.title}</h2>
                    <p className="text-gray-500 text-sm md:text-base line-clamp-1">{place.address}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <BookingListDateFormat checkOut={checkOutDate} checkIn={checkInDate} />
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-gray-900 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                      <span className="font-medium">${numberOfNights * place?.price}</span>
                      <span className="text-gray-500">total</span>
                    </div>

                    <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors hidden md:block">
                      View details
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings;
