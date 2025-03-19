import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormField from "./FormField";
import PlacePerkSelector from "./PlacePerkSelector";
import InputPhotos from "./InputPhotos";

const PlaceForm = ({ place }) => {
  const initialFormState = {
    title: place?.title || "",
    address: place?.address || "",
    description: place?.description || "",
    photos: place?.photos || [],
    perks: place?.perks || [],
    extraInfo: place?.extraInfo || "",
    checkIn: place?.checkIn || "",
    checkOut: place?.checkOut || "",
    maxGuests: place?.maxGuests || 1,
    price: place?.price || 0,
  };
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const handleForm = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    const hasChanges = Object.keys(form).some((key) => {
      if (Array.isArray(form[key])) {
        return (
          JSON.stringify(form[key]) !== JSON.stringify(initialFormState[key])
        );
      }
      return form[key] !== initialFormState[key];
    });

    if (hasChanges) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
        navigate("/account/places");
      }
    } else {
      navigate("/account/places");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (place) {
        await axios.put(`/places/${place._id}`, form);
      } else {
        await axios.post("/places", form);
      }
      navigate("/account/places");
    } catch (error) {
      console.error("Failed to save place:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <FormField
          name="title"
          title="Title"
          description="Title for your place. Should be catchy and short."
          value={form.title}
          onChange={handleForm}
        />

        <FormField
          name="address"
          title="Address"
          description="Address to your place"
          value={form.address}
          onChange={handleForm}
        />

        <FormField
          name="description"
          title="Description"
          description="Description of the place"
          value={form.description}
          onChange={handleForm}
          isTextarea
        />

        <div>
          <h3 className="text-gray-900 font-medium mb-1">Photos</h3>
          <p className="text-gray-500 text-sm mb-4">
            More = Better. At least 3 photos.
          </p>
          <InputPhotos photos={form.photos} setForm={setForm} />
        </div>

        <div>
          <h3 className="text-gray-900 font-medium mb-1">Perks</h3>
          <p className="text-gray-500 text-sm mb-4">
            Select all the perks of your place
          </p>
          <PlacePerkSelector perks={form.perks} handleForm={handleForm} />
        </div>

        <FormField
          name="extraInfo"
          title="Extra info"
          description="House rules, etc"
          value={form.extraInfo}
          onChange={handleForm}
          isTextarea
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <FormField
            name="checkIn"
            title="Check in time"
            description="Add check in time"
            value={form.checkIn}
            onChange={handleForm}
            type="number"
            placeholder="14:00"
          />

          <FormField
            name="checkOut"
            title="Check out time"
            description="Add check out time"
            value={form.checkOut}
            onChange={handleForm}
            type="number"
            placeholder="11:00"
          />

          <FormField
            name="maxGuests"
            title="Max guests"
            description="Maximum number of guests"
            value={form.maxGuests}
            onChange={handleForm}
            type="number"
          />
        </div>

        <FormField
          name="price"
          title="Price per night"
          description="Set your price"
          value={form.price}
          onChange={handleForm}
          type="number"
          min={1}
        />

        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceForm;
