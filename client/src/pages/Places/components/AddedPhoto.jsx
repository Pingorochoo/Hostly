import { useState } from "react";
import tw from "tailwind-styled-components";
const MyBotton = tw.button`
    cursor-pointer 
    absolute 
    bottom-1
    text-white
    bg-black
    bg-opacity-20
    hover:bg-opacity-50
    transition
    duration-100 
    ease-out
    rounded-full 
    p-1
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
      className={"h-32 relative"}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={"http://localhost:5001/" + photo}
        className="rounded-2xl w-full h-full object-cover"
        alt="place"
      />
      <MyBotton
        className={"left-1" + (selected ? "" : opacity)}
        onClick={selectMainPhoto}
        type="button"
      >
        {selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!selected && (
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
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        )}
      </MyBotton>
      <MyBotton className={"right-1" + opacity} onClick={removePhoto} type="button">
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </MyBotton>
    </div>
  );
};

export default AdddedPhoto;
