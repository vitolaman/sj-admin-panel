import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import useUpsertTeamBattle from "hooks/team-battle/useUpsertTeamBattle";
import { TeamBattleModal } from "_interfaces/team-battle.interface";
import CropperComponent from "components/cropper";
import TBCategoryModal from "./category.section";
import { Loader } from "components/spinner/loader";
import FirstModal from "./firstModal.section";
import SecondModal from "./secondModal.section";
import useMultiCrop from "../../../hooks/team-battle/useMultiCrop";
import moment from "moment";

const TeamBattleForm = ({
  data,
  requestId,
  loading,
  open,
  setOpen,
  refetch,
}: TeamBattleModal) => {
  const [sectionModal, setSectionModal] = useState<number>(0);
  const [tmpNumber, setTmpNumber] = useState<number>();
  const [tmpImgArray, setTmpImgArray] = useState<{
    sponsor: { new: string; cropped: string }[];
    university: { new: string; cropped: string }[];
    community: { new: string; cropped: string }[];
  }>({ sponsor: [], university: [], community: [] });
  const [openInput, setOpenInput] = useState<{
    participant: boolean;
    stage: boolean;
    sponsor: boolean;
    periode: boolean;
  }>({ participant: false, stage: false, sponsor: false, periode: false });
  const [openCropper, setOpenCropper] = useState<
    Record<"sponsor" | "university" | "community", boolean>
  >({ sponsor: false, university: false, community: false });

  const {
    handleUpsert,
    register,
    errors,
    reset,
    loadingUpsert,
    setValue,
    watch,
    defaultValues,
    control,
    firstTrigger,
    secondTrigger,
    clearErrors,
  } = useUpsertTeamBattle();
  const category = watch("category");
  const [SDataState, UDataState, CDataState] = useMultiCrop({
    tmpNumber,
    setValue,
    watch,
    setTmpImgArray,
  });

  const handleOpen = (key: "sponsor" | "university" | "community") => {
    setOpenCropper((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetForm = () => {
    setSectionModal(0);
    setOpenInput({
      participant: false,
      stage: false,
      sponsor: false,
      periode: false,
    });
    setTmpImgArray({
      sponsor: [],
      university: [],
      community: [],
    });
    reset({ ...defaultValues });
  };

  const handleSubmit = async () => {
    if (watch("type") === "UNIKOM") {
      if ((await firstTrigger()) && sectionModal === 0) {
        setSectionModal(1);
        clearErrors(["community", "university"]);
      } else if ((await secondTrigger()) && sectionModal === 1) {
        handlePostSub();
      }
    } else {
      if (await firstTrigger()) {
        handlePostSub();
      }
    }
  };

  const handlePostSub = async () => {
    await handleUpsert();
    refetch();
    handleResetForm();
    setOpen(!open);
  };

  useEffect(() => {
    if (data) {
      const dateFormat = (date: string) =>
        moment(date).format("YYYY-MM-DD HH:mm");
      const groupFilter = (group: string) =>
        data?.groups?.filter((item) => item.type === group);
      reset({
        ...data,
        province_ids: data.groups
          ?.filter((item) => item.type === "PROVINCE")
          ?.map((item) => ({ label: item.name, value: item.id })),
        participant:
          data.public_max_participant +
          data.community_max_participant +
          data.university_max_participant,
        min_participant: data.min_participant === -1 ? 0 : data.min_participant,
        registration_start: dateFormat(data?.registration_start),
        registration_end: dateFormat(data?.registration_end),
        elimination_start: dateFormat(data?.elimination_start),
        elimination_end: dateFormat(data?.elimination_end),
        semifinal_start: dateFormat(data?.semifinal_start),
        semifinal_end: dateFormat(data?.semifinal_end),
        final_start: dateFormat(data?.final_start),
        final_end: dateFormat(data?.final_end),
        university: groupFilter("UNIVERSITY")
          ? [...groupFilter("UNIVERSITY")]
          : [{ name: "", logo: "", type: "UNIVERSITY" }],
        community: groupFilter("COMMUNITY")
          ? [...groupFilter("COMMUNITY")]
          : [{ name: "", logo: "", type: "COMMUNITY" }],
      });
    }
  }, [data, requestId]);

  return (
    <>
      {loading ? (
        <Modal open={loading} className="shadow-none">
          <Loader />
        </Modal>
      ) : openCropper.sponsor ? (
        <CropperComponent
          image={SDataState.imagePreview?.new!}
          crop={SDataState.propsCrop.crop}
          zoom={SDataState.propsCrop.zoom}
          aspect={1 / 1}
          open={openCropper.sponsor}
          handleOpen={() => handleOpen("sponsor")}
          onCrop={SDataState.propsCrop.onCrop}
          onCropChange={SDataState.propsCrop.onCropChange}
          onZoomChange={SDataState.propsCrop.onZoomChange}
          onCropComplete={SDataState.propsCrop.onCropComplete}
        />
      ) : openCropper.university ? (
        <CropperComponent
          image={UDataState.imagePreview?.new!}
          crop={UDataState.propsCrop.crop}
          zoom={UDataState.propsCrop.zoom}
          aspect={1 / 1}
          open={openCropper.university}
          handleOpen={() => handleOpen("university")}
          onCrop={UDataState.propsCrop.onCrop}
          onCropChange={UDataState.propsCrop.onCropChange}
          onZoomChange={UDataState.propsCrop.onZoomChange}
          onCropComplete={UDataState.propsCrop.onCropComplete}
        />
      ) : openCropper.community ? (
        <CropperComponent
          image={CDataState.imagePreview?.new!}
          crop={CDataState.propsCrop.crop}
          zoom={CDataState.propsCrop.zoom}
          aspect={1 / 1}
          open={openCropper.community}
          handleOpen={() => handleOpen("community")}
          onCrop={CDataState.propsCrop.onCrop}
          onCropChange={CDataState.propsCrop.onCropChange}
          onZoomChange={CDataState.propsCrop.onZoomChange}
          onCropComplete={CDataState.propsCrop.onCropComplete}
        />
      ) : category.length === 0 ? (
        <TBCategoryModal
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          handleResetForm={handleResetForm}
        />
      ) : (
        <Modal
          open={open}
          className="bg-white w-11/12 max-w-[2000px] p-4 md:p-8"
        >
          <Modal.Header className="flex justify-between">
            <p className="font-semibold font-poppins text-xl text-black w-fit">
              {watch("id") !== undefined
                ? "Edit Team Battle"
                : "Create New Team Battle"}
            </p>
            <FiX
              onClick={() => {
                handleResetForm();
                setOpen(!open);
              }}
              className="cursor-pointer"
            />
          </Modal.Header>
          <Modal.Body className="flex flex-col gap-4">
            {sectionModal === 0 ? (
              <FirstModal
                data={data}
                control={control}
                errors={errors}
                register={register}
                setTmpNumber={setTmpNumber}
                setValue={setValue}
                tmpImgArray={tmpImgArray.sponsor}
                watch={watch}
                openInput={openInput}
                setOpenInput={setOpenInput}
                handleOpen={handleOpen}
              />
            ) : (
              <SecondModal
                data={data}
                control={control}
                errors={errors}
                register={register}
                handleOpen={handleOpen}
                watch={watch}
                setTmpNumber={setTmpNumber}
                tmpImgArrayUniv={tmpImgArray.university}
                tmpImgArrayCom={tmpImgArray.community}
              />
            )}
          </Modal.Body>
          <Modal.Actions>
            {sectionModal === 1 && (
              <Button
                className="font-poppins text-base font-semibold text-[#3AC4A0] rounded-full w-[128px]"
                onClick={() => {
                  setSectionModal(0);
                }}
              >
                Back
              </Button>
            )}
            <Button
              className="self-end border-none bg-[#3AC4A0] rounded-full text-white w-[128px] hover:bg-[#3AC4A0]"
              loading={loadingUpsert}
              onClick={async () => {
                await handleSubmit();
              }}
            >
              {sectionModal === 0 && watch("type") === "UNIKOM"
                ? "Next"
                : "Save"}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default TeamBattleForm;
