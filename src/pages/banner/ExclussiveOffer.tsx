import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
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
import WarningMaxPopUp from "components/modal/banner/WarningMaxPopUp";
import PopUpImage from "components/modal/banner/PopUpImage";
import { BannerList, MainBannerReq } from "_interfaces/banner.interface";
import {
  useBannerListQuery,
  useChangeStatusBannerMutation,
  useDeleteBannerMutation,
} from "services/modules/banner";
import { Columns, Table } from "components/table/table";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { errorHandler } from "services/errorHandler";

export const exclussiveBannerRouteName = "exclusive-offers";
export default function ExclusiveOffer(): React.ReactElement {
  const push = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<MainBannerReq>({
    search: "",
    status: "",
    type: "exclusive",
    limit: 10,
    page: 1,
  });
  const { data, isLoading, refetch } = useBannerListQuery(searchParams);
  const [changeStatusBanner, { error }] = useChangeStatusBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const handleCreateBanner = (): void => {
    void push("/banner/exclussive-banner/create");
  };

  const handleEditBanner = (id: string): void => {
    void push(`/banner/exclussive-banner/update/${id}`);
  };

  const handleDeleteBanner = async (id: string): Promise<void> => {
    try {
      const statusUpdated = { id };
      await deleteBanner(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleClosePopup = () => {
    setIsWarningPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleOpenImage = (url: string) => {
    setSelectedImageUrl(url);
    setIsImagePopupOpen(true);
  };

  const handleUpdateStatusBanner = async (
    id: string,
    status: boolean
  ): Promise<void> => {
    try {
      const statusUpdated = { id, is_active: !status };
      await changeStatusBanner(statusUpdated);
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (error) {
      setIsWarningPopupOpen(true);
      const errorMessage = (
        error as { data: { message: string }; status: number }
      ).data?.message;
      if (errorMessage === "Cannot be more than 10") {
        setWarningMessage("Maximal Banner Active is 10");
      } else if (errorMessage === "Cannot be less than 1") {
        setWarningMessage("Sorry, but there must be 1 Banner to be Set Active");
      } else {
        setWarningMessage(
          "An error occurred while creating the banner. Please try again later."
        );
      }
    }
  }, [error]);

  const header: Columns<BannerList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Banner ID",
    },
    {
      fieldId: "name",
      label: "Banner Name",
    },
    {
      fieldId: "title",
      label: "Title Banner",
    },
    {
      fieldId: "description",
      label: "Description",
      render: (data) => (
        <div className="w-56 text-justify whitespace-pre-wrap truncate">
          {data?.description}
        </div>
      ),
    },
    {
      fieldId: "external_url",
      label: "External URL",
      render: (data) => (
        <a href={data?.external_url} target="_blank" rel="noopener noreferrer">
          {data?.external_url}
        </a>
      ),
    },
    {
      fieldId: "tnc",
      label: "Terms and Conditions",
      render: (data) => (
        <div className="w-56 text-justify whitespace-pre-wrap truncate">
          {data?.tnc}
        </div>
      ),
    },
    {
      fieldId: "image_url",
      label: "Banner Image",
      render: (data) => (
        <img
          className="mt-1 me-3"
          src={data?.image_url}
          alt="Success"
          width={100}
          height={100}
          onClick={() => handleOpenImage(data?.image_url as string)}
        />
      ),
    },
    {
      fieldId: "is_active",
      label: "Status",
      render: (data) => (
        <div className="mx-8 w-48 flex shadow rounded-lg text-[#BDBDBD] border h-10 mt-4 items-center bg-gray-200 relative">
          <button
            className="w-full flex items-center justify-between px-4"
            onClick={() => {
              void handleUpdateStatusBanner(
                data?.id as string,
                data?.is_active as boolean
              );
            }}
          >
            <div className="pl-3">Active</div>
            <div className="">Not Active</div>
            <span
              className="elSwitch bg-[#3AC4A0] shadow text-white flex items-center justify-center w-1/2 rounded-lg h-8 transition-all top-[4px] absolute left-1"
              style={{
                left: !data?.is_active ? "auto" : "1px",
                right: !data?.is_active ? "1px" : "auto",
              }}
            >
              {data?.is_active
                ? "Active"
                : !data?.is_active
                ? "Not Active"
                : "Active"}
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
                className="p-0 w-full"
                onClick={() => {
                  void handleEditBanner(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <CiEdit className="mt-1 me-3 h-4 w-4" />
                  Edit Banner
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void handleDeleteBanner(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdDeleteOutline className="mt-1 me-3 h-4 w-4" />
                  Delete Banner
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];

  const handlePageChange = async (page: number): Promise<void> => {
    setSearchParams({ ...searchParams, page });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Banner List
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
                  handleCreateBanner();
                }}
                className="flex flex-row items-center justify-center gap-x-1.5 rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
              >
                Create Banner
                <ChevronDownIcon
                  className="-mr-1 -mb-1 h-5 w-5 text-white "
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<BannerList>
                    columns={header}
                    data={data?.data}
                    loading={isLoading}
                  />
                </div>
                {warningMessage && (
                  <div className={`text-sm text-red-400 font-normal flex my-4`}>
                    <PiWarningCircleFill className="my-auto mr-2" />
                    <span>{warningMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Pagination
              currentPage={data!?.metadata.currentPage}
              totalPages={data!?.metadata.totalPage}
              onPageChange={handlePageChange}
            />
          </div>
          <div>
            {isWarningPopupOpen && (
              <WarningMaxPopUp
                isOpen={isWarningPopupOpen}
                data={warningMessage}
                onClose={handleClosePopup}
              />
            )}
            {selectedImageUrl && (
              <PopUpImage
                isOpen={isImagePopupOpen}
                data={selectedImageUrl}
                onClose={handleClosePopup}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
