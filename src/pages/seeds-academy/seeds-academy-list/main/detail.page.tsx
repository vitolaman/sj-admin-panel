import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import {
  ClassListI,
  MainSeedsAcademyReq,
} from "_interfaces/seeds-academy.interfaces";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  useClassByCategoryListQuery,
  useDeleteClassMutation,
} from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import { CiFileOn } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import UpdateClassPopUp from "./updateClassPopup";
import { errorHandler } from "services/errorHandler";

export const dcRouteName = "seeds-academy-list/detail/:id";
export default function DetailCategory(): React.ReactElement {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [isUpdateClassPopupOpen, setIsUpdateClassPopupOpen] = useState(false);
  const [levelName, setLevelName] = useState<string>("");
  const [idEdit, setIdEdit] = useState<string>("");
  const [editPopup, setEditPopup] = useState(false);
  const [searchParams, setSearchParams] = useState<MainSeedsAcademyReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
    id: params.id!,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const { data, isLoading, refetch } =
    useClassByCategoryListQuery(searchParams);

  useEffect(() => {
    refetch();
  }, [isUpdateClassPopupOpen, editPopup]);

  const handleClose = () => {
    navigate(`/seeds-academy/seeds-academy-list`);
  };

  const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

  const handleDeleteClass = async (id: string) => {
    try {
      await deleteClass({ id: id! });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditSeedsAcademy = (id: string): void => {
    void navigate(`/seeds-academy/seeds-academy-list/update/${id}`);
    setEditPopup(!editPopup);
    refetch();
  };

  const defaultClass = [
    {
      title: "empty",
      video: "empty",
      price: 0,
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
      render: (data) => <>{data?.price}</>,
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
      <UpdateClassPopUp
        isOpen={isUpdateClassPopupOpen}
        onClose={() => setIsUpdateClassPopupOpen(false)}
        levelName={levelName}
        categoryId={searchParams.id}
        id={idEdit!}
      />
      <div className="justify-between flex">
        <h3 className="text-2xl text-[#262626] font-semibold">
          {data?.title}:{" "}
          <span className="text-[#7C7C7C]">[ {data?.status} ]</span>
        </h3>
        <div className="flex items-center justify-end gap-4 ">
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              onClick={() => {
                void handleEditSeedsAcademy(data?.id as string);
              }}
              className="rounded-full px-6 py-2 flex gap-2 bg-seeds text-white hover:bg-seeds/90 "
            >
              <FiEdit className=" h-4 w-4" />
              Edit
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              // loading={isLoading}
              className="rounded-full flex gap-2 px-6 py-2 bg-seeds text-white hover:bg-seeds/90 "
            >
              <IoClose className=" h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </div>
      {data?.level.map((el) => (
        <div className="grid grid-cols-1 gap-6 mb-10 my-5">
          <div className="col-span-1">
            <div className="flex w-full gap-4">
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
                        data={data?.classes.filter((item) => item.level === el)}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
