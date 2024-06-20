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
import { Controller } from "react-hook-form";
import Select from "components/select";
import CurrencyInput from "components/currency-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setStatusState } from "store/events/statusSlice";
import { platformOptions } from "data/platformOptions";
import { setPaidState } from "store/events/paidSlice";
import FormCheckbox from "components/input/formCheckbox";
import EventStatusSelector from "./sections/formStatus.section";

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
  const dispatch = useDispatch();
  const imageURL = watch("image_url");
  const [imageURLPreview] = useFilePreview(
    typeof imageURL === "string" ? undefined : (imageURL as FileList)
  );
  const { data } = useGetEventByIdQuery(params.id!);
  const { isPaidEvent } = useSelector((state: RootState) => state?.isPaid ?? {});
  const { isStatusEvent } = useSelector((state: RootState) => state?.isStatus ?? {});
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const handleChangeIsPaid = () => {
    if (isPaid) {
      setValue('event_price', 0)
    } 
    setIsPaid(!isPaid)
    dispatch(setPaidState(!isPaidEvent))
  };

  useEffect(() => {
    if (data?.event_status === "OFFLINE") {
      reset({
        ...data,
        event_date: moment(data?.event_date).format("YYYY-MM-DD HH:mm"),
      });
    } else {
      reset({
        ...data,
        event_date: moment(data?.event_date).format("YYYY-MM-DD HH:mm"),
        ended_at: moment(data?.ended_at).format("YYYY-MM-DD HH:mm"),
      });
    }

    dispatch(setStatusState(data?.event_status))

    if ((data?.event_price ?? 0) > 0) {
      dispatch(setPaidState(true))
    } else {
      dispatch(setPaidState(false))
    }

    if ((data?.event_price ?? 0) > 0) {
      setIsPaid(true)
    }
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
      <FormCheckbox<EventsFormDataI>
        label="Paid Event"
        registerName="event_price"
        setValue={setValue}
        errors={errors}
        logic={isPaid}
        setLogic={handleChangeIsPaid}
        className={"flex gap-2 w-full mb-4 items-center"}
      />
      <div className={`w-full flex flex-col lg:flex-row gap-x-6`}>
        <div className={`${(isPaidEvent && isPaid) ? 'lg:w-1/2' : 'w-full lg:mb-2'} flex flex-col md:flex-row gap-4`}>
          <FormInput<EventsFormDataI>
            label="Event Name"
            registerName="name"
            register={register}
            errors={errors}
            maxLength={200}
          />
        </div>
        <div className={`w-full flex flex-col md:flex-row ${(isPaidEvent && isPaid) ? 'gap-x-6 lg:w-1/2' : 'md:mb-2 hidden'}`}>
          {
            (isPaidEvent && isPaid) &&
              <div className={`w-full flex-col gap-2 mb-2 lg:mb-4`}>
                <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                  Event Price
                </label>
                <div className="flex gap-4 mt-2">
                  <Controller
                    control={control}
                    name="event_price"
                    render={({ field: { onChange, value } }) => (
                      <CurrencyInput
                        value={value}
                        onValueChange={(value) => onChange(value)}
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
        data={data?.image_url!}
      />
    </ContentContainer>
  );
};

export default UpdateEvent;
