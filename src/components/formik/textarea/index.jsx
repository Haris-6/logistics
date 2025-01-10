import React from "react";
import { Field, ErrorMessage } from "formik";

function TextArea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-semibold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
}
export default TextArea;
