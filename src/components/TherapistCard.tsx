import React from "react";
import Image from "next/image";

interface TherapistProps {
  name: string;
  location: string;
  image: string; // Assuming this is a valid URL to the image
  onChat: () => void;
  onAppointment: () => void;
}

const TherapistCard: React.FC<TherapistProps> = ({
  name,
  location,
  image,
  onChat,
  onAppointment,
}) => {
  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-[#FFE9D0]">
      {/* Next.js Image Optimization */}
      <Image
        width={300}
        height={200}
        src={image}
        alt={`${name}'s profile`}
        className="bg-white object-cover w-full h-48" // Added proper object-fit style
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{name}</div>
        <p className="text-gray-700 text-base">Location: {location}</p>
      </div>
      <div className="px-6 pb-2 flex flex-col w-full gap-4">
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded text-sm w-full hover:bg-gray-100"
          onClick={onChat}
        >
          Chat
        </button>
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded text-sm w-full hover:bg-gray-100"
          onClick={onAppointment}
        >
          Make an Appointment
        </button>
      </div>
    </div>
  );
};

export default TherapistCard;
