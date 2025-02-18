import React from "react";
import ContentContainer from "components/container";
import { Button } from "react-daisyui";
import CInput from "components/input";
import { useNavigate } from "react-router-dom";
import useCreateItemData from "hooks/item/useCreateItem";

export const ciRouteName = "create";
const CreateItem = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isLoading, sendItemData, reset } =
    useCreateItemData();

  const onSubmit = (data: any) => {
    sendItemData(data);
  };

  return (
    <ContentContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Item Details
            </h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                navigate(-1);
              }}
              loading={isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Item ID</label>
            <CInput
              {...register("id", { required: "Item ID is required" })}
              error={errors.id}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Item Name</label>
            <CInput
              {...register("name", { required: "Item Name is required" })}
              error={errors.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Item Type</label>
            <CInput
              {...register("type", { required: "Item Type is required" })}
              error={errors.type}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Stock</label>
            <CInput
              {...register("stock", { required: "Stock is required" })}
              error={errors.stock}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Normal Stock Value</label>
            <CInput
              {...register("normalStockValue", {
                required: "Normal Stock Value is required",
              })}
              error={errors.normalStockValue}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price</label>
            <CInput
              {...register("price", { required: "Price is required" })}
              error={errors.price}
            />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateItem;
