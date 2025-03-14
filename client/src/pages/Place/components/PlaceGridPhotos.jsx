const PlaceGridPhotos = ({ photos, setShowAllPhotos }) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-2xl overflow-hidden">
        {photos.length > 0 &&
          photos.map((photo, i) => {
            if (i > 4) return "";
            return (
              <div
                key={i}
                onClick={() => setShowAllPhotos(true)}
                className={
                  "circular-gradient cursor-pointer " +
                  (i === 0 ? "col-span-2 row-span-2" : "")
                }
              >
                <img
                  src={"http://localhost:5001/" + photo}
                  alt="place"
                  className="object-cover w-full h-full"
                />
              </div>
            );
          })}
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 items-center absolute right-2 bottom-2 py-1 px-4 rounded-2xl bg-white border border-black hover:bg-gray-50"
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
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        show more photos
      </button>
    </div>
  );
};

export default PlaceGridPhotos;
