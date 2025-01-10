import React from "react";

function HeaderCard({ data }) {
  const { image, text, heading } = data;
  return (
    <div className="">
      <img src={image} />
      <p className="text-xl">{heading}</p>
      <p>{text}</p>
    </div>
  );
}

export default HeaderCard;
