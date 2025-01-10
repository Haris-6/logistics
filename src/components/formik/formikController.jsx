import React from "react";
import Input from "./input";
import Select from "./select";
import TextArea from "./textarea";

function FormikController(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;

    default:
      return;
  }
}

export default FormikController;
