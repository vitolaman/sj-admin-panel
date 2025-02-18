import { ItemI } from "_interfaces/item.interfaces";
import { PlayI } from "_interfaces/play.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useItemListQuery } from "services/modules/play";

export const playRouteName = "";
export const ItemList = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useItemListQuery(params);
  const navigate = useNavigate();

  // Define the table columns for items
  const header: Columns<ItemI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Item Name",
    },
    {
      fieldId: "type",
      label: "Type",
    },
    {
      fieldId: "stock",
      label: "Stock",
    },
    {
      fieldId: "normalStockValue",
      label: "Normal Stock Value",
    },
    {
      fieldId: "price",
      label: "Price",
      render: (data) => <>IDR {data?.price}</>,
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Item List</h1>
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
              navigate("/item/create");
            }}
          >
            Create New Item
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<ItemI>
          columns={header}
          data={data?.data} // Assuming the response is itemList
          loading={isLoading}
          onRowClick={(item) => navigate(`/item/${item.id}/detail`)}
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

export default ItemList;
