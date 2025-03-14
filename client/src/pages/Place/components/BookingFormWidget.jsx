import { useState } from "react";

const BookingFormWidget = ({ place }) => {
  if (!place) return;
  const initialForm = {
    placeId: place?._id,
    checkInDate: "",
    checkOutDate: "",
    ghests: "1",
    numberNights: 2,
  };
  const [form, setForm] = useState(initialForm);
  function handleForm() {}
  function booking() {}

  return (
    <div className="bg-white shadow p-4 rounded-2xl overflow-hidden">
      <h3 className="text-2xl">Price: ${place?.price} / per night</h3>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 grow">
            <label>Check in date:</label>
            <input
              type="date"
              className="text-right w-[120px]"
              value={form.checkInDate}
              onChange={handleForm}
            />
          </div>
          <div className="py-3 px-4 border-l grow">
            <label>Check out date:</label>
            <input
              type="date"
              className="text-right w-[120px]"
              value={form.checkOutDate}
              onChange={handleForm}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t grow flex items-center">
          <label>Number of guests:</label>
          <input
            type="number"
            min={initialForm.ghests}
            max={place?.maxGuests}
            value={form.ghests}
            onChange={handleForm}
          />
        </div>
      </div>
      <button onClick={booking} className="primary">
        Book this place&nbsp;
        {form.numberNights > 0 && (
          <span>for ${form.numberNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingFormWidget;
