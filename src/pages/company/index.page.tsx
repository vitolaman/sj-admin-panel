import { useState } from "react";
import ContentContainer from "components/container";
import { Button, Dropdown } from "react-daisyui";
import { Columns, Table } from "components/table/table";
import {
  useGetCompanyListQuery,
  useUpdateEligibilityMutation,
  useUpdateStatusMutation,
} from "services/modules/company";
import Pagination from "components/table/pagination";
import { CompanyI, GetCompanyParams } from "_interfaces/company.interfaces";
import moment from "moment";
import { FiEdit, FiFileText, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchInput from "components/search-input";
import { rupiahFormatter } from "_helper/formatters";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { MdBlock, MdOutlineVerified } from "react-icons/md";
import { errorHandler } from "services/errorHandler";

const Company = () => {
  const [params, setParams] = useState<GetCompanyParams>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetCompanyListQuery(params);
  const [updateStatus] = useUpdateStatusMutation();
  const [updateEligibility] = useUpdateEligibilityMutation();
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
      fieldId: "is_active",
      label: "Status",
      render: (data) => (
        <div className="flex justify-center items-center gap-3">
          <div
            className="tooltip tooltip-bottom"
            data-tip={data?.is_active ? "Deactive Company" : "Active Company"}
          >
            <div
              className="cursor-pointer text-xl w-1/2"
              onClick={() => {
                handleUpdateStatus(data!);
              }}
            >
              {data?.is_active ? <IoMdUnlock /> : <IoMdLock />}
            </div>
          </div>
          <div className="w-1/2">{data?.is_active ? "Active" : "Inactive"}</div>
        </div>
      ),
    },
    {
      fieldId: "is_production_eligible",
      label: "Production Eligible",
      render: (data) => (
        <div className="flex justify-center items-center gap-3">
          <div
            className="tooltip tooltip-bottom"
            data-tip={
              data?.is_production_eligible ? "Set not eligible" : "Set Eligible"
            }
          >
            <div
              className="cursor-pointer text-xl w-1/2"
              onClick={() => handleUpdateEligibility(data!)}
            >
              {data?.is_production_eligible ? (
                <MdOutlineVerified />
              ) : (
                <MdBlock />
              )}
            </div>
          </div>
          <div className="w-1/2">
            {data?.is_production_eligible ? "Eligible" : "Not Eligible"}
          </div>
        </div>
      ),
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
          {data?.share_percentage === 0
            ? `Rp. ${rupiahFormatter(data?.share)}`
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
        <Dropdown horizontal="left">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={24} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-36 bg-white z-50 -translate-y-9">
            <Dropdown.Item
              className="font-medium hover:bg-gray-300"
              onClick={() => navigate(`/company/${data?.id}/edit`)}
            >
              <FiEdit /> Edit
            </Dropdown.Item>
            <Dropdown.Item
              className="font-medium hover:bg-gray-300"
              onClick={() => navigate(`/company/${data?.id}/detail`)}
            >
              <FiFileText /> Detail
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleUpdateEligibility = async (company: CompanyI) => {
    try {
      await updateEligibility({
        is_production_eligible: !company.is_production_eligible,
        id: company.id,
      }).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdateStatus = async (company: CompanyI) => {
    try {
      await updateStatus({
        is_active: !company.is_active,
        id: company.id,
      }).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
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
