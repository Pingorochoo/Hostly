import { useState } from "react";
import tw from "tailwind-styled-components";
import apiUrl from "../../../../config/api";

const IconButton = tw.button`
  cursor-pointer 
  absolute 
  bottom-4
  flex
  items-center
  justify-center
  text-white
  bg-black/25
  hover:bg-black/40
  transition-all
  duration-200 
  ease-in-out
  rounded-full 
  w-9
  h-9
  shadow-md
  backdrop-blur-[2px]
  hover:scale-105
  active:scale-95
`;

const AdddedPhoto = ({ selected, photo, setForm, photos }) => {
  const [opacity, setOpacity] = useState(" opacity-0");

  function removePhoto() {
    setForm((prev) => ({
      ...prev,
      photos: photos.filter((pic) => pic !== photo),
    }));
  }

  function selectMainPhoto() {
    setForm((prev) => ({
      ...prev,
      photos: [photo, ...photos.filter((pic) => pic !== photo)],
    }));
  }

  function handleMouseOver() {
    setOpacity(" opacity-100");
  }

  function handleMouseLeave() {
    setOpacity(" opacity-0");
  }

  return (
    <div
      className="relative aspect-square group"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={apiUrl + photo}
        className={`
          w-full h-full object-cover rounded-2xl transition-all duration-300
          ${selected ? 'ring-2 ring-primary shadow-md' : 'group-hover:brightness-95'}
        `}
        alt="place"
      />
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-black/0 via-black/0 to-black/25${opacity} transition-opacity duration-200`} />
      
      <IconButton
        className={`left-4${selected ? "" : opacity}`}
        onClick={selectMainPhoto}
        type="button"
        title={selected ? "Main photo" : "Set as main photo"}
      >
        {selected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-primary"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        )}
      </IconButton>

      <IconButton 
        className={`right-4${opacity}`} 
        onClick={removePhoto} 
        type="button"
        title="Remove photo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>

      {selected && (
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1.5 bg-black/25 text-white text-xs font-medium rounded-lg shadow-md backdrop-blur-[2px]">
            Main Photo
          </span>
        </div>
      )}
    </div>
  );
};

export default AdddedPhoto;
