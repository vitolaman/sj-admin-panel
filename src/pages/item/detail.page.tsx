import classNames from "classnames";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import { Loader } from "components/spinner/loader";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCancelPlayMutation,
  useItemByIdQuery,
  usePlayByIdQuery,
} from "services/modules/play";
import { errorHandler } from "services/errorHandler";
import useUpdatePlayForm from "hooks/play/useUpdatePlayForm";
import CInput from "components/input";
import { PlayI } from "_interfaces/play.interfaces";
import useUpdateItemData from "hooks/item/useUpdateItem";

export const idRouteName = ":id/detail";
const ItemDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);

  const { data, isLoading } = useItemByIdQuery(params.id!);
  const [cancelPlay, cancelPlayState] = useCancelPlayMutation();
  const {
    register,
    handleSubmit,
    errors,
    response,
    error,
    sendItemData,
    setValue,
    reset,
  } = useUpdateItemData(params.id!);

  const cancel = async () => {
    try {
      if (params.id) {
        await cancelPlay(params.id).unwrap();
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
            <h3 className="text-2xl text-[#262626] font-semibold">
              Play Arena Details
            </h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setIsOpen(true);
              }}
              loading={cancelPlayState.isLoading}
              type="button"
            >
              Cancel
            </Button>
            {enableEdit ? (
              <Button
                type="submit"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
                loading={cancelPlayState.isLoading}
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
                loading={cancelPlayState.isLoading}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">ID</label>
            <CInput {...register("id")} disabled={!enableEdit} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nama</label>
            <CInput {...register("name")} disabled={!enableEdit} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Tipe</label>
            <CInput {...register("type")} disabled={!enableEdit} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Stok</label>
            <CInput {...register("stock")} disabled={true} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Stok Normal</label>
            <CInput {...register("normalStockValue")} disabled={!enableEdit} />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default ItemDetail;
