import React, { useEffect } from "react";  //useeffect use for latest ads 
import NavbarComponent from "../../../components/navbar";
import LoaderCardSkeleton from "../../../shimmer/loaders";
import InventoryCard from "../../../components/inventoryCard";
import ActiveOrderCard from "../../../components/activeOrderCard";
import { getToken } from "../../../utils/currentUser";  //check the user is login or not
import { useGetAllActiveAddsQuery } from "../../../redux/api/booking";
import LoaderOrderCard from "../../../components/LoaderOrderCard";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/path";

function ActiveAdds() {
  const token = getToken();
  const { data, isLoading, refetch } = useGetAllActiveAddsQuery();
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, []);

  const handleLoaderOrder = () => {
    navigate(
      `${PATH.SHOWINVENTORYDETAIL}/${data?.data?.loader?.orderId?.inventoryId?._id}`,
      { state: { loaderId: data?.data?.loader?._id } }
    );
  };
  return (
    <>
      <NavbarComponent />

      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center py-4 px-2 flex-wrap">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <LoaderCardSkeleton key={i} />
          ))
        ) : data?.data?.inventories?.length === 0 ? (
          <p className="font-inter text-xl ">No Active Inventory</p>
        ) : (
          data?.data?.inventories?.map((obj, i) => (
            <ActiveOrderCard
              data={obj}
              key={i}
              //   onClick={() => handleInventoryDetail(obj?._id)}
            />
          ))
        )}
      </div>

      <hr className="w-[80%] mx-aut p-4" />

      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center py-4 px-2 flex-wrap">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <LoaderCardSkeleton key={i} />
          ))
        ) : data?.data?.loader?.orderId ? (
          <LoaderOrderCard
            data={data?.data?.loader}
            onClick={handleLoaderOrder}
          />
        ) : (
          <p className="font-inter text-xl ">No Active Loader Order</p>
        )}
      </div>
    </>
  );
}

export default ActiveAdds;
