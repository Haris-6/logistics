import React, { useState } from "react";
import ImageCarousel from "./imageCarousel";
import Button from "./button";
import { useLocation, useNavigate, useParams } from "react-router-dom";//useparam Access dynamic parameters from the current route.
import {
  inventoryAddApi,  ///getting all data from function
  useDeleteInventoryMutation,  //delete inventory data 
  useGetSingleInventoryQuery,   //getting single inventory ad detail
} from "../redux/api/inventoryAdd";
import SpinnerComponent from "./spinner";
import { getCurrentUser, getToken, getUserRole } from "../utils/currentUser"; //retrieve data from sessional storage
import NavbarComponent from "./navbar";
import { toast } from "react-toastify";
import { PATH } from "../utils/path";
import { useDispatch, useSelector } from "react-redux"; //useDispatch for sending data to redux store and  useSelector for getting data to redux store
import FooterComponent from "./footer";
import useConversation from "../zustand/userConversation";// A custom hook created using Zustand to manage conversation-related state
import { useCompleteOrderMutation } from "../redux/api/booking";
import Login from "../screens/auth/Login";
import ModalCustom from "./modal";
import UpdateInventoryAdd from "../screens/updateAdds/inventory"; //for update ad

function InventoryDetail() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const user = getCurrentUser();
  const token = getToken();
  const role = getUserRole();
  const { data, isLoading } = useGetSingleInventoryQuery(id);
  const [completeOrder, { isLoading: Loading }] = useCompleteOrderMutation();
  const [deleteInventory, { isLoading: loading }] =
    useDeleteInventoryMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSelectedConversation } = useConversation();
  const { state } = useLocation();
  const current = useSelector((state) => state.currentUser);

  const {
    postedBy = {},
    _id = "",
    inventoryType = "",
    inventorySize = "",
    inventoryWeight = 0,
    ownerName = "",
    phoneNumber = "",
    location = "",
    countryName = "",
    stateName = "",
    city = "",
    inventoryPicture = [],
    status = "",
  } = data?.data || {};

  const handleDeleteInventory = async () => {
    try {
      const { message } = await deleteInventory({
        id: id,
        authToken: token,
      }).unwrap();
      toast.success(message);
      navigate(PATH.MYADDS);
      dispatch(inventoryAddApi.util.invalidateTags(["Inventory"]));
    } catch (error) {
      console.log(error);
      toast.error("SERVER ERROR");
    }
  };

  const handleUpdateInventory = () => {
    setOpenModal(true);
  };

  const handleChat = () => {
    setSelectedConversation(postedBy);
    if (!user) {
      setLoginOpen(true);
    } else {
      navigate(PATH.CHAT);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      const { message } = await completeOrder({
        inventoryId: _id,
        loaderId: state?.loaderId,
      }).unwrap();
      toast.success(message);
      navigate(PATH.HOME);
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };
  const numberavail = ()=>{
    if(!user){
      return (<b className=" text-blue-800">Login to view</b>)
    }else{return (phoneNumber)}
  }
  return (
    <>
      <ModalCustom open={loginOpen} setOpen={() => setLoginOpen(!loginOpen)}>
        <Login
          className="p-4"
          closeModal={() => setLoginOpen(!loginOpen)}
          notNavigation={true}
        />
      </ModalCustom>

      <ModalCustom open={openModal} setOpen={() => setOpenModal(!openModal)}>
        <UpdateInventoryAdd id={id} />
      </ModalCustom>
      <NavbarComponent />
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div className="shadow-xl w-[80%] mx-auto p-4 my-8">
          <p className="text-center text-xl font-bold">Inventory Detail</p>
          <div className="flex justify-end">
            {(!user || (user && user?._id !== postedBy?._id)) &&
              status === "posted" && (
                <Button
                  className="bg-navy w-[100px] hover:bg-[hsl(0,100%,4%)] hover:text-white"
                  onClick={handleChat}
                >
                  Chat
                </Button>
              )}

            {user?._id !== postedBy?._id && status !== "posted" && (
              {/* <Button
                className="bg-navy  hover:bg-[hsl(0,100%,4%)] hover:text-white "
                onClick={handleCompleteOrder}
              >
                {Loading ? "Completing..." : "Complete Order"}
              </Button> */}
            )}
            {user && user?._id === postedBy?._id && status === "posted" ? (
              <>
                <Button
                  className="bg-red-500 w-[100px]"
                  onClick={handleDeleteInventory}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>

                <Button
                  className="bg-blue-500 w-[100px] ml-2"
                  onClick={handleUpdateInventory}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </>
            ) : (
              user &&
              user?._id === postedBy?._id && (
                <p className="bg-navy px-4 py-2 text-white rounded-lg">
                  {status}
                </p>
              )
            )}
          </div>
          <div className="flex justify-between flex-wrap p-4">
            <p>
              <span className="font-bold">Type: </span> {inventoryType}
            </p>
            <p>
              <span className="font-bold">Size: </span> {inventorySize}
            </p>
            <p>
              <span className="font-bold">Weight: </span> {inventoryWeight}
            </p>
          </div>

          <div className="flex justify-between flex-wrap p-4">
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

          <div className="flex justify-between flex-wrap p-4">
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
          <ImageCarousel data={inventoryPicture} />
        </div>
      )}
      <FooterComponent />
    </>
  );
}

export default InventoryDetail;
