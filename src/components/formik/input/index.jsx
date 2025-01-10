import { ErrorMessage, Field } from 'formik';
import React from 'react';

function Input(props) {
  const { name, label, ...rest } = props;
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
}

export default Input;
