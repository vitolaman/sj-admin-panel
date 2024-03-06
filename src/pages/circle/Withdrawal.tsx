import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { CircleWithdraw } from "_interfaces/circle.interface";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import React, { useState } from "react";
import { Button } from "react-daisyui";
import { FiDownload } from "react-icons/fi";
import {
  useChangeStatusWithdrawMutation,
  useListWithdrawQuery,
} from "services/modules/circle";

export const circleWithdrawRouteName = "withdraw";
export default function WithdrawPage(): React.ReactElement {
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [showActionOptions, setShowActionOptions] = useState<boolean>(false);
  const [selectedWithdraw, setSelectedWithdraw] =
    useState<CircleWithdraw | null>(null);
  const { data, isLoading, refetch } = useListWithdrawQuery(filter);
  const [changeStatusWithdraw] = useChangeStatusWithdrawMutation();

  const handleAccept = async (data: CircleWithdraw): Promise<void> => {
    try {
      await changeStatusWithdraw({
        withdraw_id: data.id,
        status: "SUCCESS",
        reject_reason: "",
      });
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setShowActionOptions(false);
    }
  };

  const handleReject = async (data: CircleWithdraw): Promise<void> => {
    try {
      await changeStatusWithdraw({
        withdraw_id: data.id,
        status: "REJECT",
        reject_reason: "rejected",
      });
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setShowActionOptions(false);
    }
  };

  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const header: Columns<CircleWithdraw>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Circle ID",
    },
    {
      fieldId: "owner_name",
      label: "Owner Name",
    },
    {
      fieldId: "amount",
      label: "Amount",
    },
    {
      fieldId: "account_name",
      label: "Withdrawal Account",
    },
    {
      fieldId: "account_number",
      label: "Account Number",
    },
    {
      fieldId: "action",
      label: "Action",
      render: (data) => (
        <Menu>
          <MenuHandler>
            <button
              type="button"
              onClick={() => {
                if (showActionOptions && selectedWithdraw === data) {
                  setShowActionOptions(false);
                } else {
                  setSelectedWithdraw(data as CircleWithdraw);
                  setShowActionOptions(true);
                }
              }}
              className="inline-flex items-center px-4 h-[35px] text-[16px] border border-transparent text-md font-bold rounded-full text-[#3AC4A0]"
            >
              ...
            </button>
          </MenuHandler>
          <MenuList placeholder={""}>
            <MenuItem placeholder={""} className="hover:bg-white">
              <button
                onClick={() => {
                  void handleAccept(data as CircleWithdraw);
                }}
                className="block px-12 py-2 rounded-full text-sm text-white bg-[#4DA81C] w-full text-center"
              >
                Accept
              </button>
            </MenuItem>
            <MenuItem placeholder={""} className="hover:bg-white">
              <button
                onClick={() => {
                  void handleReject(data as CircleWithdraw);
                }}
                className="block rounded-full px-12 py-2 text-sm text-white bg-[#BB1616]  w-full text-center"
              >
                Reject
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      fieldId: "action",
      label: "Status",
      render: (data) => (
        <span
          className={classNames(
            data?.status === "SUCCESS"
              ? "bg-[#DCFCE4] text-[#27A590]"
              : data?.status === "PENDING"
              ? "bg-[#FFF7D2] text-[#D89918]"
              : "bg-[#FFEBEB] text-[#BB1616]",
            "inline-flex items-center rounded px-2 py-1 text-sm lowercase"
          )}
        >
          {data?.status}
        </span>
      ),
    },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl text-[#262626] font-semibold">
                Withdraw
              </h3>
              <div className="flex items-center justify-between gap-4 ml-4">
                <Button className="bg-transparent flex rounded-full py-2 px-4 w-auto border bg-[#3AC4A0] hover:bg-[#3AC4A0]/90 hover:border-[#3AC4A0]/90 border-[#3AC4A0]">
                  <FiDownload className="text-xl font-normal text-white" />
                  <span className="mt-1 ml-3 text-white">Download</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                    <Table<CircleWithdraw>
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
                currentPage={data?.meta?.current_page as number}
                totalPages={data?.meta?.total_page as number}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
