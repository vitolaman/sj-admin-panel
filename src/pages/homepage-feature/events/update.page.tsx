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
import { useEffect, useState } from "react";
import moment from "moment";
import FormCheckbox from "components/input/formCheckbox";
import { Controller } from "react-hook-form";
import Select from "components/select";
import CurrencyInput from "components/currency-input";
import { currencyOptions } from "data/currency";

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
  const [logic, setLogic] = useState<boolean>(false);
  const { data } = useGetEventByIdQuery(params.id!);
  useEffect(() => {
    reset({
      ...data,
      event_date: moment(data?.event_date).format("YYYY-MM-DD HH:mm"),
    });
  }, [data, params.id]);
  return (
    <ContentContainer>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pb-6">
        <h1 className="self-start sm:self-center font-semibold md:text-2xl text-lg font-poppins">
          Edit Event
        </h1>
        <div className="flex flex-row gap-3 self-end">
          <Button
            loading={loadingUpsert}
            onClick={() => {
              navigate(-1);
            }}
            className="border-seeds text-seeds rounded-full md:px-10 font-semibold font-poppins md:text-base text-sm"
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
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full md:px-10 font-semibold font-poppins md:text-base text-sm"
          >
            Save
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
      <FormCheckbox<EventsFormDataI>
              label="Is Paid Event"
              registerName="id"
              setValue={setValue}
              errors={errors}
              logic={logic}
              setLogic={setLogic}
            />
        <FormInput<EventsFormDataI>
          label="Event Date"
          registerName="event_date"
          register={register}
          errors={errors}
          type="datetime-local"
        />
      </div>
      <div
            className={`${logic ? "flex" : "hidden"} w-[48.75%] flex-col gap-2`}
          >
            <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
              Event Price
            </label>
            <div className="flex gap-4">
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
            </div>
          </div>
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
