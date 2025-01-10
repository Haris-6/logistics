import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";

import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../utils/path";
import {
  getCurrentUser,
  getUserRole,
  logoutCurrentUser,
} from "../utils/currentUser";
import ModalCustom from "./modal";
import Signup from "../screens/auth/signup";
//import defaultAvatar from "../assets/images/default-avatar.png"; // Path to your default avatar image

const NAVBARITEMS = [
  {
    name: "Home",
    path: PATH.HOME,
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contactus",
    path: PATH.MYADDS,
  },
  {
    name: "My Adds",
    path: PATH.MYADDS,
  },
  {
    name: "Active Order",
    path: "/activeorder",
  },
  {
    name: "Messages",
    path: "/chat",
  },
];

const localPath = "http://localhost:5173/";

function NavbarComponent() {
  const role = getUserRole();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  // const [file, setFile] = useState(null);
  // const fileInputRef = useRef(null);
  const path = window.location.href;
  const profilefun = () => {
    navigate(PATH.PROFILE); // Ensure 'SETTING' is correctly referenced in the PATH object
  };
  const settingfun = () => {
    navigate(PATH.SETTING); // Ensure 'SETTING' is correctly referenced in the PATH object
  };

  const handleSignOut = () => {
    logoutCurrentUser();
    navigate(PATH.HOME);
  };
  const handleSignup = () => {
    console.log(path);
    if (path === localPath) {
      navigate(PATH.SIGNUP);
      return;
    }
    setOpenModal(true);
  };
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     // Handle file upload logic here (e.g., send to server or update user profile)
  //     setFile(URL.createObjectURL(selectedFile)); // Preview the image
  //   }
  // };

  // const handleUploadClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click(); // Open the file dialog
  //   }
  // };




  return (
    <>
      <ModalCustom open={openModal} setOpen={setOpenModal}>
        <Signup className="p-4" closeModal={() => setOpenModal(false)} />
      </ModalCustom>
      <Navbar fluid rounded className="shadow-2xl p-4">
        <Navbar.Brand>
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Loadify Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Logistic System
          </span>
        </Navbar.Brand>
        {!user && <Navbar.Toggle />}
        {user && (
          <>
            <div className="flex md:order-2 gap-4 items-center ">
              <Dropdown
                arrowIcon={false}
                inline
                 label={<Avatar alt="User settings" rounded /> }//img={file ? file : user?.profilePicture ? user.profilePicture : defaultAvatar}
                
              >
                <Dropdown.Header>
                  <span className="block text-sm mb-2">
                    {user?.firstName} {user?.lastName}{" "}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                {/* <span className='text-sm font-medium ml-4'>Role: {role}</span> */}

                <Dropdown.Divider />
                <Dropdown.Item className="text-red-900" onClick={profilefun}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="text-red-900" onClick={settingfun}>
                  Setting
                </Dropdown.Item>
                <Dropdown.Item className="text-red-900" onClick={handleSignOut}>
                  Sign out
                </Dropdown.Item>
                {/* <Dropdown.Item>
                  <Button
                    type="button"
                    className="bg-[#00215E] text-white p-2 rounded hover:bg-blue-700 rounded-xl"
                    onClick={handleUploadClick}
                  >
                    Update Picture
                  </Button>
                </Dropdown.Item> */}

              </Dropdown>
              {/* <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              /> */}


              <Navbar.Toggle />
            </div>
          </>
        )}
        <Navbar.Collapse>
          <div className="flex flex-col  items-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link
              to={PATH.HOME}
              className="underline-link md:border-0 md:w-fit md:p-0  border-2  w-full p-2 rounded text-white  hover:text-blue-900"
            >
              Home
            </Link>
            <Link
              to={PATH.ABOUTUS}
              className="underline-link md:border-0 md:w-fit md:p-0 border-2  w-full p-2 rounded text-white  hover:text-blue-900"
            >
              About
            </Link>
            <Link
              to={PATH.CONTACTUS}
              className="underline-link md:border-0 md:w-fit md:p-0  border-2  w-full p-2 rounded text-white  hover:text-blue-900"
            >
              Contactus
            </Link>
            {!user && (
              <>
                {" "}
                <Link to={PATH.LOGIN} className="md:w-fit w-full">
                  <button className="bg-[#00215E] text-white p-2 rounded w-full hover:bg-blue-700 rounded-xl">
                    Login
                  </button>
                </Link>
                <button
                  className="bg-[#00215E] text-white p-2 rounded w-full  hover:bg-blue-700 rounded-xl"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </>
            )}

            {user && (
              <>
                <Link
                  to={PATH.MYADDS}
                  className="underline-link md:border-0 md:w-fit md:p-0  border-2  w-full p-2 rounded text-white hover:text-blue-900 "
                >
                  My Ads
                </Link>
                {/* <Link
                  to={PATH.ACTIVEADDS}
                  className="underline-link md:border-0 md:w-fit md:p-0  border-2  w-full p-2 rounded text-white hover:text-blue-900"
                >
                  Active Order
                </Link> */}
                <Link
                  to={PATH.CHAT}
                  className="underline-link md:border-0 md:w-fit md:p-0  border-2  w-full p-2 rounded text-white  hover:text-blue-900"
                >
                  Messages
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
