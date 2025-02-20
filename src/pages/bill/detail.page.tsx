import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import { Loader } from "components/spinner/loader";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { useCancelPlayMutation, useItemByIdQuery } from "services/modules/play";
import { errorHandler } from "services/errorHandler";
import CInput from "components/input";
import useUpdateItemData from "hooks/item/useUpdateItem";
import useUpdateClientData from "hooks/client/useUpdateClient";
import { useBillByIdQuery } from "services/modules/bill";
import { Columns, Table } from "components/table/table";
import { BillI, Item } from "_interfaces/bill.interface";
import Pagination from "components/table/pagination";
import { ItemI } from "_interfaces/item.interfaces";

export const bdRouteName = ":id/detail";
const BillDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);

  const { data, isLoading } = useBillByIdQuery(params.id!);
  console.log(data?.items);
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

  const header: Columns<Item>[] = [
    {
      fieldId: "index",
      label: "Nomor",
    },
    {
      fieldId: "idBarang",
      label: "Kode Barang",
      render: (data) => <>{`${data?.item?.id}`}</>,
    },
    {
      fieldId: "price",
      label: "Harga",
      render: (data) => <>{`${data?.item?.price}`}</>,
    },
    {
      fieldId: "quantity",
      label: "jumlah",
      render: (data) => <>{`${data?.quantity}`}</>,
    },
    {
      fieldId: "total",
      label: "Total",
      render: (data) => (
        <>{`${(data?.item?.price as number) * (data?.quantity as number)}`}</>
      ),
    },
  ];

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
        title="Apakah anda yakin tidak jadi mengubah nota?"
        subTitle="Perubahan tidak akan tersimpan"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Detail Nota
            </h3>
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
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<Item>
            columns={header}
            data={data?.items} // Assuming the response is BillList
            loading={isLoading}
            onRowClick={(item) => navigate(`/nota/${item.id}/detail`)}
          />
        </div>
      </form>
    </ContentContainer>
  );
};

export default BillDetail;
