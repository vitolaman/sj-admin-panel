import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  NotificationListReq,
  PushNotificationList,
} from "_interfaces/push-notif.interfaces";
import PopUpImage from "components/modal/banner/PopUpImage";
import WarningMaxPopUp from "components/modal/banner/WarningMaxPopUp";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-daisyui";
import { AiOutlinePlus } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { usePushNotifListQuery } from "services/modules/push-notif";
dayjs.extend(utc);
dayjs.extend(timezone);

export const pushNotifRouteName = "blast-push";
export default function BlastPushNotification(): React.ReactElement {
  const push = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<NotificationListReq>({
    limit: 10,
    page: 1,
  });
  const { data, isLoading } = usePushNotifListQuery(searchParams);

  const handleCreateBlastPush = (): void => {
    void push("/push-notification/blast-push/createBlastPush");
  };

  const handleEditBlastNotif = (id: string): void => {
    void push(`/push-notification/blast-push/editBlastPush?id=${id}`);
  };

  const handleClosePopup = () => {
    setIsWarningPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const getStatusColor = (
    status: string
  ): { bgColor: string; textColor: string; statusNow: string } => {
    if (status === "SCHEDULED") {
      return {
        bgColor: "bg-[#FFF7D2]",
        textColor: "text-[#D89918]",
        statusNow: "Scheduled",
      };
    } else if (status === "ACTIVE") {
      return {
        bgColor: "bg-[#EDE3FE]",
        textColor: "text-[#553BB8]",
        statusNow: "Active",
      };
    } else {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-[#27A590]",
        statusNow: "Completed",
      };
    }
  };

  const header: Columns<PushNotificationList>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "campaign_name",
      label: "Campaign Name",
    },
    {
      fieldId: "type",
      label: "Type",
    },
    {
      fieldId: "date_started_at",
      fieldId3: "time_at",
      label: "Start Date",
      render: (data) => {
        return <>{dayjs(data?.date_started_at).format("DD/MM/YYYY") + " "}</>;
      },
    },
    {
      fieldId: "date_ended_at",
      fieldId3: "time_at",
      label: "End Date",
      render: (data) => {
        if (data?.date_ended_at != "0001-01-01") {
          return <>{dayjs(data?.date_ended_at).format("DD/MM/YYYY") + " "}</>;
        } else {
          return "";
        }
      },
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => {
        const { bgColor, textColor, statusNow } = getStatusColor(
          data?.status as string
        );
        return (
          <span
            className={`px-4 inline-flex text-xs leading-5 font-semibold rounded ${bgColor} ${textColor}`}
          >
            {statusNow}
          </span>
        );
      },
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
                className="rounded text-center text-lg hover:bg-transparent text-[#3AC4A0]"
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
                className="p-0 w-36"
                onClick={() => {
                  void handleEditBlastNotif(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <BsEye className="me-3 my-auto" size={20} />
                  See Detail
                </label>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="p-0"
                onClick={() => {
                  void handleEditBlastNotif(data?.id as string);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <FiEdit3 className="me-3 my-auto" size={20} />
                  Edit
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
              Blast Push Notification
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
                  handleCreateBlastPush();
                }}
                className="flex flex-row  items-center justify-center gap-x-1.5 rounded-full px-4 py-2 bg-seeds text-white"
              >
                <AiOutlinePlus className="my-auto" size={22} />
                Add Campaign
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <Table<PushNotificationList>
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
