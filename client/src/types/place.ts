export type PlacePhoto = {
  secure_url: string;
  public_id: string;
};

export type Place = {
  _id: string;
  owner?: string;
  title: string;
  address: string;
  photos: PlacePhoto[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  price: number;
};

export type PlaceFormState = {
  title: string;
  address: string;
  description: string;
  photos: PlacePhoto[];
  deletedPhotos: PlacePhoto[];
  perks: string[];
  extraInfo: string;
  checkIn: number | string;
  checkOut: number | string;
  maxGuests: number | string;
  price: number | string;
};
