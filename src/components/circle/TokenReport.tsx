import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import moment from "moment";
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button } from "react-daisyui";
import ModalFilterTokenReport from "components/modal/circle/ModalFilterTokenReport";
import ModalChangeStatusTokenReport from "components/modal/circle/ModalChangeStatusTokenReport";
import { TokenReportData, TokenReportReq } from "_interfaces/circle.interface";
import { useTokenReportListQuery } from "services/modules/circle";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import SearchInput from "components/search-input";

export default function TokenReport(): React.ReactElement {
  const [openFilter, setOpenFilter] = useState(false);
  const [modalChangeStatus, setModalChangeStatus] = useState(false);
  const [filter, setFilter] = useState<TokenReportReq>({
    search: "",
    limit: 10,
    page: 1,
    sort_by: "created_at",
    order: "asc",
    ticket: "",
    status: [],
    circle_owner_id: "",
    created_at_from: "",
    created_at_to: "",
  });
  const { data, isLoading } = useTokenReportListQuery(filter);

  const handleOpenFilter = (): void => {
    setOpenFilter(!openFilter);
  };

  const handleModalChangeStatus = (): void => {
    setModalChangeStatus(!modalChangeStatus);
  };

  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };

  const header: Columns<TokenReportData>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Ticket Id",
    },
    {
      fieldId: "name",
      label: "Circle Name",
    },
    {
      fieldId: "owner",
      label: "Circle Owner",
      render: (data) => (
        <>
          {data?.owner.name} <br />
          <p className="text-[#7C7C7C]">@{data?.owner.seeds_tag}</p>
        </>
      ),
    },
    {
      fieldId: "ticket",
      label: "Ticket",
    },
    {
      fieldId: "created_at",
      label: "Reported At",
      render: (data) => (
        <>{moment(data?.created_at).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
      renderHeader: () => (
        <>
          {filter.order === "asc" ? (
            <ArrowUpCircleIcon
              className="w-5 h-5 text-[#27A590] ml-2"
              onClick={handleOrderCreatedAt}
            />
          ) : (
            <ArrowDownCircleIcon
              className="w-5 h-5 text-[#27A590] ml-2"
              onClick={handleOrderCreatedAt}
            />
          )}
        </>
      ),
    },
    {
      fieldId: "raised_by",
      label: "Raised By",
      render: (data) => (
        <>
          {data?.raised_by.name} <br />
          <p className="text-[#7C7C7C]">@{data?.raised_by.seeds_tag}</p>
        </>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <span
          className={classNames(
            data?.status === "Solved"
              ? "bg-[#DCFCE4] text-[#27A590]"
              : data?.status === "Pending"
              ? "bg-[#FFF7D2] text-[#D89918]"
              : "bg-[#DCE1FE] text-[#2934B2]",
            "inline-flex items-center rounded px-2 py-1 text-sm"
          )}
        >
          {data?.status}
        </span>
      ),
    },
    {
      fieldId: "action",
      label: "Action",
      render: () => (
        <Menu>
          <MenuHandler>
            <IconButton
              placeholder={""}
              className="bg-transparent shadow-none hover:shadow-none"
            >
              <IoEllipsisHorizontal className="w-5 h-5 text-[#262626]" />
            </IconButton>
          </MenuHandler>
          <MenuList placeholder={""}>
            <MenuItem placeholder={""}>
              <div className="flex flex-row">
                <EyeIcon className="w-5 h-5 text-[#262626] mr-2" />
                View Detail
              </div>
            </MenuItem>
            <MenuItem placeholder={""} onClick={handleModalChangeStatus}>
              <div className="flex flex-row">
                <ArrowPathIcon className="w-5 h-5 text-[#262626] mr-2" />
                Change Status
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const handleChangeFilterStatus = (event: any): void => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (value === true) {
      setFilter((prevState: any) => ({
        ...prevState,
        status: [...prevState.status, name],
      }));
    } else {
      setFilter((prevState) => ({
        ...prevState,
        status: prevState.status.filter((item) => item !== name),
      }));
    }
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

  const handleOrderCreatedAt = (): void => {
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

  const searchFilter = async (): Promise<void> => {
    setOpenFilter(!openFilter);
  };

  const clearFilter = (): void => {
    setFilter({
      search: "",
      ticket: "",
      limit: 10,
      page: 1,
      status: [],
      circle_owner_id: "",
      sort_by: "created_at",
      order: "asc",
      created_at_from: "",
      created_at_to: "",
    });
    setOpenFilter(!openFilter);
  };

  const handleChageFilterTikcet = (data: any): void => {
    setFilter((prevState) => ({
      ...prevState,
      ticket: data.value,
    }));
  };

  const handleChageFilterCircleOwner = (data: any): void => {
    setFilter((prevState) => ({
      ...prevState,
      circle_owner_id: data.value,
    }));
  };

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <ModalFilterTokenReport
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
        filter={filter}
        changeDateFrom={handleChangeDateFrom}
        changeDateTo={handleChangeDateTo}
        clearFilter={clearFilter}
        search={searchFilter}
        changeFilterTicket={handleChageFilterTikcet}
        changeFilterCircleOwner={handleChageFilterCircleOwner}
        changeFilterStatus={handleChangeFilterStatus}
      />
      <ModalChangeStatusTokenReport
        modalStatus={modalChangeStatus}
        handleModalStatus={handleModalChangeStatus}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl text-[#262626] font-semibold">
                Token Report
              </h3>
              <div className="flex items-center justify-between gap-4 ml-4">
                <SearchInput
                  placeholder="Search"
                  onSubmit={({ text }) => {
                    setFilter((prev) => ({ ...prev, search: text }));
                  }}
                />
                <Button className="bg-transparent rounded-full py-2 px-3 w-auto border border-[#3AC4A0]">
                  <CiFilter
                    className="text-xl font-normal text-[#3AC4A0]"
                    onClick={handleOpenFilter}
                  />
                </Button>
                <Button className="bg-transparent rounded-full py-2 px-3 w-auto border border-[#3AC4A0]">
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
                    <Table<TokenReportData>
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
}
