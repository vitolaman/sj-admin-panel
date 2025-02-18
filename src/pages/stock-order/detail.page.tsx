import { ClientI } from "_interfaces/client.interfaces";
import { ItemI } from "_interfaces/item.interfaces";
import {
  StockOrderI,
  StockOrderItem,
} from "_interfaces/stock-orders.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import useApproveOrders, { approvalData } from "hooks/client/useApproveOrders";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import {
  useStockOrderByIdQuery,
  useStockOrderListQuery,
} from "services/modules/stock-order";
import { useAppSelector } from "store";

export const sodRouteName = ":id/detail";
const StockOrderDetail = () => {
  const { role } = useAppSelector((state) => state.auth);

  const params = useParams<{ id: string }>();

  const { data, isLoading } = useStockOrderByIdQuery(params?.id!);
  const [isApproved, setApproved] = useState(false);
  const { register, handleSubmit, errors, sendApproval, reset } =
    useApproveOrders();
  const navigate = useNavigate();

  const onSubmit = (data: approvalData) => {
    sendApproval(data);
  };

  // Define the table columns for items
  const header: Columns<StockOrderItem>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "stockOrderItems",
      label: "ID",
      render: (data) => <>{`${data?.item?.id}`}</>,
    },
    {
      fieldId: "stockOrderItems",
      label: "Barang",
      render: (data) => <>{`${data?.item?.name}`}</>,
    },
    {
      fieldId: "stockOrderItems",
      label: "Tipe",
      render: (data) => <>{`${data?.item?.type}`}</>,
    },
    {
      fieldId: "stockOrderItems",
      label: "Stok",
      render: (data) => <>{`${data?.item?.stock}`}</>,
    },
  ];

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Stock Order List</h1>
        <div className="flex flex-row gap-3"></div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<StockOrderItem>
          columns={header}
          data={data?.stockOrderItems} // Assuming the response is itemList
          loading={isLoading}
          onRowClick={(item) => navigate(`/client/${item.id}/detail`)}
        />
      </div>
      {role === "owner" && !isApproved && (data?.status === "requested" || data?.status === "pending") ? (
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            className="border-red-800 text-red-800 rounded-full px-10 mr-4"
            onClick={() => {
              onSubmit({
                id: parseInt(params?.id as string),
                status: "rejected",
              });
              setApproved(true);
            }}
            type="button"
          >
            Reject
          </Button>
          <Button
            className="bg-seeds hover:bg-seeds text-white rounded-full px-10"
            onClick={() => {
              onSubmit({
                id: parseInt(params?.id as string),
                status: "confirmed",
              });
              setApproved(true);
            }}
            // loading={cancelPlayState.isLoading}
            type="button"
          >
            Approve
          </Button>
        </div>
      ) : null}
    </ContentContainer>
  );
};

export default StockOrderDetail;
