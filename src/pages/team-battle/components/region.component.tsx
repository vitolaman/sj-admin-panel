import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  GetRegionListQuery,
  RegionListI,
  RegionListReq,
  RegionListRes,
} from "_interfaces/team-battle.interface";
import ConfirmationModal from "components/confirmation-modal";
import CropperComponent from "components/cropper";
import MInput from "components/multi-input";
import SearchInput from "components/search-input";
import useCropper from "hooks/shared/useCropper";
import useUpsertRegionList from "hooks/team-battle/useUpsertRegionList";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteRegionMutation,
  useLazyGetRegionByIdQuery,
} from "services/modules/team-battle";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getRegion: LazyQueryTrigger<
    QueryDefinition<
      GetRegionListQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      RegionListRes,
      "api"
    >
  >;
  data: RegionListI[] | undefined;
}
const RegionManagement = ({ open, setOpen, getRegion, data }: Props) => {
  const [deleteRegionById] = useDeleteRegionMutation();
  const [getRegionById, regionIdState] = useLazyGetRegionByIdQuery();
  const [openCropper, setOpenCropper] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const [tmpImgArray, setTmpImgArray] = useState<{
    new: string;
    cropped: string;
  }>({ new: "", cropped: "" });
  const {
    handleUpsert,
    register,
    errors,
    loadingUpsert,
    watch,
    reset,
    setValue,
    trigger,
  } = useUpsertRegionList();
  const image = watch("logo");
  const [imageURL, propsCrop] = useCropper(
    `logo`,
    setValue,
    typeof image === "string" ? undefined : (image as FileList)
  );

  const handleResetForm = () => {
    setTmpImgArray({
      new: "",
      cropped: "",
    });
    reset({ name: "", logo: "" });
  };
  const handleDelete = async () => {
    try {
      await deleteRegionById(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      getRegion({ limit: 10, page: 1, search: "" });
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (imageURL) {
      setTmpImgArray((prev) => {
        let newArray = { ...prev };
        newArray = {
          new: imageURL?.new!,
          cropped: imageURL?.cropped!,
        };
        return newArray;
      });
    }
  }, [imageURL]);

  useEffect(() => {
    if (regionIdState.data) {
      reset({ ...regionIdState.data });
    }
  }, [regionIdState.data, regionIdState.requestId]);

  return (
    <>
      {confirmationModal.open ? (
        <ConfirmationModal
          isOpen={confirmationModal.open}
          onClose={() => {
            setConfirmationModal({ open: false });
          }}
          onConfirm={handleDelete}
          alertType="delete"
          title="Delete Region?"
          subTitle="Are you sure to delete this region?"
          yesText="Delete"
          noText="Cancel"
        />
      ) : openCropper ? (
        <CropperComponent
          image={imageURL?.new!}
          crop={propsCrop.crop}
          zoom={propsCrop.zoom}
          aspect={1 / 1}
          open={openCropper}
          handleOpen={() => setOpenCropper(!openCropper)}
          onCrop={propsCrop.onCrop}
          onCropChange={propsCrop.onCropChange}
          onZoomChange={propsCrop.onZoomChange}
          onCropComplete={propsCrop.onCropComplete}
        />
      ) : (
        <Modal
          open={open}
          className="bg-white w-11/12 max-w-[2000px] p-4 md:p-8"
        >
          <Modal.Header className="flex justify-between">
            <p className="font-semibold font-poppins text-xl text-black w-fit">
              Region Dashboard
            </p>
            <FiX
              className="cursor-pointer"
              onClick={() => {
                handleResetForm();
                setOpen(!open);
                getRegion({ limit: 10, page: 1, search: "" });
              }}
            />
          </Modal.Header>
          <Modal.Body className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10">
            <div className="flex flex-col gap-4 w-full md:w-6/12">
              <p className="capitalize font-semibold font-poppins text-base text-[#262626]">
                Region List
              </p>
              <div className="flex items-center gap-3">
                <SearchInput
                  placeholder="Search"
                  className="w-full"
                  onSubmit={({ text }) =>
                    getRegion({ limit: 10, page: 1, search: text })
                  }
                  formClassName="w-full"
                />
                <Button
                  className="self-end border-none bg-[#3AC4A0] rounded-full text-white hover:bg-[#3AC4A0]"
                  onClick={handleResetForm}
                >
                  Create New Region
                </Button>
              </div>
              <div className="h-[300px] overflow-auto">
                {data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 py-3 px-2 border-b border-[#E9E9E9] hover:bg-black/20"
                  >
                    <p
                      className="capitalize font-normal font-poppins text-base text-[#262626] cursor-pointer w-full"
                      onClick={() => {
                        getRegionById(item.id);
                      }}
                    >
                      {item.name}
                    </p>
                    <FiX
                      size={24}
                      color="#EF5350"
                      className="cursor-pointer"
                      onClick={() =>
                        setConfirmationModal({ id: item.id, open: true })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block border border-[#9B9B9B]"></div>
            <div className="flex flex-col gap-4 w-full md:w-6/12">
              <MInput<RegionListReq>
                label="Region Name"
                type="text"
                registerName="name"
                register={register}
                errors={errors}
                placeholder="Input Name"
              />
              <MInput<RegionListReq>
                label="Region Logo"
                type="image"
                registerName="logo"
                register={register}
                isCrop
                handleOpen={() => setOpenCropper(!openCropper)}
                imageURLPreview={tmpImgArray?.cropped ?? tmpImgArray?.new}
                dataImage={
                  watch("id") ? (regionIdState.data?.logo as string) : undefined
                }
                extraElement={
                  <p className="font-poppins font-normal text-base text-[#201B1C]">
                    {watch("id")
                      ? "Upload image first then click to crop"
                      : "Click the image to crop"}
                  </p>
                }
                errors={errors}
              />
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              disabled={loadingUpsert}
              className="self-end border-none bg-[#3AC4A0] rounded-full text-white w-[128px] hover:bg-[#3AC4A0] disabled:bg-[#3AC4A0] disabled:text-white"
              loading={loadingUpsert}
              onClick={async (e) => {
                if (await trigger()) {
                  await handleUpsert(e);
                  handleResetForm();
                }
              }}
            >
              Save
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default RegionManagement;
