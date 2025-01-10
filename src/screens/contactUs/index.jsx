import React from "react";
import NavbarComponent from "../../components/navbar";
import FooterComponent from "../../components/footer";
import { Form, Formik } from "formik";  //use for manging state or vadation of app
import FormikController from "../../components/formik/formikController";   // it is use to render form field
import Button from "../../components/button";
import { useContactUsMutation } from "../../redux/api/contactUs";  //it handles the API request for submitting the contact form.
import { toast } from "react-toastify";
import * as Yup from "yup";   //it is use to validate the form according to schema

function ContactUs() {
  const [contactUs, { isLoading }] = useContactUsMutation();  //this function call api function
  const initialValue = {
    name: "",
    message: "",
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    name: Yup.string().required("Name is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { message } = await contactUs(values).unwrap();
      toast.success(message);
      resetForm();
    } catch (error) {
      toast.error(error?.data?.message || "SERVER ERROR");
      console.log(error);
    }
  };
  return (
    <>
      <NavbarComponent />
      <div className="relative h-[600px] w-full" >
        <img
          src="https://aurac.com/storage/contact-us.webp"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded">
          <p className="text-white text-2xl font-bold">Contact Us</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <FormikController
                control="input"
                type="text"
                label="Name"
                name="name"
                placeholder="Your Name"
              />
              <FormikController
                control="input"
                type="email"
                label="Email"
                name="email"
                placeholder="Your Email"
              />

              <FormikController
                control="textarea"
                type="text"
                label="Message"
                name="message"
                placeholder="Your Message"
              />
              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Contact"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* <div className="max-w-3xl mt-12 p-6 bg-white  rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Contact Information
        </h2>
        <p className="mb-4">
          For inquiries regarding our services, support, or any other questions,
          please use the following channels to reach us. For urgent matters,
          kindly contact our hotline. If you're reaching out outside of our
          operating hours, please leave a message and we will return your call
          at the earliest possible opportunity.
        </p>
        <p className="text-gray-700">
          Phone: +1-123-456-7890
          <br />
          Email: info@example.com
          <br />
          Address: 123 Main Street, City, Country
        </p>
      </div> */}
      <FooterComponent />
    </>
  );
}

export default ContactUs;
