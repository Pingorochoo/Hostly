import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BookingFormWidget = ({ place }) => {
  const initialForm = {
    placeId: "",
    checkInDate: "",
    checkOutDate: "",
    guests: "1",
    numberNights: 0,
  };
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    setForm((prev) => ({ ...prev, placeId: place._id }));
  }, [place]);
  if (!place) return;
  function handleForm(e) {
    const { name, value } = e.target;
    if (name === "checkInDate" || name === "checkOutDate") {
      let nights = 0;
      const checkInDate =
        name === "checkInDate" ? new Date(value) : new Date(form.checkInDate);
      const checkOutDate =
        name === "checkOutDate" ? new Date(value) : new Date(form.checkOutDate);
      nights = differenceInCalendarDays(checkOutDate, checkInDate);
      setForm((prev) => ({
        ...prev,
        numberNights: nights,
      }));
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function booking() {
    axios.post("/booking", form).then(({ data }) => console.log(data));
    navigate("/account/bookings");
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl overflow-hidden">
      <h3 className="text-2xl">Price: ${place?.price} / per night</h3>
      <div className="border rounded-2xl mt-4">
        <div className="flex flex-col sm:flex-row">
          <div className="py-3 px-4 grow">
            <label>Check in date:</label>
            <input
              type="date"
              className="text-right max-w-[120px]"
              name="checkInDate"
              value={form.checkInDate}
              onChange={handleForm}
            />
          </div>
          <div className="py-3 px-4 border-t sm:border-l grow">
            <label>Check out date:</label>
            <input
              type="date"
              className="text-right max-w-[120px]"
              name="checkOutDate"
              value={form.checkOutDate}
              onChange={handleForm}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t grow flex items-center">
          <label>Number of guests:</label>
          <input
            type="number"
            name="guests"
            min={1}
            max={place?.maxGuests}
            value={form.guests}
            onChange={handleForm}
          />
        </div>
      </div>
      <button onClick={booking} className="primary mt-4">
        Reserve
        {form.numberNights > 0 && (
          <span>&nbsp;for ${form.numberNights * place.price}</span>
        )}
      </button>
      {form.numberNights > 0 && (
        <div className="mt-4 flex justify-between">
          <p>
            ${place?.price} x {form.numberNights} nights
          </p>
          <p>${place?.price * form.numberNights}</p>
        </div>
      )}
    </div>
  );
};

export default BookingFormWidget;
