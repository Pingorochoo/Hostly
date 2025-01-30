// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlacePerkSelector from "./PlacePerkSelector";
import InputPhotos from "./InputPhotos";
import FormField from "./FormField";
const initialFormState = {
  title: "",
  address: "",
  addedPhotos: [], //photos
  description: "",
  perks: [],
  extraInfo: "",
  checkIn: 16,
  checkOut: 10,
  maxGuests: 1,
  price: 20,
};
const PlaceForm = () => {
  const [form, setForm] = useState(initialFormState);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function savePlace(e) {
    e.preventDefault();
    // await axios.post("/places", form);
    navigate("/account/places")
  }
  function handleCancel(e) {
    e.preventDefault();
    navigate("/account/places")
  }
  return (
    <form onSubmit={savePlace} className="flex flex-col gap-1">
      <FormField
        name="title"
        description="title for your place, should be short"
        value={form.title}
        onChange={handleForm}
      />
      <FormField
        name="address"
        description="address to your place"
        value={form.address}
        onChange={handleForm}
      />
      <FormField title="photos" description="upload at least 5 photos to give guests a clear view of your space">
        <InputPhotos
          setForm={setForm}
          addedPhotos={form.addedPhotos}
        />
      </FormField>
      <FormField
        name="description"
        description="description of the place"
        value={form.description}
        onChange={handleForm}
        isTextarea
      />
      <FormField title="perks" description="select all the perks of your place">
        <PlacePerkSelector handleForm={handleForm} perks={form.perks} />
      </FormField>
      <FormField
        title="extra info"
        name="extraInfo"
        description="house rules, etc"
        value={form.extraInfo}
        onChange={handleForm}
        isTextarea
      />
      <FormField
        title="check in&out times, max guests"
        description="add chek in and out times, remember to have some time window for cleaning the room between guests"
      >
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="mt-2 ">Check in time</h3>
            <input
              type="number"
              placeholder="00"
              value={form.checkIn}
              name="checkIn"
              onChange={handleForm}
              min="0"
              max="24"
            />
          </div>
          <div>
            <h3 className="mt-2 ">Check out time</h3>
            <input
              type="number"
              placeholder="00"
              value={form.checkOut}
              name="checkOut"
              onChange={handleForm}
              min="0"
              max="24"
            />
          </div>
          <div>
            <h3 className="mt-2 ">Max number of guests</h3>
            <input
              type="number"
              placeholder="1"
              value={form.maxGuests}
              name="maxGuests"
              onChange={handleForm}
              min={initialFormState.maxGuests}
            />
          </div>
        </div>
      </FormField>
      <FormField
        title="Price"
        description="per night, it musb be in dolars"
        type="number"
        value={form.price}
        name="price"
        min="20"
        onChange={handleForm}
      />
      <div>
        <div className="md:flex gap-5 justify-center">
          <button
            type="submit"
            className="block bg-primary p-2 text-white rounded-2xl my-4 w-full md:w-80"
          >
            save
          </button>
          <button
            type="button"
            className="block bg-gray-100 p-2 rounded-2xl my-4 w-full md:w-80"
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceForm;
