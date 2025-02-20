import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import { Loader } from "components/spinner/loader";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandler } from "services/errorHandler";
import CInput from "components/input";
import useUpdateClientData from "hooks/client/useUpdateClient";
import { useIncomingByIdQuery } from "services/modules/stock";

export const isdRouteName = ":id/detail";
const IncomingStockDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);

  const { data, isLoading } = useIncomingByIdQuery(params.id!);
  const {
    register,
    handleSubmit,
    errors,
    response,
    error,
    sendItemData,
    setValue,
    reset,
  } = useUpdateClientData(params.id!);

  const cancel = async () => {
    try {
      if (params.id) {
        navigate(-1);
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const onSubmit = (data: any) => {
    sendItemData(data);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <ContentContainer>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={cancel}
        alertType="warning"
        title="Are you sure want to cancel this play?"
        subTitle="This game will be cancel"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">Pending</h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
            >
              Cancel
            </Button>
            {enableEdit ? (
              <Button
                type="submit"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              >
                Save
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
                onClick={() => {
                  setTimeout(() => {
                    setEnableEdit((prev) => !prev);
                  }, 400);
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">ID</label>
            <CInput {...register("id")} disabled={true} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nama</label>
            <CInput {...register("name")} disabled={!enableEdit} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Kota</label>
            <CInput {...register("city")} disabled={!enableEdit} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Kode Toko</label>
            <CInput {...register("clientCode")} disabled={!enableEdit} />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default IncomingStockDetail;
