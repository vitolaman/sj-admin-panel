import ContentContainer from "components/container";
import FormInput from "components/input/formInput";
import FormEditor from "components/input/formEditor";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import FormImage from "components/input/formImage";
import { useNavigate, useParams } from "react-router-dom";
import { OpenAccountFromData } from "_interfaces/banner.interface";
import useUpsertOpenAccount from "hooks/open-account/useUpsertOpenAccount";
import { useBannerDetailQuery } from "services/modules/banner";
import { useEffect } from "react";

export const uOpenAccountRouteName = "open-account/:id/edit";
const UpdateOpenAccount = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const {
    handleUpdate,
    register,
    errors,
    control,
    loadingUpsert,
    trigger,
    watch,
    reset,
    setValue,
  } = useUpsertOpenAccount(params.id!);
  const imageURL = watch("banner.image_link");
  const [imageURLPreview] = useFilePreview(
    typeof imageURL === "string" ? undefined : (imageURL as FileList)
  );
  const { data } = useBannerDetailQuery({ id: params.id! });
  useEffect(() => {
    if (data)
      reset({
        ...data,
        banner: {
          image_url: data.image_url,
          image_link: "",
        },
      });
  }, [data, params.id]);

  return (
    <ContentContainer>
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="self-start sm:self-center font-semibold md:text-2xl text-lg font-poppins">
            Edit Open Account
          </h1>
          <div className="flex flex-row gap-3 self-end">
            <Button
              loading={loadingUpsert}
              onClick={() => {
                navigate(-1);
              }}
              className="border-seeds text-seeds rounded-full lg:px-10 font-semibold font-poppins md:text-base text-sm"
            >
              Cancel
            </Button>
            <Button
              loading={loadingUpsert}
              onClick={async (e) => {
                const status = await trigger();
                if (status) {
                  await handleUpdate(e);
                }
              }}
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full lg:px-10 font-semibold font-poppins md:text-base text-sm"
            >
              Publish
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-x-6">
            <FormInput<OpenAccountFromData>
              label="Account Name"
              registerName="name"
              register={register}
              errors={errors}
              maxLength={30}
            />
            <FormInput<OpenAccountFromData>
              label="Register Link"
              registerName="external_url"
              register={register}
              errors={errors}
              maxLength={30}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-x-6">
            <FormInput<OpenAccountFromData>
              label="Title"
              registerName="title"
              register={register}
              errors={errors}
              maxLength={30}
            />
            <div className="w-full" />
          </div>
          <FormEditor<OpenAccountFromData>
            label="Description"
            registerName="description"
            control={control}
            errors={errors}
          />
          <FormImage<OpenAccountFromData>
            label="Image Banner"
            registerName="banner.image_link"
            register={register}
            errors={errors}
            imageURLPreview={imageURLPreview}
            data={data?.image_url!}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default UpdateOpenAccount;
