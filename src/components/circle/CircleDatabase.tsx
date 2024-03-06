import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import ModalFilterCircleDatabase from "components/modal/circle/ModalFilterCircleDatabase";
import { Button } from "react-daisyui";
import moment from "moment";
import { CircleList, CircleReq } from "_interfaces/circle.interface";
import { useCircleListQuery } from "services/modules/circle";
import { Columns, Table } from "components/table/table";
import Pagination from "components/table/pagination";
import { type Option } from "components/forms/Select";
import SearchInput from "components/search-input";
interface CircleDatabaseProps {}

const CircleDatabase: React.FC<CircleDatabaseProps> = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<CircleReq>({
    search: "",
    limit: 10,
    page: 1,
    sort_by: "created_at",
    order: "asc",
    type: "",
    total_member_from: "",
    total_member_to: "",
    total_post_from: "",
    total_post_to: "",
    total_like_from: "",
    total_like_to: "",
    total_share_from: "",
    total_share_to: "",
    created_at_from: "",
    created_at_to: "",
  });

  const { data, isLoading } = useCircleListQuery(filter);
  const router = useNavigate();
  const header: Columns<CircleList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Circle ID",
    },
    {
      fieldId: "name",
      label: "Circle Name",
      render: (data) => (data?.name !== undefined ? data?.name : "-"),
    },
    {
      fieldId: "type",
      label: "Type",
      render: (data) => (data?.type !== undefined ? data?.type : "-"),
    },
    {
      fieldId: "created_at",
      label: "Created At",
      render: (data) => (
        <>{moment(data?.created_at).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
      renderHeader: () => (
        <>
          {filter.order === "asc" ? (
            <ArrowUpCircleIcon
              className="w-5 h-5 text-[#27A590] ml-2"
              onClick={handleOrderCircleId}
            />
          ) : (
            <ArrowDownCircleIcon
              className="w-5 h-5 text-[#27A590] ml-2"
              onClick={handleOrderCircleId}
            />
          )}
        </>
      ),
    },
    {
      fieldId: "total_member",
      label: "Members",
      render: (data) => (
        <>{data?.total_member !== undefined ? data.total_member : "-"}</>
      ),
    },
    {
      fieldId: "total_post",
      label: "Post",
      render: (data) => (
        <>{data?.total_post !== undefined ? data.total_post : "-"}</>
      ),
    },
    {
      fieldId: "action",
      label: "Action",
      render: (data) => (
        <Button
          type="button"
          onClick={() => moveToCircleDetail(data?.id as string)}
          className="inline-flex items-center px-4 h-[35px] text-[16px] border border-transparent text-xs font-semibold rounded-full text-white bg-[#3AC4A0] hover:bg-[#3AC4A0]/90"
        >
          View Detail
        </Button>
      ),
    },
  ];

  const handleOpenFilter = (): void => {
    setOpenFilter(!openFilter);
  };

  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };

  const handleChangeFilter = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOrderCircleId = (): void => {
    if (filter.order === "asc") {
      setFilter((prevState) => ({
        ...prevState,
        order: "desc",
      }));
    } else {
      setFilter((prevState) => ({
        ...prevState,
        order: "asc",
      }));
    }
  };

  const handleChageFilterType = (data: Option): void => {
    setFilter((prevState) => ({
      ...prevState,
      type: data.data,
    }));
  };

  const handleChangeDateFrom = (createdAtFrom: string): void => {
    setFilter((prevState) => ({
      ...prevState,
      created_at_from: createdAtFrom,
    }));
  };

  const handleChangeDateTo = (createdAtTo: string): void => {
    setFilter((prevState) => ({
      ...prevState,
      created_at_to: createdAtTo,
    }));
  };
  console.log(filter);

  const moveToCircleDetail = (circleId: string) => {
    router(`/circle/circle-detail/${circleId}`);
  };

  const clearFilter = (): void => {
    setFilter({
      search: "",
      limit: 10,
      page: 1,
      sort_by: "created_at",
      order: "asc",
      type: "",
      total_member_from: "",
      total_member_to: "",
      total_post_from: "",
      total_post_to: "",
      total_like_from: "",
      total_like_to: "",
      total_share_from: "",
      total_share_to: "",
      created_at_from: "",
      created_at_to: "",
    });
    setOpenFilter(!openFilter);
  };
  return (
    <>
      <ModalFilterCircleDatabase
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
        changeFilter={handleChangeFilter}
        filter={filter}
        changeFilterType={handleChageFilterType}
        changeDateFrom={handleChangeDateFrom}
        changeDateTo={handleChangeDateTo}
        clearFilter={clearFilter}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl text-[#262626] font-semibold">
                Circle Database
              </h3>
              <div className="flex items-center justify-between gap-4 ml-4">
                <SearchInput
                  placeholder="Search"
                  onSubmit={({ text }) => {
                    setFilter((prev) => ({ ...prev, search: text }));
                  }}
                />
                <Button
                  className="bg-transparent rounded-full py-2 px-3 border border-[#3AC4A0] h-fit"
                  onClick={handleOpenFilter}
                >
                  <CiFilter className="text-xl font-normal text-[#3AC4A0]" />
                </Button>
                <Button className="bg-transparent rounded-full py-2 px-3 border border-[#3AC4A0] h-fit">
                  <FiDownload className="text-xl font-normal text-[#3AC4A0]" />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                    <Table<CircleList>
                      columns={header}
                      data={data?.data}
                      loading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Pagination
                currentPage={data!?.metadata!.current_page}
                totalPages={data!?.metadata!.total_page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircleDatabase;
