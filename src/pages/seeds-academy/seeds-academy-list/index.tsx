import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import {
  SeedsAcademyListI,
  MainSeedsAcademyReq,
} from "_interfaces/seeds-academy.interfaces";
import { useSeedsAcademyListQuery } from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

export const salRouteName = "seeds-academy-list";
export default function SeedsAcademyList(): React.ReactElement {
  const push = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<MainSeedsAcademyReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
  });
  const { data, isLoading, refetch } = useSeedsAcademyListQuery(searchParams);

  const handleCreateSeedsAcademy = (): void => {
    void push("/seeds-academy/seeds-academy-list/create");
  };

  const handleEditSeedsAcademy = (id: string): void => {
    void push(`/seeds-academy/seeds-academy-list/update/${id}`);
  };
  const handleDetailCategory = (id: string): void => {
    void push(`/seeds-academy/seeds-academy-list/detail/${id}`);
  };

  const header: Columns<SeedsAcademyListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "title",
      label: "Category",
    },
    {
      fieldId: "level",
      label: "Level",
      render: (data) => (
        <>
          {data?.level.map((item: string, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </>
      ),
    },

    {
      fieldId: "status",
      label: "Status",
    },
    {
      fieldId: "total_class",
      label: "Total Class",
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
                  void handleDetailCategory(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-sm text-[#201B1C]"
                >
                  <FiEye className="mt-1 me-3 h-4 w-4" />
                  View Detail
                </label>
              </MenuItem>
              <MenuItem placeholder={""} className="p-0" onClick={() => {}}>
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-sm text-[#201B1C]"
                >
                  <FiEyeOff className="mt-1 me-3 h-4 w-4" />
                  Archieve
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0 w-full"
                onClick={() => {
                  void handleEditSeedsAcademy(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-sm text-[#201B1C]"
                >
                  <FiEdit className="mt-1 me-3 h-4 w-4" />
                  Edit
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
              Seeds Academy List
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
                  handleCreateSeedsAcademy();
                }}
                className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
              >
                Create New Seeds Academy
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<SeedsAcademyListI>
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
    </div>
  );
}
