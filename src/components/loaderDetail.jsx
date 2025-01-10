import React, { useEffect, useState } from "react";
import ImageCarousel from "./imageCarousel";
import Button from "./button";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerComponent from "./spinner";
import {
  truckAddApi, //getting all trucks data
  useDeleteLoaderMutation,  //for delete truck detail
  useGetSingleLoaderQuery,  //single truck data
} from "../redux/api/truckadd";
import { getCurrentUser, getUserRole } from "../utils/currentUser"; //getting current user from sessional storage
import NavbarComponent from "./navbar";
import { toast } from "react-toastify";
import { PATH } from "../utils/path";
import FooterComponent from "./footer";
import { useDispatch, useSelector } from "react-redux";//for sending and getting data from redux store
import useConversation from "../zustand/userConversation";
import ModalCustom from "./modal";
import Inventories from "../screens/bookLoader";
import Login from "../screens/auth/Login";
import UpdateLoaderAdd from "../screens/updateAdds/loader"; //for updating loader add

function LoaderDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const current = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const role = getUserRole();
  const { data, isLoading } = useGetSingleLoaderQuery(id);
  const [deleteLoader, { isLoading: loading }] = useDeleteLoaderMutation();
  const dispatch = useDispatch();
  const { setSelectedConversation } = useConversation();
  const {
    _id = "",
    postedBy = {},
    vehicleName = "",
    vehicleModel = "",
    vehicleNumber = 0,
    ownerName = "",
    phoneNumber = "",
    location = "",
    countryName = "",
    stateName = "",
    city = "",
    vehiclePicture = [],
    status = "",
  } = data?.data || {};
  const handleDeleteLoader = async () => {
    try {
      const { message } = await deleteLoader(_id).unwrap();
      toast.success(message);
      navigate(PATH.MYADDS);
      dispatch(truckAddApi.util.invalidateTags(["Truck"]));
    } catch (error) {
      console.log(error);
      toast.error("SERVER ERROR");
    }
  };

  

  
  const handleChat = () => {
    setSelectedConversation(postedBy);
    if (!user) {
      setLoginOpen(true);
    } else {
      navigate(PATH.CHAT);
    }
  };

  const handleBookLoader = () => {
    setOpenModal(true);
  };

  const handleUpdateLoader = () => {
    setUpdateOpen(true);
  };
  const numberavail = ()=>{
    if(!user){
      return (<b className=" text-blue-800">Login to view</b>)
    }else{return (phoneNumber)}
  }

  return (
    <>
      <ModalCustom open={openModal} setOpen={() => setOpenModal(!openModal)}>
        <Inventories
          closeModal={() => setOpenModal(!openModal)}
          loaderId={_id}
        />
      </ModalCustom>
      <ModalCustom open={loginOpen} setOpen={() => setLoginOpen(!loginOpen)}>
        <Login
          className="p-4"
          closeModal={() => setLoginOpen(!loginOpen)}
          notNavigation={true}
        />
      </ModalCustom>

      <ModalCustom open={updateOpen} setOpen={() => setUpdateOpen(!updateOpen)}>
        <UpdateLoaderAdd id={_id} />
      </ModalCustom>
      <NavbarComponent />
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div className="shadow-xl w-[80%] mx-auto p-4 my-8">
          <p className="text-center text-xl font-bold">Loader Detail</p>
          <div className="flex justify-end gap-2">
            {(!user || (user && user?._id !== postedBy?._id)) && (
              <Button
                className="bg-navy w-[100px] hover:bg-[hsl(0,100%,4%)] hover:text-white"
                onClick={handleChat}
              >
                Chat
              </Button>
            )}

            {user && user?._id === postedBy?._id && (
              <>
                <Button
                  className="bg-red-500 w-[100px] "
                  onClick={handleDeleteLoader}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
                {status !== "Posted" ? (
                  <Button
                    className="bg-blue-500 w-[100px] "
                    onClick={handleUpdateLoader}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                ) : (
                  <Button className="bg-navy w-[100px] hover:bg-[hsl(0,100%,4%)] hover:text-white cursor-not-allowed">
                    {status}
                  </Button>
                )}
              </>
            )}
            {/* {user && user?._id !== postedBy?._id && (
              <Button
                className="bg-navy w-[100px] hover:bg-[hsl(0,100%,4%)] hover:text-white"
                onClick={handleBookLoader}
              >
                Book
              </Button>
            )} */}
          </div>
          <div className="flex justify-between flex-wrap p-4 gap-4">
            <p>
              <span className="font-bold">Vehicle Name: </span> {vehicleName}
            </p>
            <p>
              <span className="font-bold">Model: </span> {vehicleModel}
            </p>
            <p>
              <span className="font-bold">Number: </span> {vehicleNumber}
            </p>
          </div>

          <div className="flex justify-between flex-wrap p-4 gap-4">
            <p>
              <span className="font-bold">Owner Name: </span> {ownerName}
            </p>
            <p>
              <span className="font-bold">Phone Number: </span> {numberavail()}
            </p>
          </div>
          <p className="p-4">
            <span className="font-bold">Location: </span>
            {location}
          </p>

          <div className="flex justify-between flex-wrap p-4 gap-4">
            <p>
              <span className="font-bold">Country: </span> {countryName}
            </p>
            <p>
              <span className="font-bold">State: </span> {stateName}
            </p>
            <p>
              <span className="font-bold">City: </span> {city}
            </p>
          </div>
          <p className="p-4 font-bold">Inventory Images</p>
          <ImageCarousel data={vehiclePicture} />
        </div>
      )}
      <FooterComponent />
    </>
  );
}

export default LoaderDetail;
