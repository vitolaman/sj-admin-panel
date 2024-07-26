import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import {
  MainSubcriptionReq,
  SubcriptionListI,
  CreateSubcriptionPayload,
} from "_interfaces/seeds-academy.interfaces";
import { useGetSubscriptionListQuery } from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import { FiEyeOff } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import {
  useDeleteSubscriptionMutation,
  useEditSubscriptionMutation,
} from "services/modules/seeds-academy";
import { RiDeleteBinLine } from "react-icons/ri";
import CreateSubcriptionPopUp from "./createSubcriptionPopUp";
import UpdateSubcriptionPopUp from "./updateSubcriptionPopUp";
import { errorHandler } from "services/errorHandler";

export const spRouteName = "subcription-plan";
export default function SubcriptionPlan(): React.ReactElement {
  const push = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isCreateSubcriptionOpen, setIsCreateSubcriptionOpen] = useState(false);
  const [isUpdateSubcriptionOpen, setIsUpdateSubcriptionOpen] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [searchParams, setSearchParams] = useState<MainSubcriptionReq>({
    search: "",
    status: "",
    limit: 10,
    page: 1,
  });
  const { data, isLoading, refetch } =
    useGetSubscriptionListQuery(searchParams);
  const [deleteSubscriptionMutation] = useDeleteSubscriptionMutation();
  const [editSubscriptionMutation] = useEditSubscriptionMutation();

  useEffect(() => {
    refetch();
  }, [isCreateSubcriptionOpen, isUpdateSubcriptionOpen]);

  const handleEditSubscription = async (
    id: string,
    updatedData: Partial<CreateSubcriptionPayload>
  ) => {
    try {
      const response = await editSubscriptionMutation({
        id,
        body: updatedData,
      });
      refetch();
    } catch (error) {
      errorHandler(error)
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      await deleteSubscriptionMutation({ id });
      refetch();
    } catch (error) {
      errorHandler(error)
    }
  };

  const handlePageChange = (page: number): void => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<SubcriptionListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "duration_month",
      label: "Interval",
      render: (data) => <span>{`${data?.duration_month} bulan`}</span>,
    },
    {
      fieldId: "price",
      label: "Price",
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <div className="mx-auto w-48 flex shadow rounded-lg text-[#BDBDBD] border h-10 mt-4 items-center bg-gray-200 relative">
          <button
            className="w-full flex items-center justify-between px-4"
            onClick={() => {
              const updatedStatus = !data?.status;
              handleEditSubscription(data?.id as string, {
                price: data?.price,
                duration_month: data?.duration_month,
                status: updatedStatus,
              });
            }}
          >
            <div className="pl-3">Active</div>
            <div className="">Not Active</div>
            <span
              className="elSwitch bg-[#3AC4A0] shadow text-white flex items-center justify-center w-1/2 rounded-lg h-8 transition-all top-[4px] absolute left-1"
              style={{
                left: !data?.status ? "auto" : "1px",
                right: !data?.status ? "1px" : "auto",
              }}
            >
              {data?.status ? "Active" : "Not Active"}
            </span>
          </button>
        </div>
      ),
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <>
          <Menu>
            <MenuHandler>
              <Button
                size="sm"
                className="rounded text-center text-lg hover:bg-transparent text-[#3AC4A0] border-none"
                onClick={() => {
                  if (isDropdownOpen === data?.id) {
                    setIsDropdownOpen(null);
                  } else {
                    setIsDropdownOpen(data?.id as string);
                  }
                }}
              >
                ...
              </Button>
            </MenuHandler>
            <MenuList placeholder={""}>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void setIdEdit(data?.id as string);
                  setIsUpdateSubcriptionOpen(true);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-sm text-[#201B1C]"
                >
                  <FiEdit className="mt-1 me-3 h-4 w-4" />
                  Edit
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => handleDeleteSubscription(data?.id as string)}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-sm text-[#DD2525]"
                >
                  <RiDeleteBinLine className="mt-1 me-3 h-4 w-4" />
                  Delete
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Subcription Plan
            </h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setSearchParams((prev) => ({ ...prev, search: text }));
                }}
              />
              <button
                onClick={() => {
                  setIsCreateSubcriptionOpen(true);
                }}
                className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
              >
                Create Program
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<SubcriptionListI>
                    columns={header}
                    data={data?.data}
                    loading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateSubcriptionPopUp
        isOpen={isCreateSubcriptionOpen}
        onClose={() => setIsCreateSubcriptionOpen(false)}
      />
      <UpdateSubcriptionPopUp
        isOpen={isUpdateSubcriptionOpen}
        onClose={() => setIsUpdateSubcriptionOpen(false)}
        id={idEdit}
      />
      <Pagination
        currentPage={data?.metadata?.current_page ?? 1}
        totalPages={data?.metadata?.total_page ?? 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
