import React, { useState } from "react";

const UploadImage = ({
  images,
  name,
  handleImageChange,
  handleDeleteImage,
}) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      handleImageChange(name, files);
    }
  };

  const handleDelete = (index) => {
    handleDeleteImage(index);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${name}`}
        />
        <label htmlFor={`upload-${name}`} className="cursor-pointer">
          <div className="border-dashed border-2 border-gray-300 p-4 h-36 flex items-center justify-center">
            <p>Upload Images</p>
          </div>
        </label>
      </div>
      <div className="col-span-2">
        <div className="mt-2 grid grid-cols-2 gap-3">
          {images?.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(preview)}
                alt="preview"
                className="object-cover w-full h-32"
              />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
