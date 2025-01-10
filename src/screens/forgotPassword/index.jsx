import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "../../components/formik/formikController";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import back3 from '../../assets/images/back3.jpg'
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../redux/api/password";  //function that send mail to given email for password reset form
function ForgotPassword() {
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();   //this function post data to database and it call in api
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const { data, message,is } = await forgotPassword(values).unwrap();
      console.log(data);
      toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message || "SERVER ERROR");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-2" style={{
      backgroundImage: `url(${back3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}> 
      <div className="bg-[#f5f5f5] w-full max-w-lg p-8 rounded-2xl "  >
        <p className="text-center font-extrabold text-xl">Forgot Password</p>
        <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <FormikController
                control="input"
                type="email"
                label="Enter Email"
                name="email"
              />
              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
