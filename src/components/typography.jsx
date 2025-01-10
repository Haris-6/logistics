import clsx from 'clsx'; //. It can combine class names based on the truthiness of the values passed to it.
import React from 'react';
import { twMerge } from 'tailwind-merge';  //it is tailwind component.It helps avoid conflicts and ensures that only the latest specified classes are applied.

function Typography({ children, className }) {  //children= The text or elements to be displayed inside the component.
  //An optional string of additional CSS classes to customize the appearance.
  return (
    <p
      className={twMerge(
        clsx('text-center text-2xl font-bold', className && className) //it is used to conditionally combine classes
      )}
    >
      {children}
    </p>
  );
}

export default Typography;
