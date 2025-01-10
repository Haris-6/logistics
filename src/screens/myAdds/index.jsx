import { Dropdown } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryCard from "../../components/inventoryCard"; //getting invetory card
import LoaderCard from "../../components/loaderCard";//getting loader card
import ModalCustom from "../../components/modal";
import NavbarComponent from "../../components/navbar";
import { useGetPersonalAddsQuery } from "../../redux/api/inventoryAdd"; //function return only user inventory ads
import { useMyPersonalAddsQuery } from "../../redux/api/truckadd";//function return only user trucks ads
import LoaderCardSkeleton from "../../shimmer/loaders";
import { getToken } from "../../utils/currentUser";
import { PATH } from "../../utils/path";
import InventoryAdd from "../home/inventoryAdd"; //it provides a form for users to add inventory details.
import PostAdd from "../home/postAdd";  //it provides a form for users to add truck details.


const ADDPOSTLABEL = ["Loader", "Inventory"]; //An array containing labels for the types of ads a user can post

function MyAdds() {
  const token = getToken(); //Retrieves the current user's token using getToken function.
  const [addName, setAddName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useGetPersonalAddsQuery(token);//Hooks for fetching the user's inventory ads and loader ads, respectively.
  const { data: LoaderAdds } = useMyPersonalAddsQuery(token);

  const navigate = useNavigate();
  const handleInventoryDetail = (id) => {
    navigate(`${PATH.SHOWINVENTORYDETAIL}/${id}`);
  };

  const handleLoaderDetail = (id) => {
    navigate(`${PATH.SHOWLOADERDETAIL}/${id}`);
  };
  const handlePostAdd = (name) => {  //Sets the type of ad to be posted and opens the modal.
    setAddName(name);
    setOpenModal(true);
  };
  return (
    <div className="h-auto">
      <ModalCustom open={openModal} setOpen={setOpenModal}>  {/*Displays a modal with options to post a Loader or Inventory ad, depending on the addName state. */}
        <p className="text-center text-2xl font-bold">Post an Ad</p>
        {addName === "Loader" ? (
          <PostAdd closeModel={() => setOpenModal(false)} />
        ) : (
          <InventoryAdd closeModel={() => setOpenModal(false)} />
        )}
      </ModalCustom>
      <NavbarComponent />
      <div className="m-4 float-end">
        <Dropdown label="Post An Ad">
          {ADDPOSTLABEL?.map((obj, i) => (
            <Dropdown.Item onClick={() => handlePostAdd(obj)} key={i}>
              {obj}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>

      <p className="m-4 text-2xl font-inter">Inventory Ads</p>

      <div className="grid md:grid-cols-2  grid-cols-1 gap-4  py-4 px-2 flex-wrap w-full ">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <LoaderCardSkeleton key={i} />
          ))
        ) : data?.data.length === 0 ? (
          <p className="font-inter text-xl ">
            you have't post any Inventory Add
          </p>
        ) : (
          data?.data?.map((obj, i) => (
            <InventoryCard 
              data={obj}
              key={i}
              onClick={() => handleInventoryDetail(obj?._id)}
            />
          ))
        )}
      </div>

      <p className="m-4 text-2xl font-inter">Loader Ads</p>

      <div className="grid md:grid-cols-2  grid-cols-1 gap-4 py-4 px-2 flex-wrap w-full ">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <LoaderCardSkeleton key={i} />
          ))
        ) : LoaderAdds?.data.length === 0 ? (
          <p className="font-inter text-xl ">you have't post any Loader Add</p>
        ) : (
          LoaderAdds?.data?.map((obj, i) => (
            <LoaderCard
              data={obj}
              key={i}
              onClick={() => handleLoaderDetail(obj?._id)}
            />
          ))
        )}
       
      </div>
     
    </div>
  );
}

export default MyAdds;
