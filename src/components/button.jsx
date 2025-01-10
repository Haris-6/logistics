import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

function Button({ children, className, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(
        clsx(
          "mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors",
          className && className
        )
      )}
    >
      {children}
    </button>
  );
}

export default Button;
