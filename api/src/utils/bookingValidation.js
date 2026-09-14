const AppError = require("./AppError");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const parseDateOnly = (value) => {
  if (typeof value !== "string" || !dateRegex.test(value)) {
    throw new AppError("Dates must be in YYYY-MM-DD format", 400);
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new AppError("Invalid date format. Please use YYYY-MM-DD", 400);
  }

  return date;
};

const validateBookingDates = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) {
    throw new AppError("Check-in and check-out dates are required", 400);
  }

  const checkIn = parseDateOnly(checkInDate);
  const checkOut = parseDateOnly(checkOutDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today) {
    throw new AppError("Check-in date cannot be in the past", 400);
  }

  if (checkIn >= checkOut) {
    throw new AppError("Check-in date must be before check-out date", 400);
  }
};

module.exports = {
  validateBookingDates,
};
