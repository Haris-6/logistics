import React from "react";

function DeliveryCard({ data }) {
  const { image, text } = data;
  return (
    <div className="transition relative shadow w-[400px] h-[400px] rounded-3xl mx-auto hover:scale-110 duration-500">
      <img
        src={image}
        className="w-full h-full object-cover rounded-3xl"
        alt="Map"
      />
      <div className="absolute z-10 bottom-0 w-full text-white p-4 text-center rounded-b-3xl backdrop-blur-sm bg-black/70">
        {text}
      </div>
    </div>
  );
}

export default DeliveryCard;
