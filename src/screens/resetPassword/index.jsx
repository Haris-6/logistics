import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "../../components/formik/formikController";
import Button from "../../components/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../utils/path";
import { toast } from "react-toastify";

import { useResetPasswordMutation } from "../../redux/api/password";

function ResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation(); //A function to trigger the password reset mutation.
  const { id, token } = useParams(); //Used to retrieve the id and token parameters from the URL.
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required").min(8),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = async (values) => {
    try {
      const { data, message } = await resetPassword({
        data: values,
        id,
        token,
      }).unwrap();
      toast.success(message);
      navigate(PATH.LOGIN);
    } catch (error) {
      toast.error(error?.data?.message || "SERVER ERROR");
      console.log(error);
    }
  };

  return (
 
    <div className="flex justify-center items-center min-h-screen p-2 bg-gray-700">
      <div className="bg-[#f5f5f5] w-full max-w-lg p-8 rounded-2xl" >
        <p className="text-center font-extrabold text-xl">Reset Password</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <FormikController
                control="input"
                type="password"
                label="Password"
                name="password"
              />

              <FormikController
                control="input"
                type="password"
                label="Confirm Password"
                name="confirmpassword"
              />
              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Reset"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
   
  );
}

export default ResetPassword;
