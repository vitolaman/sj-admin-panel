import ContentContainer from "components/container";
import CInput from "components/input";
import {
  useClassByCategoryListQuery,
  useDeleteCategoryMutation,
} from "services/modules/seeds-academy";
import useUpdateSeedsAcademyForm from "hooks/seeds-academy/useUpdateSeedsAcademyForm";
import useFilePreview from "hooks/shared/useFilePreview";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { Controller } from "react-hook-form";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { MainSeedsAcademyReq } from "_interfaces/seeds-academy.interfaces";
import { RiDeleteBinLine } from "react-icons/ri";
import { errorHandler } from "services/errorHandler";

export const usaRouteName = "seeds-academy-list/update/:id";
const UpdateSeedsAcademy = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [levels, setLevels] = useState<string[]>([""]);
  const [searchParams, setSearchParams] = useState<MainSeedsAcademyReq>({
    search: "",
    status: "",
    type: "main",
    limit: 10,
    page: 1,
    id: params.id!,
  });
  const {
    register,
    errors,
    setFocus,
    reset,
    control,
    watch,
    handleCreate,
    handleDraft,
  } = useUpdateSeedsAcademyForm(params.id!);
  const { data, isLoading, refetch } =
    useClassByCategoryListQuery(searchParams);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const banner = watch("banner.image_link");
  const [bannerPreview] = useFilePreview(
    typeof banner === "string" ? undefined : (banner as FileList)
  );
  const handleAddNewLevel = () => {
    setLevels([...levels, ""]);
  };

  const handleCancel = () => {
    navigate(`/seeds-academy/seeds-academy-list`);
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory({ id: params.id! });
      navigate(`/seeds-academy/seeds-academy-list`);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (data)
      reset({
        ...data,
        banner: {
          image_url: data.banner,
          image_link: "",
        },
      });
  }, [data]);
  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl text-[#262626] font-bold">
            {`Edit Seeds Academy`}
          </h3>
          <div className="flex items-center justify-end gap-4 ">
            <div className="flex items-center justify-between gap-4 ml-4">
              <Button
                type="button"
                onClick={handleDeleteCategory}
                // loading={isLoading}
                className="rounded-full flex gap-2 px-6 py-2 bg-[#DD2525] text-white hover:bg-[#DD2525] hover:text-white"
              >
                <RiDeleteBinLine className=" h-4 w-4" />
                Delete this Category
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-semibold">
            Category<span className="text-red-600">*</span>
          </label>
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
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview="live"
                />
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
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview="live"
                />
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
            ) : data?.banner === "" ? (
              <div className="text-seeds">Choose your banner here</div>
            ) : (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={data?.banner}
                alt=""
              />
            )}
            <FileInput
              {...register("banner.image_link")}
              size="sm"
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-semibold">Level</label>
          {[0, 1, 2].map((item, i) => (
            <div className="grid grid-cols-3 items-center gap-4" key={i}>
              <div className="font-semibold text-sm">{i + 1}</div>
              <div className="text-center col-span-2">
                <CInput {...register(`level.${i}`)} error={errors.title} />
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

export default UpdateSeedsAcademy;
