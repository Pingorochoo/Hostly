const InputPhotos = ({ handleForm, photoLink, addedPhotos }) => {
  const addPhotoByLink = async (e) => {
    e.preventDefault();
  };
  const uploadPhoto = () => {
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          name="photoLink"
          placeholder="paste image url here"
          value={photoLink}
          onChange={handleForm}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl my-1"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <label className="cursor-pointer flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
          <input
            type="file"
            className="hidden"
            onChange={uploadPhoto}
            multiple
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default InputPhotos;
