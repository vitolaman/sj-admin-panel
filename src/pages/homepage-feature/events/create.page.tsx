import { EventsFormDataI } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import FormInput from "components/input/formInput";
import FormEditor from "components/input/formEditor";
import useUpsertEvents from "hooks/events/useUpsertEvents";
import useFilePreview from "hooks/shared/useFilePreview";
import { Button } from "react-daisyui";
import FormImage from "components/input/formImage";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import CurrencyInput from "components/currency-input";
import FormCheckbox from "components/input/formCheckbox";
import Select from "components/select";
import { currencyOptions } from "data/currency";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { platformOptions } from "data/platformOptions";
import { setStatusState } from "store/events/statusSlice";

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
    reset
  } = useUpsertEvents();
  const dispatch = useDispatch();
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
        <div>
          <div className="flex flex-col md:flex-row gap-x-6">
            <FormInput<EventsFormDataI>
              label="Event Name"
              registerName="name"
              register={register}
              errors={errors}
              maxLength={200}
              placeholder="Please input event name"
            />
            <div
              className={`${isPaidEvent ? "flex" : "hidden"} w-full flex-col gap-2 mb-4`}
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
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                  label="Event Ended Date"
                  registerName="ended_at"
                  register={register}
                  errors={errors}
                  type="datetime-local"
                />
            }
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="border-b-2 border-[#BDBDBD] flex justify-center cursor-pointer">
              <div onClick={() => {dispatch(setStatusState("OFFLINE"))}} className={`px-4 py-2 mx-2 font-semibold ${isStatusEvent === "OFFLINE" ? 'border-b-4 border-[#27A590] text-[#27A590]' : 'text-[#7C7C7C]'}`}>
                Offline Event
              </div>
            </div>
            <div className="border-b-2 border-[#BDBDBD] flex justify-center cursor-pointer">
              <div onClick={() => {dispatch(setStatusState("ONLINE"))}} className={`px-4 py-2 mx-2 font-semibold ${isStatusEvent === "ONLINE" ? 'border-b-4 border-[#27A590] text-[#27A590]' : 'text-[#7C7C7C]'}`}>
                Online Event
              </div>
            </div>
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
                  register={register}
                  errors={errors}
                  maxLength={200}
                  placeholder="Please input location name"
                />
                <FormInput<EventsFormDataI>
                  label="Link Gmaps"
                  registerName="external_url"
                  register={register}
                  errors={errors}
                  maxLength={200}
                  placeholder="Please input gmaps link"
                />
              </div>
          }
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
        </div>
      </div>
    </ContentContainer>
  );
};

export default CreateEvent;
