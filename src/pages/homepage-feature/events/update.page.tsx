import { EventsFormDataI } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import FormInput from "components/input/formInput";
import FormEditor from "components/input/formEditor";
import useUpsertEvents from "hooks/events/useUpsertEvents";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import FormImage from "components/input/formImage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "services/modules/events";
import { useEffect } from "react";
import moment from "moment";

export const uEventsRouteName = "events/:id/edit";
const UpdateEvent = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const {
    handleUpdate,
    register,
    errors,
    control,
    loadingUpsert,
    setValue,
    trigger,
    watch,
    reset,
  } = useUpsertEvents(params.id);
  const imageURL = watch("image_url");
  const [imageURLPreview] = useFilePreview(
    typeof imageURL === "string" ? undefined : (imageURL as FileList)
  );
  const {data} = useGetEventByIdQuery(params.id!);
  useEffect(() => {
    reset({
      ...data,
      event_date: moment(data?.event_date).format("YYYY-MM-DD HH:mm"),
    });
  }, [data, params.id]);
  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center pb-6">
        <h1 className="font-semibold text-2xl font-poppins">Edit Event</h1>
        <div className="flex flex-row gap-3">
          <Button
            loading={loadingUpsert}
            onClick={() => {
              navigate(-1);
            }}
            className="border-seeds text-seeds rounded-full px-10 font-semibold font-poppins text-base"
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
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10 font-semibold font-poppins text-base"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="flex gap-6">
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
        data={data?.image_url!}
      />
    </ContentContainer>
  );
};

export default UpdateEvent;
