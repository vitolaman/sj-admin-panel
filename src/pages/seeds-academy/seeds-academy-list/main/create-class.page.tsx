import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-daisyui";
import WarningMaxPopUp from "components/modal/banner/WarningMaxPopUp";
import PopUpImage from "components/modal/banner/PopUpImage";
import { useSearchParams } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ClassListI,
  MainSeedsAcademyReq,
} from "_interfaces/seeds-academy.interfaces";
import {
  useClassByCategoryListQuery,
  useDeleteClassMutation,
} from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import AddNewClassPopUp from "./addNewClassPopUp";
import UpdateClassPopUp from "./updateClassPopup";
import { CiFileOn } from "react-icons/ci";
import { useUpdateStatusMutation } from "services/modules/seeds-academy";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { errorHandler } from "services/errorHandler";

export const ccRouteName = "seeds-academy-list/create-class";
export default function CreateClass(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateStatusMutation] = useUpdateStatusMutation();
  const [id, setId] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isAddNewClassPopupOpen, setIsAddNewClassPopupOpen] = useState(false);
  const [isUpdateClassPopupOpen, setIsUpdateClassPopupOpen] = useState(false);
  const [isClassesComplete, setIsClassesComplete] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, refetch } = useClassByCategoryListQuery({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
    id,
  });
  const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

  const handleDeleteClass = async (id: string) => {
    try {
      await deleteClass({ id: id! });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };
  const [levelName, setLevelName] = useState<string>("");

  useEffect(() => {
    const idFromQuery = searchParams.get("id");
    if (idFromQuery) {
      setId(idFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [isUpdateClassPopupOpen, isAddNewClassPopupOpen]);

  useEffect(() => {
    setSearchParams({ id });
    refetch();
  }, [id, isUpdateClassPopupOpen, isAddNewClassPopupOpen]);

  useEffect(() => {
    if (data) {
      const incompleteClass = data.classes.some((classItem) => {
        return (
          classItem.banner === "" ||
          classItem.description?.id === "" ||
          classItem.video === "" ||
          classItem.total_question === 0 ||
          classItem.title === "" ||
          classItem.price.idr === 0 ||
          classItem.module === ""
        );
      });
      setIsClassesComplete(!incompleteClass);
    }
    refetch();
  }, [data]);

  const handleSave = async (status: string) => {
    try {
      await updateStatusMutation({
        id,
        body: { status },
      });
      navigate(`/seeds-academy/seeds-academy-list`);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleClosePopup = () => {
    setIsWarningPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const defaultClass = [
    {
      title: "empty",
      video: "empty",
      price: "empty",
      banner: "empty",
      description: {
        id: "empty",
      },
      module: "empty",
      total_question: "empty",
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
      render: (data) => <>{data?.price}</>,
    },
    {
      fieldId: "banner",
      label: "Banner",
      render: (data) => {
        if (data?.banner !== "") {
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
      render: (data) => {
        if (data?.module !== "") {
          return <div className="">FileName.pdf</div>;
        } else {
          return <>empty</>;
        }
      },
    },
    {
      fieldId: "total_question",
      label: "Assesment",
      render: (data) => {
        if (data?.total_question !== 0) {
          return <div className="">FileName.csv</div>;
        } else {
          return <>empty</>;
        }
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
                  setIsUpdateClassPopupOpen(true);
                  setIdEdit(data?.id!);
                  // setLevel(data?.level)
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
                onClick={() => {
                  void handleDeleteClass(data?.id!);
                }}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-sm text-[#201B1C]"
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
      <h3 className="text-2xl text-[#262626] font-semibold">Level</h3>
      {data?.level.map((el) => (
        <div className="grid grid-cols-1 gap-6 mb-10 mt-5">
          <div className="col-span-1">
            <div className="flex w-full gap-4 mb-5">
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
        categoryId={id}
      />
      <UpdateClassPopUp
        isOpen={isUpdateClassPopupOpen}
        onClose={() => setIsUpdateClassPopupOpen(false)}
        levelName={levelName}
        categoryId={id}
        id={idEdit!}
      />
      <div className="flex items-center justify-end gap-4 mb-8 mt-4">
        <div className="flex items-center justify-between gap-4 ml-4">
          <Button
            type="button"
            onClick={() => handleSave("DRAFTED")}
            className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => handleSave("DRAFTED")}
            className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
          >
            Draft
          </Button>
          <Button
            type="button"
            onClick={() => handleSave("PUBLISHED")}
            disabled={!isClassesComplete}
            className={`rounded-full px-6 py-2 bg-seeds text-white hover:text-seeds/90 hover:bg-white${
              !isClassesComplete && "opacity-50 cursor-not-allowed"
            }`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
