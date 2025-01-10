import React from "react";

function Inventory({ data, index, length, handleBookInventory }) {
  const { _id, inventoryPicture, inventoryType } = data;
  return (
    <div
      className={`flex justify-between items-center ${
        index !== length - 1 ? "border-b" : ""
      } mt-2 cursor-pointer`}
      onClick={() => handleBookInventory(_id)}
    >
      <img
        src={inventoryPicture}
        alt="inventory"
        className="w-[200px] h-[200px] rounded-full"
      />
      <p className="text-2xl">{inventoryType}</p>
    </div>
  );
}

export default Inventory;
