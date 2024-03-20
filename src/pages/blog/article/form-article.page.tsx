import { optionsWAvatar } from "_interfaces/article.interfaces";
import ContentContainer from "components/container";
import CInput from "components/input";
import MultiSelectWithImage from "components/multi-select";
import Select from "components/select";
import { languageOptions } from "data/article";
import useUpsertArticleForm from "hooks/article/useUpsertArticleForm";
import useDebounce from "hooks/shared/useDebounce";
import { useEffect, useState } from "react";
import { Button, FileInput, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAssetTagQuery,
  useGetCircleCategoriesQuery,
  useGetCircleTagQuery,
  useGetPeopleQuery,
  useLazyGetArticleByIdQuery,
} from "services/modules/article";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quilFormats, quilModules } from "data/quil";
import useFilePreview from "hooks/shared/useFilePreview";
import { IoClose } from "react-icons/io5";

export const createArticleRouteName = "article/create";
export const editArticleRouteName = "article/:id";
const FormArticle = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);

  const [getArticle, articleState] = useLazyGetArticleByIdQuery();

  const [peopleOptions, setPeopleOptions] = useState<optionsWAvatar[]>([]);
  const [searchPeople, setSearchPeople] = useState<string>("");
  const debouncedSearchPeople = useDebounce(searchPeople, 500);
  const peopleState = useGetPeopleQuery(debouncedSearchPeople);

  const [circleTag, setCircleTag] = useState<optionsWAvatar[]>([]);
  const [searchCircleTag, setSearchCircleTag] = useState<string>("");
  const debouncedSearchCircleTag = useDebounce(searchCircleTag, 500);
  const circleTagState = useGetCircleTagQuery(debouncedSearchCircleTag);

  const [assetTag, setAssetTag] = useState<optionsWAvatar[]>([]);
  const [searchAssetTag, setSearchAssetTag] = useState<string>("");
  const debouncedSearchAssetTag = useDebounce(searchAssetTag, 500);
  const assetTagState = useGetAssetTagQuery(debouncedSearchAssetTag);

  const [circleOptions, setCircleOptions] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const circleState = useGetCircleCategoriesQuery(undefined);

  const {
    handleCreate,
    handleUpdate,
    register,
    errors,
    reset,
    control,
    loadingUpsert,
    watch,
    setValue,
  } = useUpsertArticleForm(Number(params.id));
  const attachment = watch("imageUrl");
  const [attachmentPreview] = useFilePreview(attachment);

  useEffect(() => {
    if (peopleState.data?.data) {
      const opt = peopleState.data.data.map((item, key) => ({
        key,
        label: item.name,
        value: item.id,
        avatar: item.avatar,
      }));
      setPeopleOptions(opt);
    }
  }, [peopleState.data]);

  useEffect(() => {
    if (circleTagState.data?.data) {
      const opt = circleTagState.data.data.map((item, key) => ({
        key,
        label: item.name,
        value: item.id,
        avatar: item.avatar,
      }));
      setCircleTag(opt);
    }
  }, [circleTagState.data]);

  useEffect(() => {
    if (assetTagState.data?.data) {
      const opt = assetTagState.data.data.map((item, key) => ({
        key,
        label: item.name,
        value: item.id,
        avatar: item.logo,
      }));
      setAssetTag(opt);
    }
  }, [assetTagState.data]);

  useEffect(() => {
    if (circleState.data?.data) {
      const opt = circleState.data.data.map((item, key) => ({
        key,
        label: item.category,
        value: item.category,
      }));
      setCircleOptions(opt);
    }
  }, [circleState.data]);

  useEffect(() => {
    if (params.id) {
      getArticle(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (articleState.data) {
      const { news } = articleState.data;
      const assets: optionsWAvatar[] = news.assets.map((item, key) => ({
        key,
        value: item.id,
        label: item.name,
        avatar: "",
      }));
      const circles: optionsWAvatar[] = news.circles.map((item, key) => ({
        key,
        value: item.id,
        label: item.name,
        avatar: "",
      }));
      const peoples: optionsWAvatar[] = news.peoples.map((item, key) => ({
        key,
        value: item.id,
        label: item.name,
        avatar: "",
      }));
      reset({
        id: news.id,
        title: news.title,
        metaTitle: news.meta_title,
        metaDescription: news.meta_description,
        content: news.content,
        source_image: news.imageUrl,
        author: news.author,
        status: news.status,
        scheduled_at: news.publicationDate,
        updated_at: news.updated_at,
        category: news.category,
        language: news.language,
        assets,
        circles,
        peoples,
      });
    }
  }, [articleState.data]);

  return (
    <ContentContainer>
      <form
        onSubmit={(e) => {
          if (params.id) {
            handleUpdate(e);
          } else {
            handleCreate(e);
          }
        }}
      >
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              {params.id ? "Detail Article" : "Create New Article"}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            {params.id ? (
              <Button
                variant="outline"
                className="border-seeds text-seeds rounded-full px-10"
                onClick={() => {
                  navigate(-1);
                }}
                loading={loadingUpsert}
                type="button"
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-seeds text-seeds rounded-full px-10"
                onClick={() => {
                  setValue("status", "DRAFT");
                }}
                loading={loadingUpsert}
                type="submit"
              >
                Save to Draft
              </Button>
            )}
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={loadingUpsert}
            >
              {params.id ? "Save" : "Publish"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {params.id && (
            <div className="flex flex-col gap-2 col-span-2">
              <label className="font-semibold">Article ID</label>
              <CInput
                disabled
                value={params.id}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Title</label>
            <CInput
              {...register("title")}
              error={errors.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Meta Title</label>
            <CInput
              {...register("metaTitle")}
              error={errors.metaTitle}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-semibold">Meta Description</label>
            <CInput
              {...register("metaDescription")}
              error={errors.metaDescription}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Category</label>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <Select
                  options={circleOptions}
                  value={value}
                  onChange={(e) => {
                    onChange(e.value);
                  }}
                />
              )}
            />
            {errors.category?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.category?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Language</label>
            <Controller
              control={control}
              name="language"
              render={({ field: { value, onChange } }) => (
                <Select
                  options={languageOptions}
                  value={value}
                  onChange={(e) => onChange(e.value)}
                />
              )}
            />
            {errors.language?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.language?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">People</label>
            <Controller
              control={control}
              name="peoples"
              render={({ field: { value, onChange } }) => (
                <MultiSelectWithImage
                  options={peopleOptions}
                  value={value}
                  onInputChange={(text) => setSearchPeople(text)}
                  isLoading={peopleState.isLoading || peopleState.isFetching}
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            {errors.peoples?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.peoples?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Circle</label>
            <Controller
              control={control}
              name="circles"
              render={({ field: { value, onChange } }) => (
                <MultiSelectWithImage
                  options={circleTag}
                  value={value}
                  onInputChange={(text) => setSearchCircleTag(text)}
                  isLoading={
                    circleTagState.isLoading || circleTagState.isFetching
                  }
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            {errors.circles?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.circles?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Asset</label>
            <Controller
              control={control}
              name="assets"
              render={({ field: { value, onChange } }) => (
                <MultiSelectWithImage
                  options={assetTag}
                  value={value}
                  onInputChange={(text) => setSearchAssetTag(text)}
                  isLoading={
                    assetTagState.isLoading || assetTagState.isFetching
                  }
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            {errors.assets?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.assets?.message}
              </div>
            )}
          </div>
          <div />
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-semibold">Body Article</label>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <ReactQuill
                  formats={quilFormats}
                  modules={quilModules}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.content?.message && (
              <div className="text-red-400 italic text-sm text-right">
                {errors.content?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 col-span-2 mt-10">
            <h1 className="font-semibold text-base">Attachment</h1>
            <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
              {params.id && !newImage ? (
                <>
                  <img
                    className="flex mx-auto w-[500px] h-[166px] object-fill"
                    src={articleState.data?.news.imageUrl}
                    alt=""
                  />
                  <div
                    onClick={() => setNewImage(true)}
                    className="text-seeds"
                  >
                    Click here to change image
                  </div>
                </>
              ) : (
                <>
                  {attachmentPreview ? (
                    <img
                      className="flex mx-auto w-[500px] h-[166px] object-fill"
                      src={attachmentPreview}
                      alt=""
                    />
                  ) : (
                    <div className="text-seeds">
                      Choose your attachment here
                    </div>
                  )}
                  <FileInput
                    {...register("imageUrl")}
                    size="sm"
                    accept="image/*"
                  />
                </>
              )}
            </div>
            <div className="text-lg text-gray-500">
              Maximum file size 5MB for photo and 20MB for video format
            </div>
          </div>
          {params.id ? null : (
            <div className="flex items-center justify-end gap-4 col-span-2">
              <Button
                type="reset"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
                onClick={() => setScheduleModal(true)}
                loading={loadingUpsert}
              >
                Schedule Post
              </Button>
              <Button
                variant="outline"
                className="border-seeds text-seeds rounded-full px-10"
                loading={loadingUpsert}
                type="reset"
              >
                Preview Article
              </Button>
            </div>
          )}
        </div>
      </form>
      <Modal
        className="bg-white"
        open={scheduleModal}
      >
        <Modal.Header className="flex flex-row justify-between">
          Pick Date and Time
          <IoClose
            onClick={() => {
              setScheduleModal(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className="overflow-scroll">
          <CInput
            type="datetime-local"
            onChange={(e) => setValue("scheduled_at", e.target.value)}
            className="border-seeds"
            size="sm"
            accept=".csv"
          />
        </Modal.Body>
        <Modal.Actions>
          <Button
            type="reset"
            className="border-seeds text-seeds rounded-full px-10"
            onClick={() => {
              setScheduleModal(false);
              setValue("status", "PUBLISHED");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setScheduleModal(false);
              setValue("status", "SCHEDULED");
            }}
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
          >
            Set Schedule
          </Button>
        </Modal.Actions>
      </Modal>
    </ContentContainer>
  );
};

export default FormArticle;
