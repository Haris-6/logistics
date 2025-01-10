import React from "react";
import { getToken } from "../../utils/currentUser";
import {
  inventoryAddApi,
  useGetPersonalAddsQuery,
} from "../../redux/api/inventoryAdd";
import Inventory from "./inventory";
import SpinnerComponent from "../../components/spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utils/path";
import { useDispatch } from "react-redux";
import { bookingApi, useShippInventoryMutation } from "../../redux/api/booking";
import { truckAddApi } from "../../redux/api/truckadd";

function Inventories({ closeModal, loaderId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();
  const { data, isLoading } = useGetPersonalAddsQuery(token);
  const [shipInventory, { isLoading: loading }] = useShippInventoryMutation();

  const handleBookInventory = async (id) => {
    try {
      const { message } = await shipInventory({
        inventoryId: id,
        loaderId,
      }).unwrap();

      toast.success(message);
      closeModal();
      navigate(PATH.HOME);

      dispatch(bookingApi.util.invalidateTags(["Booking"]));
      dispatch(inventoryAddApi.util.invalidateTags(["Inventory"]));
      dispatch(truckAddApi.util.invalidateTags(["Truck"]));
    } catch (error) {
      toast.error("Server ERROR");
    }
  };

  return (
    <div>
      {isLoading ? (
        <SpinnerComponent />
      ) : data?.data?.length === 0 ? (
        <p className="text-gray-500 text-center m-4">
          You have no Inventory to Ship
        </p>
      ) : (
        data?.data?.map((obj, i) => (
          <Inventory
            data={obj}
            key={i}
            index={i}
            length={data?.data.length}
            handleBookInventory={handleBookInventory}
          />
        ))
      )}
    </div>
  );
}

export default Inventories;
