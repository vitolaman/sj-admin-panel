import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CircleDetailType, HashtagsProps } from "_interfaces/circle.interface";
import Tags from "components/Tags/Tags";
import ValidationError from "components/validation/error";
import useChangeAdminFeeForm from "hooks/form/useChangeAdminFeeForm";
import React from "react";
import { Button, Input, Modal } from "react-daisyui";
import { errorHandler } from "services/errorHandler";
import { useChangeAdminFeeMutation } from "services/modules/circle";
const imagesData = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
];
interface CountProps {
  count: number;
  message: string;
}

function CountMemberActivity({
  count,
  message,
}: CountProps): React.ReactElement {
  return (
    <div className="border-2 border-dashed rounded-md p-4">
      <h1 className="font-bold text-base">{count}</h1>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
interface ListMemberRoleProps {
  nameRole: string;
}

function ListUserRole({ nameRole }: ListMemberRoleProps): React.ReactElement {
  return (
    <div>
      <div className="flex justify-between mt-4">
        <h1 className=" text-xs py-1">{nameRole}</h1>
        <h1 className=" text-seeds-green px-1 text-base">See More</h1>
      </div>
    </div>
  );
}

function LoopingImageUser(): React.ReactElement {
  return (
    <div className="grid grid-cols-7 gap-2 w-1/2 my-2">
      {imagesData.map((imageUrl, index) => (
        <div className="relative w-8 h-8 overflow-hidden" key={index}>
          <img
            src={imageUrl}
            alt={`Gambar ${index + 1}`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ))}
    </div>
  );
}
interface DataCircleProps {
  dataCircle: CircleDetailType;
  refetch: () => void;
}
export default function DetailAndStatus({
  dataCircle,
  refetch,
}: DataCircleProps): React.ReactElement {
  const { register, handleSubmit, errors } = useChangeAdminFeeForm();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [changeAdminFee, { isLoading }] = useChangeAdminFeeMutation();

  const handleChangeFee = async (data: {
    admin_fee: number;
  }): Promise<void> => {
    try {
      const res = await changeAdminFee({
        id: dataCircle.id,
        admin_fee: data.admin_fee,
      }).unwrap();
      setShowModal(false);
      if (res) {
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const changeFormatDate = (date: string): string => {
    if (date !== undefined) {
      return "";
    }

    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
      return "";
    }

    const formattedDateString = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObject);

    return formattedDateString;
  };

  return (
    <>
      <div className="w-full p-2 rounded-lg shadow bg-gray-50 grid grid-cols-5">
        <div className=" flex gap-2 col-span-3 p-4">
          <div className="w-1/5">
            <img
              className="rounded-full h-[128px] w-[128px]"
              src={dataCircle?.cover}
              alt="imagePhoto"
            />
          </div>
          <div className="w-4/5 flex flex-col gap-4">
            <div className="flex flex-col gap-0">
              <div className="flex gap-2">
                <h1 className="font-bold text-[16px] pt-1">
                  {dataCircle?.name}
                </h1>
                <Tags
                  message="Active"
                  colorFont="text-[#27A590]"
                  colorBackground="bg-[#DCFCE4]"
                />
              </div>
              <p className="text-gray-500">{dataCircle?.id}</p>
            </div>
            <Tags
              message={dataCircle?.description_rules}
              colorFont="text-gray-600"
              colorBackground="bg-gray-100"
            />
            <div className="grid grid-cols-2 gap-2 ">
              <div className="flex flex-col gap-1">
                <h1 className="text-xs">Hashtag</h1>
                <div className="flex flex-row gap-1">
                  {dataCircle?.hashtags?.map((item: HashtagsProps) => (
                    <Tags
                      key={item.id}
                      message={`# ${item.name}`}
                      colorFont="text-seeds-purple"
                      colorBackground="bg-[#EDE3FE]"
                    />
                  ))}
                </div>
                <div>
                  <ListUserRole nameRole="Administator (7)" />
                  <LoopingImageUser />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-xs">Type</h1>
                <Tags
                  message={dataCircle?.type}
                  colorFont="text-[#2934B2]"
                  colorBackground="bg-[#DCE1FE]"
                />
                <div>
                  <ListUserRole
                    nameRole={`Member (${dataCircle?.total_member})`}
                  />
                  <LoopingImageUser />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-4 flex flex-col gap-3">
          <h1 className=" text-xs text-gray-400">Circle Owner</h1>
          <div className="flex gap-2">
            <img
              className="rounded-full h-[48px] w-[48px]"
              src={dataCircle?.owner?.avatar}
              alt="imagePhoto"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-[16px]">
                {dataCircle?.owner?.name}
              </h1>
              <p className="text-gray-500">@{dataCircle?.owner?.seedsTag}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs">
              Created At:{" "}
              <span className="text-gray-900">
                {changeFormatDate(dataCircle?.created_at)}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <CountMemberActivity
              count={dataCircle?.total_post}
              message="Member Of Post"
            />
            <CountMemberActivity
              count={dataCircle?.total_rating}
              message="Member Of Like"
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-2">
            <h1 className=" text-xs text-gray-500">Set Earned Admin Fee</h1>
            <div className="flex justify-between my-1">
              <h1 className="font-bold text-lg">{dataCircle?.admin_fee} %</h1>
              <PencilSquareIcon
                className="h-7 w-7 text-gray-500"
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal backdrop={false} open={showModal} className="bg-white">
        <form className="p-2" onSubmit={handleSubmit(handleChangeFee)}>
          <Modal.Header className="flex justify-between">
            <h1 className="font-bold text-xl">Edit Admin Fee</h1>
            <XMarkIcon
              className="h-7 w-7 text-gray-500 cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </Modal.Header>
          <Modal.Body className="mt-4">
            <p className="font-semibold text-lg">Admin Fee</p>
            <div className="flex rounded-lg">
              <Input
                {...register("admin_fee")}
                className="text-base font-semibold text-[#262626] w-full"
                placeholder="Masukan Admin Fee"
                type="text"
                inputMode="numeric"
                defaultValue={dataCircle?.admin_fee}
              />
              <div className="flex relative justify-end">
                <p className="absolute font-semibold text-lg m-2">%</p>
              </div>
            </div>
            <ValidationError error={errors.admin_fee} />
          </Modal.Body>
          <Modal.Actions>
            <Button
              className="w-full mt-4 bg-seeds hover:bg-seeds/90 rounded-lg text-white py-2"
              type="submit"
              loading={isLoading}
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </>
  );
}
