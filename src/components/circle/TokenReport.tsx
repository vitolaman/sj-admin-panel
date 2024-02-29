import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Input } from "react-daisyui";
import ModalFilterTokenReport from "components/modal/circle/ModalFilterTokenReport";
import ModalChangeStatusTokenReport from "components/modal/circle/ModalChangeStatusTokenReport";

interface TokenData {
  id: string;
  name: string;
  owner: {
    name: string;
    seeds_tag: string;
  };
  raised_by: {
    name: string;
    seeds_tag: string;
  };
  ticket: string;
  status: string;
  created_at: string;
}

interface Paginate {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

const initialFilter = {
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
};

export default function TokenReport(): React.ReactElement {
  const [openFilter, setOpenFilter] = useState(false);
  const [modalChangeStatus, setModalChangeStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  const [tokenData, setTokenData] = useState<TokenData[]>();
  const [pagination, setPagination] = useState<Paginate>();

  const handleOpenFilter = (): void => {
    setOpenFilter(!openFilter);
  };

  const handleModalChangeStatus = (): void => {
    setModalChangeStatus(!modalChangeStatus);
  };

  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };

  const handleEnterPress = (e: any): void => {
    e.preventDefault();
    fetchTokenData()
      .then()
      .catch(() => {});
  };

  const handleChangeFilter = (event: any): void => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    fetchTokenData()
      .then()
      .catch(() => {});
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

  const fetchTokenData = async (): Promise<void> => {
    try {
      setIsLoading(true);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error fetching circle data:", error.message);
    }
  };

  useEffect(() => {
    fetchTokenData()
      .then()
      .catch(() => {});
  }, [filter.page, filter.order]);

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
                <form onSubmit={handleEnterPress}>
                  <div className="flex justify-end relative">
                    <MagnifyingGlassIcon className="w-6 h-6 text-[#262626] absolute right-4 top-3" />
                  </div>
                  <Input
                    name="search"
                    type="outline"
                    onChange={(e) => {
                      handleChangeFilter(e);
                    }}
                    placeholder="Search"
                    value={filter.search}
                  />
                </form>
                <Button
                  placeholder={""}
                  className="bg-transparent rounded-full p-2 w-auto border border-[#3AC4A0]"
                >
                  <CiFilter
                    className="text-xl font-normal text-[#3AC4A0]"
                    onClick={handleOpenFilter}
                  />
                </Button>
                <Button
                  placeholder={""}
                  className="bg-transparent rounded-full p-2 w-auto border border-[#3AC4A0]"
                >
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
                    <table className="min-w-full">
                      <thead className="bg-[#DCFCE4]">
                        <tr className="divide-x divide-[#BDBDBD]">
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            No
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            <div className="flex flex-row justify-center">
                              Ticket Id
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Circle Name
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Circle Owner
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Ticket
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            <div
                              id="circleId"
                              className="flex flex-row justify-center"
                            >
                              Reported At
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
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Raised By
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {!isLoading ? (
                          tokenData?.length ? (
                            tokenData.map((data, index) => (
                              <tr
                                key={index}
                                className="divide-x divide-[#BDBDBD]"
                              >
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {index + 1}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.id}
                                </td>
                                <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                                  {data.name}
                                </td>
                                <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                                  {data.owner.name} <br />
                                  <Typography className="text-[#7C7C7C]">
                                    @{data.owner.seeds_tag}
                                  </Typography>
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.ticket}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {moment(data.created_at)
                                    .utc(true)
                                    .format("DD/MM/yyyy HH:mm")}
                                </td>
                                <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                                  {data.raised_by.name} <br />
                                  <Typography className="text-[#7C7C7C]">
                                    @{data.raised_by.seeds_tag}
                                  </Typography>
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  <span
                                    className={classNames(
                                      data.status === "Solved"
                                        ? "bg-[#DCFCE4] text-[#27A590]"
                                        : data.status === "Pending"
                                        ? "bg-[#FFF7D2] text-[#D89918]"
                                        : "bg-[#DCE1FE] text-[#2934B2]",
                                      "inline-flex items-center rounded px-2 py-1 text-sm"
                                    )}
                                  >
                                    {data.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
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
                                      <MenuItem
                                        placeholder={""}
                                        onClick={handleModalChangeStatus}
                                      >
                                        <div className="flex flex-row">
                                          <ArrowPathIcon className="w-5 h-5 text-[#262626] mr-2" />
                                          Change Status
                                        </div>
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="divide-x divide-[#BDBDBD]">
                              <td
                                colSpan={10}
                                className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
                              >
                                No Data
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr className="divide-x divide-[#BDBDBD]">
                            <td
                              colSpan={10}
                              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
                            >
                              Loading...
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {pagination !== undefined ? (
                <></>
              ) : // <Pagination
              //   currentPage={pagination.current_page}
              //   totalPages={pagination.total_page}
              //   onPageChange={handlePageChange}
              // />
              null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
