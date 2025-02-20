import { rupiahFormatter } from "_helper/formatters";
import { BillI } from "_interfaces/bill.interface";
import { ClientI } from "_interfaces/client.interfaces";
import { ItemI } from "_interfaces/item.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useBillListQuery } from "services/modules/bill";

export const billRouteName = "";
export const BillList = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useBillListQuery(params);
  const navigate = useNavigate();

  // Define the table columns for items
  const header: Columns<BillI>[] = [
    {
      fieldId: "id",
      label: "Nomor Nota",
    },
    {
      fieldId: "client",
      label: "Client",
      render: (data) => (
        <>{`${data?.client?.clientCode} - ${data?.client?.name}`}</>
      ),
    },
    {
      fieldId: "createdBy",
      label: "sales",
      render: (data) => <>{`${data?.createdBy?.firstName}`}</>,
    },
    {
      fieldId: "paymentStatus",
      label: "Pembayaran",
    },
    {
      fieldId: "total",
      label: "Total",
      render: (data) => <>{`${rupiahFormatter(data?.total)}`}</>,
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Daftar Nota</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) => {
              setParams((prev) => ({ ...prev, search: text }));
            }}
          />
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              navigate("/client/create");
            }}
          >
            Buat Nota Baru
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<BillI>
          columns={header}
          data={data?.data} // Assuming the response is BillList
          loading={isLoading}
          onRowClick={(item) => navigate(`/nota/${item.id}/detail`)}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.currentPage ?? 1}
          totalPages={data?.metadata?.totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default BillList;
