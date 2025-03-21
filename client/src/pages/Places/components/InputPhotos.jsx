import { useState } from "react";
import axios from "axios";
import AddedPhoto from "./AddedPhoto";

const InputPhotos = ({ setForm, photos }) => {
  const [photoLink, setPhotoLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const handlePhotos = (files ) => {
    const newPhotos = Array.isArray(files) ? [...files] : [files];
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }));
  };
  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    setIsUploading(true);
    setUploadError(null);

    try {
      const { data } = await axios.post("places/photos/url", {
        imageUrl: photoLink,
      });
      handlePhotos(data);
      setPhotoLink("");
    } catch (error) {
      setUploadError(error?.response?.data?.error || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const { data: uploadedFiles } = await axios.post(
        "/places/photos/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      handlePhotos(uploadedFiles);
    } catch (error) {
      setUploadError(error?.response?.data?.error || "Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link ....jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        <button
          onClick={addPhotoByLink}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUploading || !photoLink}
        >
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {uploadError && (
        <p className="text-red-500 text-sm mt-1">{uploadError}</p>
      )}

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length > 0 &&
          photos.map((photo, index) => (
            <AddedPhoto
              key={index}
              photo={photo}
              setForm={setForm}
              photos={photos}
              selected={index === 0}
            />
          ))}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 hover:bg-gray-100 transition-colors">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
            accept="image/*"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};
export default InputPhotos;
