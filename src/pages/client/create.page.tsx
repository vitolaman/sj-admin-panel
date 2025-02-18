import React from "react";
import ContentContainer from "components/container";
import { Button } from "react-daisyui";
import CInput from "components/input";
import { useNavigate } from "react-router-dom";
import useCreateClientData from "hooks/client/useCreateClient";

export const ccRouteName = "create";
const CreateItem = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isLoading, sendClientData, reset } =
    useCreateClientData();

  const onSubmit = (data: any) => {
    sendClientData(data);
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
            <label className="font-semibold">Nama</label>
            <CInput
              {...register("name", { required: "Nama is required" })}
              error={errors.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Kota</label>
            <CInput
              {...register("city", { required: "Kota is required" })}
              error={errors.city}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Kode Toko</label>
            <CInput
              {...register("clientCode", { required: "Kode Toko is required" })}
              error={errors.clientCode}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Kode Sales</label>
            <CInput
              {...register("salesId", { required: "Kode Sales is required" })}
              error={errors.salesId}
            />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateItem;
