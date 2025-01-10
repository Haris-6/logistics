import React from "react";
import { Card } from "flowbite-react";

function LoaderCard({ data, onClick }) {
  const {
    vehiclePicture,
    vehicleName,
    location,
    vehicleType,
    countryName,
    city,
  } = data || {};

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card  imgSrc={vehiclePicture[0]} className="2xl:h-72" horizontal >
        <h5 className="tracking-tight text-gray-900 dark:text-white flex flex-row justify-between  md:flex-col md:justify-start gap-4">
          <p>
            <span className="font-bold text-base">Name:</span> {vehicleName}
          </p>
          <p>
            <span className="font-bold text-base">Type:</span> {vehicleType}
          </p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 ">
          <span className="font-bold"> Location:</span> {location}
        </p>

        <h5 className="tracking-tight text-gray-900 dark:text-white flex flex-row justify-between  md:flex-col md:justify-start gap-4">
          <p>
            <span className="font-bold text-base">Country:</span> {countryName}
          </p>
          <p>
            <span className="font-bold text-base">City:</span> {city}
          </p>
        </h5>
      </Card>
    </div>
  );
}

export default LoaderCard;
