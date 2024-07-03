import ContentContainer from "components/container";
import MInput from "components/multi-input/index";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { OpenAccountFromData } from "_interfaces/banner.interface";
import useUpsertOpenAccount from "hooks/open-account/useUpsertOpenAccount";

export const cOpenAccountRouteName = "open-account/create";
const CreateOpenAccount = () => {
  const navigate = useNavigate();
  const {
    handleCreate,
    register,
    errors,
    control,
    loadingUpsert,
    trigger,
    watch,
  } = useUpsertOpenAccount();
  const imageURL = watch("banner.image_link");
  const [imageURLPreview] = useFilePreview(imageURL as FileList);
  return (
    <ContentContainer>
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="self-start sm:self-center font-semibold md:text-2xl text-lg font-poppins">
            Create Open Account
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
                  await handleCreate(e);
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
            <MInput<OpenAccountFromData>
              label="Account Name"
              registerName="name"
              type="text"
              register={register}
              errors={errors}
              maxLength={30}
            />
            <MInput<OpenAccountFromData>
              label="Register Link"
              registerName="external_url"
              type="text"
              register={register}
              errors={errors}
              maxLength={30}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-x-6">
            <MInput<OpenAccountFromData>
              label="Title"
              registerName="title"
              type="text"
              register={register}
              errors={errors}
              maxLength={30}
            />
            <div className="w-full"/>
          </div>
          <MInput<OpenAccountFromData>
            label="Description"
            registerName="description"
            type="rich-text"
            control={control}
            errors={errors}
          />
          <MInput<OpenAccountFromData>
            label="Image Banner"
            registerName="banner.image_link"
            type="image"
            register={register}
            errors={errors}
            imageURLPreview={imageURLPreview}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default CreateOpenAccount;
