import { ClientI } from "_interfaces/client.interfaces";
import { PendingItemI } from "_interfaces/item.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { usePendingListQuery } from "services/modules/pending";

export const osiRouteName = "";
export const OutgoingStockList = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = usePendingListQuery(params);
  const navigate = useNavigate();

  // Define the table columns for items
  const header: Columns<PendingItemI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "itemId",
      label: "Kode Barang",
    },
    {
      fieldId: "itemName",
      label: "Nama Barang",
    },
    {
      fieldId: "totalStock",
      label: "stok",
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Pending Item List</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) => {
              setParams((prev) => ({ ...prev, search: text }));
            }}
          />
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<PendingItemI>
          columns={header}
          data={data?.data} // Assuming the response is itemList
          loading={isLoading}
          // onRowClick={(item) => navigate(`/client/${item.id}/detail`)}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.meta?.currentPage ?? 1}
          totalPages={data?.meta?.totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default OutgoingStockList;
