import { EventsFormDataI } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import FormInput from "components/input/formInput";
import FormEditor from "components/input/formEditor";
import useUpsertEvents from "hooks/events/useUpsertEvents";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import FormImage from "components/input/formImage";
import { useNavigate } from "react-router-dom";

export const cEventsRouteName = "events/create";
const CreateEvent = () => {
  const navigate = useNavigate();
  const {
    handleCreate,
    register,
    errors,
    control,
    loadingUpsert,
    setValue,
    trigger,
    watch,
  } = useUpsertEvents();
  const imageURL = watch("image_url");
  const [imageURLPreview] = useFilePreview(imageURL as FileList);
  return (
    <ContentContainer>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pb-6">
        <h1 className="self-start sm:self-center font-semibold md:text-2xl text-lg font-poppins">
          Create New Event
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
      <div className="flex flex-col md:flex-row gap-x-6">
        <FormInput<EventsFormDataI>
          label="Event Name"
          registerName="name"
          register={register}
          errors={errors}
          maxLength={200}
        />
        <FormInput<EventsFormDataI>
          label="Link for Registration"
          registerName="external_url"
          register={register}
          errors={errors}
          maxLength={200}
        />
      </div>
      <div className="flex gap-6">
        {/* <FormCheckbox<EventsFormDataI>
          label="Is Paid Event"
          registerName="id"
          setValue={setValue}
          errors={errors}
        /> */}
        <FormInput<EventsFormDataI>
          label="Event Date"
          registerName="event_date"
          register={register}
          errors={errors}
          type="datetime-local"
        />
      </div>
      {/* <div className="w-[48.75%] flex gap-4">
        <div className="w-[200px]">
          <Controller
            control={control}
            name="id"
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                options={currencyOptions}
                onChange={(e) => onChange(e.value)}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="id"
          render={({ field: { onChange, value } }) => (
            <CurrencyInput
              value={value}
              onValueChange={(value) => onChange(value)}
            />
          )}
        />
      </div> */}
      <FormEditor<EventsFormDataI>
        label="Body Message"
        registerName="description"
        control={control}
        errors={errors}
      />
      <FormImage<EventsFormDataI>
        label="Attachment"
        registerName="image_url"
        register={register}
        errors={errors}
        imageURLPreview={imageURLPreview}
      />
    </ContentContainer>
  );
};

export default CreateEvent;
