import { useState } from "react";
import ContentContainer from "components/container";
import { Button, Dropdown } from "react-daisyui";
import { Columns, Table } from "components/table/table";
import { useGetCompanyListQuery } from "services/modules/company";
import Pagination from "components/table/pagination";
import { CompanyI, GetCompanyParams } from "_interfaces/company.interfaces";
import moment from "moment";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchInput from "components/search-input";
import { currencyOptions } from "data/currency";
import { rupiahFormatter } from "_helper/formatters";

const Company = () => {
  const [params, setParams] = useState<GetCompanyParams>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading } = useGetCompanyListQuery(params);
  const navigate = useNavigate();

  const header: Columns<CompanyI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "ID Company",
    },
    {
      fieldId: "name",
      label: "Company Name",
    },
    {
      fieldId: "payment",
      label: "Payment Status",
      render: (data) => (
        <div className="font-medium">
          {data?.payment ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      fieldId: "withdrawal",
      label: "Withdrawal Status",
      render: (data) => (
        <div className="font-medium">
          {data?.withdrawal ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      fieldId: "share",
      label: "Margin Share",
      render: (data) => (
        <div className="font-medium">
          {data?.share !== 0
            ? `Rp. ${rupiahFormatter(data?.share)} `
            : `${data?.share_percentage}%`}
        </div>
      ),
    },
    {
      fieldId: "plan_expiry_date",
      label: "Active Until",
      render: (data) => (
        <div className="flex flex-row gap-4 justify-center items-end">
          <div className="font-medium">
            {data?.is_active
              ? moment(data.plan_expiry_date).format("DD/MM/YYYY hh:mm")
              : "-"}
          </div>
        </div>
      ),
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <Dropdown horizontal="left" className="relative">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={24} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="absolute w-36 bg-white z-10">
            <>
              <Dropdown.Item
                className="font-medium hover:bg-gray-300"
                onClick={() => navigate(`/company/${data?.id}/edit`)}
              >
                <FiEdit /> Edit
              </Dropdown.Item>
            </>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Company List</h1>
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) => {
              setParams((prev) => ({ ...prev, search: text }));
            }}
          />
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<CompanyI>
            columns={header}
            data={data?.data}
            loading={isLoading}
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
    </>
  );
};

export default Company;
