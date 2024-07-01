import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-daisyui";
import WarningMaxPopUp from "components/modal/banner/WarningMaxPopUp";
import PopUpImage from "components/modal/banner/PopUpImage";
import {
  ClassListI,
  MainSeedsAcademyReq,
} from "_interfaces/seeds-academy.interfaces";
import {
  // useBannerListQuery,
  useChangeStatusBannerMutation,
  useDeleteBannerMutation,
} from "services/modules/banner";
import {
  useCreateClassListQuery,
  useClassByCategoryListQuery,
} from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import { errorHandler } from "services/errorHandler";
import AddNewClassPopUp from "./addNewClassPopUp";
import { CiFileOn } from "react-icons/ci";

export const ccRouteName = "seeds-academy-list/create-class";
export default function CreateClass(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isAddNewClassPopupOpen, setIsAddNewClassPopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<MainSeedsAcademyReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
    id: "",
  });
  const { data, isLoading, refetch } =
    useClassByCategoryListQuery(searchParams);
  const [changeStatusBanner, { error }] = useChangeStatusBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [levelName, setLevelName] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idFromQuery = queryParams.get("id");

    if (idFromQuery) {
      setSearchParams((prev) => ({
        ...prev,
        id: idFromQuery,
      }));
    }
  }, [location.search]);

  const handleClosePopup = () => {
    setIsWarningPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleSave = () => {
    navigate(`/seeds-academy/seeds-academy-list`);
  };

  const defaultClass = [
    {
      title: "empty",
      video: "empty",
      price: {
        idr: 0,
      },
      banner: "empty",
      description: {
        id: "empty",
      },
      module: "empty",
      assesment: "empty",
    },
  ];

  const header: Columns<ClassListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "title",
      label: "Title",
    },
    {
      fieldId: "video",
      label: "Video",
    },
    {
      fieldId: "price",
      label: "Price",
      render: (data) => <>{data?.price?.idr}</>,
    },
    {
      fieldId: "banner",
      label: "Banner",
      render: (data) => {
        if (data?.banner) {
          return (
            <div className="rounded-full bg-[#DCFCE4] p-1 w-[25px] h-[25px] mx-auto">
              <CiFileOn style={{ color: "green", margin: "0 auto" }} />
            </div>
          );
        } else {
          return <>empty</>;
        }
      },
    },
    {
      fieldId: "description",
      label: "Desc",
      render: (data) => {
        const maxLength = 15;
        const description = data?.description?.id;

        if (description && description.length > maxLength) {
          return <>{description.substring(0, maxLength)}...</>;
        } else {
          return <>{description}</>;
        }
      },
    },
    {
      fieldId: "module",
      label: "Modul",
    },
    {
      fieldId: "assesment",
      label: "Assesment",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-2xl text-[#262626] font-semibold">Level</h3>
      {data?.level.map((el) => (
        <div className="grid grid-cols-1 gap-6 mt-5">
          <div className="col-span-1">
            <div className="flex w-full gap-4 mb-12">
              <h3 className="text-xl text-[#27A590] border border-[#27A590] bg-[#DCFCE4] font-semibold rounded-md w-full p-1">
                {el}
              </h3>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  {data?.classes.length !== 0 && (
                    <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                      <Table<ClassListI>
                        columns={header}
                        data={data?.classes}
                        loading={isLoading}
                      />
                    </div>
                  )}
                  {data?.classes.length === 0 && (
                    <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                      <Table<ClassListI>
                        columns={header}
                        data={defaultClass}
                        loading={isLoading}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-end mt-5">
                    <div className="flex items-center justify-between gap-4 ml-4">
                      <Button
                        type="button"
                        onClick={() => {
                          setIsAddNewClassPopupOpen(true);
                          setLevelName(el);
                        }}
                        className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
                      >
                        + Add New Title
                      </Button>
                    </div>
                  </div>
                  {warningMessage && (
                    <div
                      className={`text-sm text-red-400 font-normal flex my-4`}
                    >
                      <PiWarningCircleFill className="my-auto mr-2" />
                      <span>{warningMessage}</span>
                    </div>
                  )}
                </div>
              </div>
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
      ))}
      <AddNewClassPopUp
        isOpen={isAddNewClassPopupOpen}
        onClose={() => setIsAddNewClassPopupOpen(false)}
        levelName={levelName}
        categoryId={searchParams.id}
      />
      <div className="flex items-center justify-end gap-4 mb-8 mt-4">
        <div className="flex items-center justify-between gap-4 ml-4">
          <Button
            type="button"
            onClick={() => {}}
            className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
          >
            Draft
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            // loading={isLoading}
            className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90 "
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
