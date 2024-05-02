import {
  GetXPManagementQuery,
  XPManagementI,
} from "_interfaces/xp-management.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import { useGetXPManagementQuery } from "services/modules/xp-management";

export const xpRouteName = "xp-management";
const XPManagement = () => {
  const [params, setParams] = useState<GetXPManagementQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetXPManagementQuery(params);
  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };
  const getStatusColor = (
    is_active: boolean
  ): { bgColor: string; textColor: string; status: string } => {
    if (is_active) {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-persian-green",
        status: "Active",
      };
    } else {
      return {
        bgColor: "bg-[#FFF7D2]",
        textColor: "text-[#D89918]",
        status: "Inactive",
      };
    }
  };
  const header: Columns<XPManagementI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Activity",
    },
    {
      fieldId: "description",
      label: "Description",
      render: (item) => (
        <>
          {item?.description.length! > 20
            ? `${item?.description.substring(0, 20)} ...`
            : item?.description}
        </>
      ),
    },
    {
      fieldId: "started_at",
      label: "Start Date",
      render: (item) => (
        <>{moment(item?.started_at).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "expired_at",
      label: "End Date",
      render: (item) => (
        <>{moment(item?.expired_at).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "",
      label: "Max Activity",
    },
    {
      fieldId: "exp_gained",
      label: "XP Gained",
    },
    {
      fieldId: "is_active",
      label: "Status",
      render: (item) => {
        const { bgColor, textColor, status } = getStatusColor(item?.is_active!);
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] ${bgColor} ${textColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <Dropdown horizontal="left" vertical="top">
          <Dropdown.Toggle size="xs">
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white z-10 w-[107px] rounded-[10px] flex flex-col gap-2">
            <Dropdown.Item className="p-0">
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                startIcon={<FiEdit color="#201B1C" size={20} />}
              >
                Edit
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">XP Management</h1>
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
        <Table<XPManagementI>
          columns={header}
          loading={isLoading}
          data={data?.data}
          currentPage={params.page}
          limit={params.limit}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.current_page ?? 1}
          totalPages={
            Math.ceil((data?.metadata?.total ?? 0) / params.limit) ?? 0
          }
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default XPManagement;
