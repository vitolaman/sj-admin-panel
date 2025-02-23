import ContentContainer from "components/container";
import { CreateCategoryPayload } from "_interfaces/seeds-academy.interfaces";
import CInput from "components/input";
import useCreateSeedsAcademyForm from "hooks/seeds-academy/useCreateSeedsAcademyForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useState, useEffect } from "react";
import { Button, FileInput } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import MDEditor, { commands } from "@uiw/react-md-editor";

export const csaRouteName = "seeds-academy-list/create";
const CreateSeedsAcademy = () => {
  const navigate = useNavigate();
  const {
    register,
    errors,
    setFocus,
    isLoading,
    control,
    watch,
    handleCreate,
    handleDraft,
  } = useCreateSeedsAcademyForm();
  const [levels, setLevels] = useState([0, 1, 2]);

  const banner = watch("banner.image_link");
  const [bannerPreview] = useFilePreview(banner as FileList);

  const handleCancel = () => {
    navigate(`/seeds-academy/seeds-academy-list`);
  };

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreateCategoryPayload;
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

  const handleAddNewLevel = () => {
    setLevels([...levels, levels[levels.length - 1] + 1]);
  };
  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl text-[#262626] font-bold">
            {`Create New Seeds Academy`}
          </h3>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-semibold">Category</label>
          <CInput {...register("title")} error={errors.title} borderOffset />
        </div>
        <div className="flex gap-2 my-3">
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold">
              About course (Indonesia)<span className="text-red-600">*</span>
            </label>
            <Controller
              control={control}
              name="about.id"
              render={({ field: { value, onChange } }) => (
                <>
                  <MDEditor
                    height={200}
                    commands={[...commands.getCommands()]}
                    value={value}
                    onChange={onChange}
                    highlightEnable={false}
                    preview="live"
                  />
                  {errors?.about?.id && (
                    <span className="text-red-600">
                      {errors?.about?.id?.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div data-color-mode="light" className="flex flex-col gap-2">
            <label className="font-semibold">
              About course (English)<span className="text-red-600">*</span>
            </label>
            <Controller
              control={control}
              name="about.en"
              render={({ field: { value, onChange } }) => (
                <>
                  <MDEditor
                    height={200}
                    commands={[...commands.getCommands()]}
                    value={value}
                    onChange={onChange}
                    highlightEnable={false}
                    preview="live"
                  />
                  {errors.about?.en && (
                    <span className="text-red-600">
                      {errors.about.en.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-span-2 my-3">
          <h1 className="font-semibold text-base">Add Category Banner</h1>
          <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
            {bannerPreview ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={bannerPreview}
                alt=""
              />
            ) : (
              <div className="text-seeds">Drag Your Image Here</div>
            )}
            <FileInput
              {...register("banner.image_link")}
              size="sm"
              accept="image/*"
            />
            {errors.banner?.image_link && (
              <span className="text-red-600">
                {errors?.banner?.image_link?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-semibold">Level</label>
          {levels.map((item, i) => (
            <div className="grid grid-cols-3 items-center gap-4" key={i}>
              <div className="font-semibold text-sm">{i + 1}</div>
              <div className="text-center col-span-2">
                <CInput {...register(`level.${i}`)} />
                {errors.level && (
                  <span className="text-red-600 ms-auto">
                    {errors.level[i]?.message}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              onClick={handleAddNewLevel}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
            >
              + Add New Level
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mb-8 mt-4">
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDraft}
              className="rounded-full px-6 py-2 border-seeds text-seeds hover:bg-seeds/90 hover:text-white"
            >
              Draft
            </Button>
            <Button
              type="submit"
              // onClick={handleCreate}
              loading={isLoading}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90 "
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateSeedsAcademy;
