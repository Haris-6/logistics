import React from "react";
import { Card } from "flowbite-react";

function InventoryCard({ data, onClick }) {
  const {
    inventoryPicture,
    inventorySize,
    inventoryType,
    countryName,
    city,
    location,
  } = data || {};

  return (
    <div
      onClick={onClick}
    >
      <Card className="cursor-pointer 2xl:h-72"
        imgSrc={inventoryPicture}
        horizontal
      >
        <h5 className="tracking-tight text-gray-900 dark:text-white flex flex-row justify-between  md:flex-col md:justify-start gap-4">
          <p>
            <span className="font-bold text-base">Type:</span> {inventoryType}
          </p>
          <p>
            <span className="font-bold text-base">Size:</span> {inventorySize}
          </p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
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

export default InventoryCard;
