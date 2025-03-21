const FullScreenGallery = ({ photos, title, setShowAllPhotos }) => {
  return (
    <div className="absolute inset-0 text-white h-screen w-full">
      <div className="p-8 grid gap-4 bg-black">
        <div>
          <h2 className="text-3xl">Photos of {title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-12 top-10 flex gap-1 items-center rounded-2xl py-1 px-3 shadow shadow-gray-500 bg-white text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close photos
          </button>
        </div>
        {photos?.length > 0 &&
          photos.map((photo) => (
            <div key={photo.secure_url}>
              <img
                className="object-cover w-full"
                src={photo.secure_url}
                alt="place"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FullScreenGallery;
