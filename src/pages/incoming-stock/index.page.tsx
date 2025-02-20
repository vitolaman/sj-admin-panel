import { PendingItemI, StockIncomingI } from "_interfaces/item.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIncomingListQuery } from "services/modules/stock";

export const isiRouteName = "";
export const IncomingStockList = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useIncomingListQuery(params);
  const navigate = useNavigate();

  // Define the table columns for items
  const header: Columns<StockIncomingI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "itemId",
      label: "Kode Barang",
      render: (data) => <>{`${data?.item?.id}`}</>,
    },
    {
      fieldId: "itemName",
      label: "Nama Barang",
      render: (data) => <>{`${data?.item?.name}`}</>,
    },
    {
      fieldId: "totalStock",
      label: "stok",
      render: (data) => <>{`${data?.amount}`}</>,
    },
    {
      fieldId: "reffNo",
      label: "Surat Jalan",
      render: (data) => <>{`${data?.stockOrder?.reffNo}`}</>,
    },
    {
      fieldId: "createdAt",
      label: "Tanggal",
      render: (data) => <>{`${moment(data?.createdAt).format('DD MMM YYYY, hh:mm')} WIB`}</>,
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Transaksi Masuk Gudang</h1>
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
        <Table<StockIncomingI>
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

export default IncomingStockList;
