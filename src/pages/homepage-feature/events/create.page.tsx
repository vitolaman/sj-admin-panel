import { EventsFormDataI } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import FormInput from "components/input/formInput";
import useUpsertEvents from "hooks/events/useUpsertEvents";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import CurrencyInput from "components/currency-input";
import Select from "components/select";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { platformOptions } from "data/platformOptions";
import EventStatusSelector from "./sections/formStatus.section";

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
    reset,
  } = useUpsertEvents();
  const imageURL = watch("image_url");
  const [imageURLPreview] = useFilePreview(imageURL as FileList);
  const { isPaidEvent } = useSelector((state: RootState) => state?.isPaid ?? {});
  const { isStatusEvent } = useSelector((state: RootState) => state?.isStatus ?? {});

  return (
    <ContentContainer>
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
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
        <div className="w-full flex flex-col lg:flex-row gap-x-6">
          <div className={`${(isPaidEvent) ? 'lg:w-1/2' : 'w-full lg:mb-2'} flex flex-col md:flex-row gap-4`}>
            <FormInput<EventsFormDataI>
              label="Event Name"
              registerName="name"
              type="text"
              register={register}
              errors={errors}
              maxLength={200}
              placeholder="Please input event name"
            />
          </div>
          <div className={`w-full flex flex-col md:flex-row ${(isPaidEvent) ? 'gap-x-6 lg:w-1/2' : 'hidden'}`}>
          {
            (isPaidEvent) &&
            <div className={`w-full flex-col gap-2`}>
              <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                Event Price
              </label>
              <div className="flex gap-4 mt-2">
                <Controller
                  control={control}
                  name="id"
                  render={({ field: { onChange, value } }) => (
                    <CurrencyInput
                      value={value}
                      onValueChange={(value) => onChange(value)}
                      placeholder="Please input event price"
                    />
                  )}
                />
              </div>
            </div>
          }
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-x-6">
          <FormInput<EventsFormDataI>
            label={isStatusEvent === "ONLINE" ? "Event Start Date" : "Event Date"}
            registerName="event_date"
            register={register}
            errors={errors}
            type="datetime-local"
          />
          {
            (isStatusEvent === "ONLINE") &&
              <FormInput<EventsFormDataI>
                label="Event End Date"
                registerName="ended_at"
                register={register}
                errors={errors}
                type="datetime-local"
              />
          }
        </div>
        <div>
          <EventStatusSelector setValue={setValue} control={control} name="event_status" isStatusEvent={isStatusEvent}/>
        </div>
        {
          (isStatusEvent === "ONLINE") ?
            <div className="flex flex-col md:flex-row gap-x-6 mb-4">
              <div
                className="w-full flex flex-col gap-2 mb-4"
              >
                <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                  Platform
                </label>
                <div className="flex gap-4">
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="location_name"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          options={platformOptions}
                          onChange={(e) => onChange(e.value)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <FormInput<EventsFormDataI>
                label="Link Conference"
                registerName="external_url"
                type="text"
                register={register}
                errors={errors}
                maxLength={200}
                placeholder="Please input conference link"
              />
            </div>
            :
            <div className="flex flex-col md:flex-row gap-x-6 mb-4">
              <FormInput<EventsFormDataI>
                label="Location Name"
                registerName="location_name"
                type="text"
                register={register}
                errors={errors}
                maxLength={200}
                placeholder="Please input location name"
              />
              <FormInput<EventsFormDataI>
                label="Link Gmaps"
                registerName="external_url"
                type="text"
                register={register}
                errors={errors}
                maxLength={200}
                placeholder="Please input gmaps link"
              />
            </div>
        }
        <FormInput<EventsFormDataI>
          label="Body Message"
          registerName="description"
          type="rich-text"
          control={control}
          errors={errors}
        />
        <FormInput<EventsFormDataI>
          label="Attachment"
          registerName="image_url"
          type="image"
          register={register}
          errors={errors}
          imageURLPreview={imageURLPreview}
        />
      </div>
    </ContentContainer>
  );
};

export default CreateEvent;
