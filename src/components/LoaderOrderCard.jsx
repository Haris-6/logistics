import React from "react";
import { Card } from "flowbite-react";

function LoaderOrderCard({ data, onClick }) {
  const {
    vehiclePicture,
    vehicleName,
    location,
    vehicleType,
    countryName,
    city,
    status = "",
  } = data || {};

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="max-w-sm" imgSrc={vehiclePicture[0]} horizontal>
        <p className="text-right bg-navy w-fit text-white px-4 py-2 rounded-xl">
          {status}
        </p>
        <h5 className="tracking-tight text-gray-900 dark:text-white flex flex-col gap-4">
          <p>
            <span className="font-bold text-base">Name:</span> {vehicleName}
          </p>
          <p>
            <span className="font-bold text-base">Type:</span> {vehicleType}
          </p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold"> Location:</span> {location}
        </p>

        <h5 className="tracking-tight text-gray-900 dark:text-white flex flex-col gap-4">
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

export default LoaderOrderCard;
