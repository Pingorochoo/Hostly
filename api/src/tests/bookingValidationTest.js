const { validateBookingDates } = require("../utils/bookingValidation");
const AppError = require("../utils/AppError");

const formatDateLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dateFromToday = (days) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return formatDateLocal(date);
};

const testCases = [
  ["valid future dates", dateFromToday(2), dateFromToday(5)],
  ["today is valid", dateFromToday(0), dateFromToday(1)],
  ["same check-in and check-out", dateFromToday(2), dateFromToday(2), "Check-in date must be before check-out date"],
  ["check-in after check-out", dateFromToday(3), dateFromToday(2), "Check-in date must be before check-out date"],
  ["past check-in", "2020-01-01", "2020-01-02", "Check-in date cannot be in the past"],
  ["wrong separator", "2026/10/15", "2026-10-20", "Dates must be in YYYY-MM-DD format"],
  ["missing date part", "2026-10", "2026-10-20", "Dates must be in YYYY-MM-DD format"],
  ["impossible February date", "2026-02-31", "2026-03-05", "Invalid date format. Please use YYYY-MM-DD"],
  ["impossible April date", "2026-04-31", "2026-05-05", "Invalid date format. Please use YYYY-MM-DD"],
  ["missing check-in", null, dateFromToday(2), "Check-in and check-out dates are required"],
  ["missing check-out", dateFromToday(2), null, "Check-in and check-out dates are required"],
];

let failedTests = 0;

testCases.forEach(([name, checkInDate, checkOutDate, expectedError]) => {
  try {
    validateBookingDates(checkInDate, checkOutDate);
    if (expectedError) {
      throw new Error(`Expected error: ${expectedError}`);
    }
    console.log(`PASS: ${name}`);
  } catch (error) {
    if (expectedError && error instanceof AppError && error.message === expectedError) {
      console.log(`PASS: ${name}`);
    } else {
      console.error(`FAIL: ${name} - ${error.message}`);
      failedTests += 1;
    }
  }
});

if (failedTests > 0) {
  process.exit(1);
}
