import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import { useState } from "react";
import {
  GetSeedsCoinQuery,
  SeedsCoinManagementI,
} from "_interfaces/seeds-coin-management.interfaces";
import { Columns, Table } from "components/table/table";
import { useGetSeedsCoinQuery, useLazyGetSeedsCoinByIdQuery } from "services/modules/seeds-coin-management";
import Pagination from "components/table/pagination";
import { Button, Dropdown } from "react-daisyui";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import { errorHandler } from "services/errorHandler";
import SeedsCoinForm from "./sections/form.section";

export const seedsCoinRouteName = "seeds-coin-management";
const SeedsCoinManagement = () => {
  const [open, setOpen]=useState<boolean>(false)
  const [params, setParams] = useState<GetSeedsCoinQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const [getSeedsCoin, SeedsCoinDetailState] = useLazyGetSeedsCoinByIdQuery();
  const { data, isLoading, refetch } = useGetSeedsCoinQuery(params);

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };
  const handleEdit = async (id: string) => {
    try {
      await getSeedsCoin(id).unwrap();
      setOpen(!open);
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<SeedsCoinManagementI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Activity",
    },
    {
      fieldId: "updated_at",
      label: "Update",
      render: (item) => {
        const convertDate = new Date(item?.updated_at!).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        return (
          <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
            {`${convertDate.split(",")[0].split(" ").reverse().join(" ")} ${
              convertDate.split(",")[1]
            }`}
          </p>
        );
      },
    },
    {
      fieldId: "started_at",
      label: "Start Date",
      render: (item) => {
        const convertDate = new Date(item?.started_at!).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        return (
          <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
            {`${convertDate.split(",")[0].split(" ").reverse().join(" ")} ${
              convertDate.split(",")[1]
            }`}
          </p>
        );
      },
    },
    {
      fieldId: "expired_at",
      label: "End Date",
      render: (item) => {
        const convertDate = item?.expired_at===undefined?undefined:new Date(item?.expired_at!).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        return (
          <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
            {convertDate===undefined?'No Expired':`${convertDate.split(",")[0].split(" ").reverse().join(" ")} ${
              convertDate.split(",")[1]
            }`}
          </p>
        );
      },
    },
    {
      fieldId: "coins",
      label: "Coin Value",
    },    {
      fieldId: "is_active",
      label: "Status",
      render: (item) => {
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] ${
              item?.is_active
                ? "bg-[#DCFCE4] text-persian-green"
                : "bg-[#FFF7D2] text-[#D89918]"
            }`}
          >
            {item?.is_active ? "Active" : "Inactive"}
          </span>
        );
      },
    },    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={20} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white z-10 w-[90px] rounded-[10px] flex flex-col gap-2">
            <Dropdown.Item
              className="p-0"
              onClick={() => {
                setOpen(!open);
                handleEdit(item?.id!)
              }}
            >
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
      <SeedsCoinForm data={SeedsCoinDetailState.data!} open={open} setOpen={setOpen} refetch={refetch} />
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            Seeds Coin Management
          </h1>
          <div className="flex flex-col md:flex-row gap-3">
            <SearchInput
              placeholder="Search"
              onSubmit={({ text }) =>
                setParams((prev) => ({
                  ...prev,
                  page: 1,
                  search: text,
                }))
              }
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<SeedsCoinManagementI>
            columns={header}
            loading={isLoading}
            data={data?.configurations}
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
      </div>
    </ContentContainer>
  );
};

export default SeedsCoinManagement;
