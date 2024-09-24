import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import { TeamBattleModal } from "_interfaces/team-battle.interface";
import CropperComponent from "components/cropper";
import TBCategoryModal from "../components/category.component";
import { Loader } from "components/spinner/loader";
import FirstModal from "../components/description-modal.component";
import SecondModal from "../components/community-modal.component";
import useTeamBattleForm from "hooks/team-battle/useTeamBattleForm";

const TeamBattleForm = (props: TeamBattleModal) => {
  const { data, loading, open, setOpen } = props;
  const {
    sectionModal,
    setSectionModal,
    setOpenInput,
    setTmpNumber,
    tmpImgArray,
    openInput,
    openCropper,
    register,
    errors,
    watch,
    setValue,
    loadingUpsert,
    control,
    category,
    SDataState,
    UDataState,
    CDataState,
    handleSubmit,
    handleOpen,
    handleResetForm,
  } = useTeamBattleForm(props);

  return (
    <>
      {loading ? (
        <Modal
          open={loading && watch("id") === undefined}
          className="shadow-none"
        >
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
            <p
              className="font-semibold font-poppins text-xl text-black w-fit">
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
                setValue={setValue}
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
              onClick={handleSubmit}
            >
              {sectionModal === 0 ? "Next" : "Save"}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default TeamBattleForm;
