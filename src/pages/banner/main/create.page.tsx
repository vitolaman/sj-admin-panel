import { MainBannerFormData } from "_interfaces/banner.interface";
import ContentContainer from "components/container";
import CInput from "components/input";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import useCreateMainBannerForm from "hooks/banner/useCreateMainBannerForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export const cmbRouteName = "main-banner/create";
const CreateMainBanner = () => {
  const navigate = useNavigate();
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const { register, errors, setFocus, isLoading, watch, handleCreate } =
    useCreateMainBannerForm();

  const banner = watch("banner.image_link");
  const [bannerPreview] = useFilePreview(banner as FileList);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof MainBannerFormData;
    if (firstError) {
      setFocus(firstError);
      const element = errors[firstError]?.ref;
      if (element) {
        element?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors, setFocus]);

  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  const handleSavePopup = () => {
    setIsSavePopupOpen(!isSavePopupOpen);
  };

  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl text-[#262626] font-bold">
            {`Create Banner`}
          </h3>
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              onClick={() => {
                void handleCancelPopup();
              }}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
            >
              Cancel
            </Button>
            <CancelPopUp
              isOpen={isCancelPopupOpen}
              data={"Create"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Banner"}
            />
            <Button
              type="button"
              onClick={() => {
                void handleSavePopup();
              }}
              loading={isLoading}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
            >
              Save
            </Button>
            <SavePopUp
              isOpen={isSavePopupOpen}
              data={"Create"}
              onClose={handleSavePopup}
              onEdit={() => {
                setIsSavePopupOpen(false);
              }}
              menu={"Banner"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Banner Name<span className="text-red-600">*</span>
          </label>
          <CInput {...register("name")} error={errors.name} />
          <div
            className="
              text-sm text-[#3C49D6] font-normal mb-6"
          >
            *Maximal 30 Characters
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">External URL</label>
          <CInput {...register("external_url")} error={errors.external_url} />
          <div
            className="
              text-sm text-[#3C49D6] font-normal mb-6"
          >
            *Maximal 200 Characters
          </div>
        </div>
        <div />
        <div className="col-span-2">
          <h1 className="font-semibold text-base">Upload Banner</h1>
          <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
            {bannerPreview ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={bannerPreview}
                alt=""
              />
            ) : (
              <div className="text-seeds">Choose your banner here</div>
            )}
            <FileInput
              {...register("banner.image_link")}
              size="sm"
              accept="image/*"
            />
          </div>
          <div className="text-sm text-[#3C49D6] font-normal mt-2">
            *PNG, JPEG, JPG
          </div>
          <div className="text-sm text-[#3C49D6] font-normal my-2">
            *Max File Size: 3 MB
          </div>
          <div className="text-sm text-[#3C49D6] font-normal">
            *Recommended Resolution 1431px X 676px
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateMainBanner;
