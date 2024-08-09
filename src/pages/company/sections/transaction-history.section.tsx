import {
  GetTransactionHistoryParams,
  TransactionHistoryI,
} from "_interfaces/company.interfaces";
import { Loader } from "components/spinner/loader";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { useGetTransactionHistoryQuery } from "services/modules/company";

const TransactionHistory = ({ id }: { id: string }) => {
  const [params, setParams] = useState<GetTransactionHistoryParams>({
    id: id,
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetTransactionHistoryQuery(params);

  const header: Columns<TransactionHistoryI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "user_name",
      label: "Username",
    },
    {
      fieldId: "item_name",
      label: "Item Name",
    },
    {
      fieldId: "transaction_status",
      label: "Payment Status",
    },
    {
      fieldId: "created_at",
      label: "Transaction Date",
      render: (item) => (
        <div>{moment(item?.created_at).format("DD/MM/YYYY HH:mm")}</div>
      ),
    },
    {
      fieldId: "payment_method",
      label: "Payment Method",
    },
    {
      fieldId: "payment_gateway",
      label: "Account Name",
    },
    {
      fieldId: "amount",
      label: "Amount",
      render: (item) => (
        <div>
          {item?.amount.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };
  return (
    <>
      <div className="w-full flex flex-row">
        <h1 className="font-semibold text-2xl">History Transaction</h1>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <Table<TransactionHistoryI>
            columns={header}
            data={data?.transactions}
            loading={isLoading}
          />
        )}
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.current_page ?? 1}
          totalPages={data?.metadata?.total_page ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TransactionHistory;
