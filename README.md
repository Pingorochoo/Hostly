# Hostly

Hostly is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to list and book vacation properties. It includes features such as user authentication, CRUD operations for managing property listings, photo uploads to Cloudinary, and a booking system.

## Features
- User authentication with JWT
- CRUD operations for property listings
- Photo uploads to Cloudinary
- Booking system for vacation properties
- Responsive frontend built with React and Tailwind CSS
- State management using Redux

## Technologies Used
- **Frontend**: React, Tailwind CSS, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary

## Installation Instructions
1. Clone the repository.
2. Install dependencies for both the frontend and backend using `npm install`.

## Running the Servers
- **Backend**: Navigate to the backend directory and run `npm start`.
- **Frontend**: Navigate to the frontend directory and run `npm start`.

## Environment Variables
- **Backend**:
  - `MONGO_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Secret key for JWT
  - `CLOUDINARY_URL`: Cloudinary URL for image uploads
- **Frontend**:
  - `REACT_APP_API_URL`: URL for the backend API

## Usage
1. Register or log in to your account.
2. List a new property or browse available properties.
3. Book a property and manage your bookings.

## Contribution Guidelines
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Cloudinary for image storage
- The MERN stack for providing a robust framework for building full-stack applications.
