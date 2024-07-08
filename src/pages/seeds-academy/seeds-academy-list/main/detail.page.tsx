import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import {
  ClassListI,
  MainSeedsAcademyReq,
} from "_interfaces/seeds-academy.interfaces";

import { useClassByCategoryListQuery } from "services/modules/seeds-academy";
import { Columns, Table } from "components/table/table";
import { CiFileOn } from "react-icons/ci";
import {FiEdit} from "react-icons/fi"

export const dcRouteName = "seeds-academy-list/detail/:id";
export default function DetailCategory(): React.ReactElement {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useState<MainSeedsAcademyReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
    id: params.id!,
  });
  const { data, isLoading, refetch } =
    useClassByCategoryListQuery(searchParams);

  const handleClose = () => {
    navigate(`/seeds-academy/seeds-academy-list`);
  };
  const handleEditSeedsAcademy = (id: string): void => {
    void navigate(`/seeds-academy/seeds-academy-list/update/${id}`);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
