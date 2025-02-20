import { ClientI } from "_interfaces/client.interfaces";
import { ItemI } from "_interfaces/item.interfaces";
import { StockOrderI, StockOrderItem } from "_interfaces/stock-orders.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useStockOrderListQuery } from "services/modules/stock-order";

export const soiRouteName = "";
export const StockOrderList = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useStockOrderListQuery(params);
  const navigate = useNavigate();

  // Define the table columns for items
  const header: Columns<StockOrderI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "reffNo",
      label: "Nomor Referensi",
    },
    {
      fieldId: "status",
      label: "Status",
    },
    // {
    //   fieldId: "stockOrderItems",
    //   label: "Barang",
    //   render: (data) => (
    //     <>{`${data?.item?.id}`}</>
    //   ),
    // },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Stock Order List</h1>
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
            Buat Stok Order Baru
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<StockOrderI>
          columns={header}
          data={data?.data} // Assuming the response is itemList
          loading={isLoading}
          onRowClick={(item) => navigate(`/stock-order/${item.id}/detail`)}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.meta?.currentPage ?? 1}
          totalPages={data?.meta?.totalPages ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default StockOrderList;
