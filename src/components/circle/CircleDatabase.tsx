import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ModalFilterCircleDatabase from "components/modal/circle/ModalFilterCircleDatabase";
import { Button, Input } from "react-daisyui";
import moment from "moment";
interface CircleDatabaseProps {}
interface Circle {
  created_at: string;
  description: string;
  id: string;
  name: string;
  total_member: number;
  total_post: number;
  type: string;
  like: number;
  share: number;
  status: string;
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
};
const CircleDatabase: React.FC<CircleDatabaseProps> = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [circleData, setcircleData] = useState<Circle[]>();
  const [filter, setFilter] = useState(initialFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Paginate>();
  const router = useNavigate();

  const handleOpenFilter = (): void => {
    setOpenFilter(!openFilter);
  };

  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };

  const handleEnterPress = (e: any): void => {
    e.preventDefault();
    fetchCircleData()
      .then()
      .catch(() => {});
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

    fetchCircleData()
      .then()
      .catch(() => {});
  };

  const handleChageFilterType = (data: any): void => {
    setFilter((prevState) => ({
      ...prevState,
      type: data.value,
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

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const moveToCircleDetail = (circleId: string): any => {
    return router(`/circle/circle-detail/${circleId}`);
  };

  const searchFilter = async (): Promise<void> => {
    setOpenFilter(!openFilter);
    fetchCircleData()
      .then()
      .catch(() => {});
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

  const fetchCircleData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // getCircles(filter)
      //   .then((res) => {
      //     setcircleData(res.data);
      //     setPagination(res.metadata);
      //     setIsLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setIsLoading(false);
      //   });
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error fetching circle data:", error.message);
    }
  };

  useEffect(() => {
    fetchCircleData()
      .then()
      .catch(() => {});
  }, [filter.page, filter.order]);
  return (
    <>
      <ModalFilterCircleDatabase
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
        changeFilter={handleChangeFilter}
        search={searchFilter}
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
                            <div
                              id="circleId"
                              className="flex flex-row justify-center"
                            >
                              Circle ID
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
                            Type
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            <div
                              id="circleId"
                              className="flex flex-row justify-center"
                            >
                              Created At
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
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Members
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Post
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Like
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                          >
                            Share
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
                          circleData?.length ? (
                            circleData.map((data, index) => (
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
                                  {data.name !== undefined ? data.name : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.type !== undefined ? data.type : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {moment(data.created_at)
                                    .utc(true)
                                    .format("DD/MM/yyyy HH:mm")}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.total_member !== undefined
                                    ? data.total_member
                                    : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.total_post !== undefined
                                    ? data.total_post
                                    : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.like !== undefined ? data.like : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {data.share !== undefined ? data.share : "-"}
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  {/* <span
                                className={classNames(
                                  "Active" === 'Active'
                                    ? 'bg-[#DCFCE4] text-[#27A590]'
                                    : data.status === 'Idle'
                                    ? 'bg-[#FFF7D2] text-[#D89918]'
                                    : 'bg-[#FFEBEB] text-[#BB1616]',
                                  'inline-flex items-center rounded px-2 py-1 text-sm'
                                )}
                              >
                                {"Active"}
                              </span> */}
                                  -
                                </td>
                                <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                                  <button
                                    type="button"
                                    onClick={() => moveToCircleDetail(data.id)}
                                    className="inline-flex items-center px-4 h-[35px] text-[16px] border border-transparent text-xs font-semibold rounded-full text-white bg-[#3AC4A0]"
                                  >
                                    View Detail
                                  </button>
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
};

export default CircleDatabase;
