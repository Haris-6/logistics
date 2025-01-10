import { ErrorMessage, Field } from "formik";
import React from "react";

function Select(props) {
  const { name, label, options, ...rest } = props;
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option  selected>Select value</option>
      {options.map((item, index) => {
        return (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        );
      })}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}

export default Select;
