import type { Place } from "./place";

export type Booking = {
  _id: string;
  place: Place;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  bookedBy?: string;
};

export type BookingFormState = {
  placeId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  numberNights: number;
};
