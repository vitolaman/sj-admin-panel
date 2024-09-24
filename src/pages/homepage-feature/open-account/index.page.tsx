import { BannerList } from "_interfaces/banner.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import {
  FiEdit,
  FiMinusCircle,
  FiMoreHorizontal,
  FiPlusCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "services/errorHandler";
import {
  useBannerListQuery,
  useChangeStatusBannerMutation,
} from "services/modules/banner";

export const openAccountRouteName = "open-account";
const OpenAccount = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    search: "",
    status: "",
    type: "open_account",
    page: 1,
    limit: 10,
  });
  const { data, isLoading, refetch } = useBannerListQuery(params);
  const [changeStatusBanner] = useChangeStatusBannerMutation();
  const handleChangeStatus = async (id: string, status: boolean) => {
    try {
      await changeStatusBanner({ id: id, is_active: status }).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };
  const getStatusColor = (
    is_active: boolean
  ): { bgColor: string; textColor: string; status: string; color: string } => {
    if (is_active) {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-persian-green",
        status: "Active",
        color: "#27a590",
      };
    } else {
      return {
        bgColor: "bg-[#E9E9E9]",
        textColor: "text-[#7C7C7C]",
        status: "Deactivate",
        color: "#BB1616",
      };
    }
  };
  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<BannerList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Account Name",
      render: (item) => (
        <p className="font-poppins font-normal text-sm text-[#201B1C]">
          {item?.name && item?.name.length > 40
            ? `${item?.name.substring(0, 39)}...`
            : item?.name}
        </p>
      ),
    },
    {
      fieldId: "external_url",
      label: "Register Link	",
      render: (item) => (
        <p className="font-poppins font-normal text-sm text-[#201B1C]">
          {item?.external_url && item?.external_url.length > 40
            ? `${item?.external_url.substring(0, 39)}...`
            : item?.external_url}
        </p>
      ),
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
      render: (item) => {
        const { status, color } = getStatusColor(!item?.is_active);
        return (
          <Dropdown horizontal="left" vertical="top">
            <Dropdown.Toggle size="xs" button={false}>
              <Button size="xs" className="border-none p-0">
                <FiMoreHorizontal color="#27a590" size={20} />
              </Button>
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-white z-10 w-[200px] rounded-[10px] flex flex-col gap-2">
              <Dropdown.Item
                className="p-0"
                onClick={() => {
                  navigate(`/homepage-feature/open-account/${item?.id}/edit`);
                }}
              >
                <Button
                  fullWidth
                  size="xs"
                  className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                  startIcon={<FiEdit color="#201B1C" size={20} />}
                >
                  Edit Open Account
                </Button>
              </Dropdown.Item>
              <Dropdown.Item
                className="p-0"
                onClick={() => {
                  handleChangeStatus(item?.id!, item?.is_active ? false : true);
                }}
              >
                <Button
                  fullWidth
                  size="xs"
                  className={`border-none shadow-none p-0 font-normal font-poppins text-sm text-[${color}]`}
                  startIcon={
                    item?.is_active ? (
                      <FiMinusCircle color={color} size={20} />
                    ) : (
                      <FiPlusCircle color={color} size={20} />
                    )
                  }
                >
                  {status}
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <ContentContainer>
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            List Open Account
          </h1>
          <div className="flex flex-col md:flex-row gap-3">
            <SearchInput
              placeholder="Search"
              disabled={true}
              formClassName="bg-[#F5F5F5]"
            />
            <Button
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              onClick={() => {
                navigate("/homepage-feature/open-account/create");
              }}
            >
              Add Account
            </Button>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<BannerList>
            columns={header}
            loading={isLoading}
            data={data?.data}
            currentPage={params.page}
            limit={params.limit}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={data?.metadata?.currentPage ?? 1}
            totalPages={data?.metadata.totalPage ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default OpenAccount;
