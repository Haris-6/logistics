import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";  //it is used for schema validation, particularly in forms
import FormikController from "../../../components/formik/formikController";  //for controling form function
import Button from "../../../components/button";
import back from '../../../assets/images/back.jpg'
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/path";
import { useLoginUserMutation } from "../../../redux/api/user"; //for login the user account
import { storeCurrentUser } from "../../../utils/currentUser";  //function use to save user data in sessional storage
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";  //A Redux hook for dispatching actions.
import { storeUser } from "../../../redux/slice/currentUser";  //this is redux store slice to send data to update value
import { connectToSocket } from "../../../context/socketEvent"; //A function to connect the user to a WebSocket for real-time communication.
// import { connectToSocket } from "../../../context/socket";

function Login({ className, closeModal, notNavigation }) {
  

  const [loginUser, { isLoading }] = useLoginUserMutation();  //mutation function use to send data to backend for user login
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const { message, data, token } = await loginUser(values).unwrap();
      toast.success(message);
      storeCurrentUser({ ...data, token });
      dispatch(storeUser(data));
      connectToSocket(data?._id);
      if (notNavigation) {
        closeModal();
        return;
      } else {
        navigate(PATH.HOME);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    
    <div
      className={`${
        className
          ? className
          : "flex justify-center items-center min-h-screen p-2 "
      } `}
      style={{
        backgroundImage:  `url(${back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
   
      <div className="bg-[#f5f5f5] w-full max-w-lg p-8 rounded-2xl">
        <p className="text-center font-extrabold text-xl">Login</p>
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
                label="Email"
                name="email"
              />

              <FormikController
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <div className="text-end underline">
                <Link to={PATH.FORGOTPASSWORD}  >Forgot Password</Link>
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? "Logging..." : "Login"}
              </Button>
              <p className="text-sm text-right">
                Don't have an account?{" "}
                <Link to={PATH.SIGNUP} className="underline">
                  Create one
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
