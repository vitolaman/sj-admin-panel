import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  BlastPushFormData,
  PushNotificationList,
} from "_interfaces/push-notif.interfaces";
import ContentContainer from "components/container";
import CInput from "components/input";
import CancelPopUp from "components/modal/other/Cancel";
import SavePopUp from "components/modal/other/Save";
import MInput from "components/multi-input";
import ValidationError from "components/validation/error";
import {
  availableTimezone,
  availableTypeNotification,
  countryOption,
  daysOption,
  intencityOption,
  languageOption,
  oneTimeScheduledOption,
  recurringOption,
  repeatOption,
  tergetNotificationOption,
} from "data/push-notif";
import useUpsertBlastPushForm from "hooks/push-notification/useUpsertBlastPushForm";
import useFilePreview from "hooks/shared/useFilePreview";
import useRNCHelper from "hooks/shared/useRNCHelper";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { usePushNotifDetailQuery } from "services/modules/push-notif";

export const ubnRouteName = "blast/upsert";
const UpsertBlastNotif = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"DRAFT" | "normal">("normal");
  const { handleSelectChange } = useRNCHelper();
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const {
    register,
    errors,
    setFocus,
    isLoading,
    watch,
    handleUpsert,
    control,
    setValue,
    reset,
  } = useUpsertBlastPushForm(id, status);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const banner = watch("notification_image_url.image_link");
  const type = watch("type");
  const scheduleType = watch("schedule_type");
  const targetNotification = watch("target_notifications");
  const repeatType = watch("repeat_every");
  const language = watch("target_language");
  const gameType = watch("target_active_play_game_intensity_type");

  const [bannerPreview] = useFilePreview(
    typeof banner === "string" ? undefined : (banner as FileList)
  );
  const [optionType, setOptionType] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const [optionTimezone, setOptionTimezone] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const [optionRepeat, setOptionRepeat] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const [optionIntencity, setOptionIntencity] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (value === "all" && isChecked) {
      setDisabledOptions([
        "country",
        "city",
        "last_app_engagement",
        "language",
        "new_user",
        "active_playing_game",
      ]);
    } else if (value === "all" && !isChecked) {
      setDisabledOptions([]);
    }
  };
  const { data } = usePushNotifDetailQuery({ id: id! });
  useEffect(() => {
    if (id && data) {
      void reset({
        ...data,
        notification_image_url: {
          image_url: data?.notification_image_url,
          image_link: "",
        },
        recurring_days: data.recurring_days === null ? [] : data.recurring_days,
      });
    }
  }, [id, data]);
  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof BlastPushFormData;
    if (firstError) {
      setFocus(firstError);
      const element = errors[firstError]?.ref;
      if (element) {
        element?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors, setFocus]);

  useEffect(() => {
    const tempOpt = availableTypeNotification.map((item, i) => ({
      key: i,
      label: item.label,
      value: item.value,
    }));
    const tempTimezoneOpt = availableTimezone.map((item, i) => ({
      key: i,
      label: item.label,
      value: item.value,
    }));
    const tempRepeat = repeatOption.map((item, i) => ({
      key: i,
      label: item.label,
      value: item.value,
    }));
    const tempIntencity = intencityOption.map((item, i) => ({
      key: i,
      label: item.label,
      value: item.value,
    }));
    setOptionType(tempOpt);
    setOptionTimezone(tempTimezoneOpt);
    setOptionRepeat(tempRepeat);
    setOptionIntencity(tempIntencity);
  }, []);
  const handleCancelPopup = () => {
    setIsCancelPopupOpen(!isCancelPopupOpen);
  };

  const handleSavePopup = () => {
    setIsSavePopupOpen(!isSavePopupOpen);
  };

  return (
    <ContentContainer>
      <form onSubmit={handleUpsert}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl text-[#262626] font-bold">
            {`${id ? "Update" : "Create"} Blast Push Notification`}
          </h3>
          <div className="flex items-center justify-between gap-4 ml-4">
            <Button
              type="button"
              onClick={() => {
                void handleCancelPopup();
              }}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
            >
              Cancel
            </Button>
            <CancelPopUp
              isOpen={isCancelPopupOpen}
              data={"Create"}
              onClose={handleCancelPopup}
              onEdit={() => {
                navigate(-1);
                handleCancelPopup();
              }}
              menu={"Blast Push Notification"}
            />
            {!id ? (
              <Button
                type="button"
                onClick={() => {
                  void handleSavePopup();
                  setStatus("DRAFT");
                }}
                loading={isLoading}
                className="rounded-full px-6 py-2 bg-white text-seeds border border-seeds hover:bg-white/90"
              >
                Draft
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={() => {
                void handleSavePopup();
                setStatus("normal");
              }}
              loading={isLoading}
              className="rounded-full px-6 py-2 bg-seeds text-white hover:bg-seeds/90"
            >
              Save
            </Button>
            <SavePopUp
              isOpen={isSavePopupOpen}
              data={"Create"}
              onClose={handleSavePopup}
              onEdit={() => {
                setIsSavePopupOpen(false);
              }}
              menu={"Push Notification"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Notification Name<span className="text-red-600">*</span>
          </label>
          <CInput {...register("campaign_name")} error={errors.campaign_name} />
          <div
            className="
              text-sm text-[#3C49D6] font-normal mb-6"
          >
            *Maximal 50 Characters
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Notification Title
            <span className="text-red-600">*</span>
          </label>
          <CInput
            {...register("notification_title")}
            error={errors.notification_title}
          />
          <div
            className="
              text-sm text-[#3C49D6] font-normal mb-6"
          >
            *Maximal 50 Characters
          </div>
        </div>
        <div data-color-mode="light" className="flex flex-col gap-2">
          <label className="font-semibold">
            Notification Body
            <span className="text-red-600">*</span>
          </label>
          <Controller
            control={control}
            name="notification_body"
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
          <div
            className="
              text-sm text-[#3C49D6] font-normal mb-6"
          >
            *Maximal 250 Characters
          </div>
          <ValidationError error={errors?.notification_body} />
        </div>
        <div className="col-span-2">
          <h1 className="font-semibold text-base">Upload Image</h1>
          <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
            {bannerPreview ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={bannerPreview}
                alt=""
              />
            ) : data?.notification_image_url !== undefined &&
              data.notification_image_url.length > 0 ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-fill"
                src={data?.notification_image_url}
                alt=""
              />
            ) : (
              <div className="text-seeds">Choose your banner here</div>
            )}
            <FileInput
              {...register("notification_image_url.image_link")}
              size="sm"
              accept="image/*"
            />
          </div>
          <div className="text-sm text-[#3C49D6] font-normal mt-2">
            *Notification Image URL recommendation use picture type .png, .jpeg,
            dan .jpg
          </div>
        </div>
        <div className="flex flex-col gap-2 w-1/2 mt-4">
          <label className="font-semibold">
            Scheduling
            <span className="text-red-600">*</span>
          </label>
          <div className="col-span-2">
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <ReactSelect
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 5,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                  options={optionType}
                  value={optionType.find((item) => item.value === value)}
                  onChange={(e) => {
                    onChange(e?.value);
                    if (e?.value === "one_time_schedule") {
                      setValue("schedule_type", "now");
                    } else if (e?.value === "recurring") {
                      setValue("schedule_type", "daily");
                    }
                  }}
                />
              )}
            />
          </div>
          <ValidationError error={errors.type} />
        </div>
        {type === "one_time_schedule" && (
          <div className="py-4">
            <MInput<BlastPushFormData>
              label="Schedule Type"
              registerName="schedule_type"
              type="radio"
              data={oneTimeScheduledOption}
              select={scheduleType}
              setValue={setValue}
              handleSelectChange={handleSelectChange}
              errors={errors}
              register={register}
            />
          </div>
        )}
        {type === "recurring" && (
          <div className="py-4">
            <MInput<BlastPushFormData>
              label="Schedule Type"
              registerName="schedule_type"
              type="radio"
              data={recurringOption}
              select={scheduleType}
              setValue={setValue}
              handleSelectChange={handleSelectChange}
              errors={errors}
              register={register}
            />
          </div>
        )}
        {type === "one_time_schedule" && scheduleType === "scheduled" && (
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-1/2 gap-2">
              <label className="font-semibold">
                Started Time
                <span className="text-red-600">*</span>
              </label>
              <Controller
                control={control}
                name="temp_date"
                render={({ field: { value, onChange } }) => (
                  <CInput
                    type="datetime-local"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value);
                      setValue(
                        "date_started_at",
                        moment(value).utc(true).format("YYYY-MM-DD")
                      );
                      setValue(
                        "date_ended_at",
                        moment(value).utc(true).format("YYYY-MM-DD")
                      );
                      setValue(
                        "time_at",
                        moment(value).utc(true).format("HH:mm:ss")
                      );
                    }}
                    value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                    error={errors.date_started_at}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Timezone</label>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="scheduled_timezone"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelect
                      styles={{
                        control: (baseStyle) => ({
                          ...baseStyle,
                          padding: 5,
                          borderColor: "#BDBDBD",
                          borderRadius: "0.5rem",
                        }),
                      }}
                      options={optionTimezone}
                      value={optionTimezone.find(
                        (item) => item.value === value
                      )}
                      onChange={(e) => {
                        onChange(e?.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
        {type === "recurring" && scheduleType === "daily" && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">
                  Started Time
                  <span className="text-red-600">*</span>
                </label>
                <Controller
                  control={control}
                  name="temp_date"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value);
                        setValue(
                          "date_started_at",
                          moment(value).utc(true).format("YYYY-MM-DD")
                        );
                        setValue(
                          "time_at",
                          moment(value).utc(true).format("HH:mm:ss")
                        );
                      }}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">
                  End Time
                  <span className="text-red-600">*</span>
                </label>
                <Controller
                  control={control}
                  name="temp_endDate"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value);
                        setValue(
                          "date_ended_at",
                          moment(value).utc(true).format("YYYY-MM-DD")
                        );
                      }}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Timezone</label>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="scheduled_timezone"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelect
                      styles={{
                        control: (baseStyle) => ({
                          ...baseStyle,
                          padding: 5,
                          borderColor: "#BDBDBD",
                          borderRadius: "0.5rem",
                        }),
                      }}
                      options={optionTimezone}
                      value={optionTimezone.find(
                        (item) => item.value === value
                      )}
                      onChange={(e) => {
                        onChange(e?.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
        {type === "recurring" && scheduleType === "custom" && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">Repeat</label>
                <CInput
                  {...register("repeat_intensity")}
                  type="number"
                  error={errors.repeat_intensity}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">Every</label>
                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="repeat_every"
                    render={({ field: { onChange, value } }) => (
                      <ReactSelect
                        styles={{
                          control: (baseStyle) => ({
                            ...baseStyle,
                            padding: 5,
                            borderColor: "#BDBDBD",
                            borderRadius: "0.5rem",
                          }),
                        }}
                        options={optionRepeat}
                        value={optionRepeat.find(
                          (item) => item.value === value
                        )}
                        onChange={(e) => {
                          onChange(e?.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {repeatType === "weeks" && (
              <div className="flex flex-col">
                <label className="font-semibold">On which day</label>
                <div className="grid grid-cols-5 gap-4 py-4">
                  {daysOption.map((item, i) => (
                    <div
                      key={i + "recurring days"}
                      className="inline-flex gap-4"
                    >
                      <input
                        type="checkbox"
                        className="scale-150"
                        id={item.value}
                        value={item.value}
                        color="primary"
                        {...register("recurring_days")}
                      />
                      <p>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">
                  Started Time
                  <span className="text-red-600">*</span>
                </label>
                <Controller
                  control={control}
                  name="temp_date"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value);
                        setValue(
                          "date_started_at",
                          moment(value).utc(true).format("YYYY-MM-DD")
                        );
                        setValue(
                          "time_at",
                          moment(value).utc(true).format("HH:mm:ss")
                        );
                      }}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">
                  End Time
                  <span className="text-red-600">*</span>
                </label>
                <Controller
                  control={control}
                  name="temp_endDate"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value);
                        setValue(
                          "date_ended_at",
                          moment(value).utc(true).format("YYYY-MM-DD")
                        );
                      }}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Timezone</label>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="scheduled_timezone"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelect
                      styles={{
                        control: (baseStyle) => ({
                          ...baseStyle,
                          padding: 5,
                          borderColor: "#BDBDBD",
                          borderRadius: "0.5rem",
                        }),
                      }}
                      options={optionTimezone}
                      value={optionTimezone.find(
                        (item) => item.value === value
                      )}
                      onChange={(e) => {
                        onChange(e?.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-4">
          <label className="font-semibold">
            Target Notification
            <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-4 gap-4 py-4">
            {tergetNotificationOption.map((item, i) => (
              <div
                key={i + "target notif"}
                className="inline-flex gap-4 items-center"
              >
                <Controller
                  name={`target_notifications.${i}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="checkbox"
                      className="scale-150"
                      id={item.value}
                      value={item.value}
                      color="primary"
                      checked={targetNotification.includes(item.value)}
                      disabled={disabledOptions.includes(item.value)}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleCheckboxChange(e.target.value, e.target.checked);
                        if (e.target.checked) {
                          const newTarget = [
                            ...targetNotification.filter((e) => e),
                            e.target.value,
                          ];
                          if (e.target.value === "all") {
                            setValue("target_notifications", ["all"]);
                          } else {
                            setValue("target_notifications", newTarget);
                          }
                        } else {
                          const newTarget = targetNotification.filter(
                            (el) => el !== e.target.value
                          );
                          setValue("target_notifications", newTarget);
                        }
                      }}
                    />
                  )}
                />
                <p className="text-sm">{item.label}</p>
                <ValidationError error={errors?.target_notifications?.[i]} />
              </div>
            ))}
          </div>
        </div>
        {targetNotification.includes("country") && (
          <div className="flex flex-col mt-4">
            <label className="font-semibold">Select Country</label>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {countryOption.map((item, i) => (
                <div key={i + "country"} className="inline-flex gap-4">
                  <input
                    type="checkbox"
                    className="scale-150"
                    id={item.value}
                    value={item.value}
                    color="primary"
                    {...register("target_country")}
                  />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#3C49D6] font-normal mt-2">
              *Country Segmentation is Based on user country registration phone
              number
            </p>
          </div>
        )}
        {targetNotification.includes("last_app_engagement") && (
          <div className="mt-4">
            <label className="font-semibold">Last App Engagement</label>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">From</label>
                <Controller
                  control={control}
                  name="target_last_app_engagement_start"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">Till</label>
                <Controller
                  control={control}
                  name="target_last_app_engagement_end"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
            </div>
            <p className="text-sm text-[#3C49D6] font-normal mt-2">
              *Last App Engagement is based on last time user using app (Include
              Opening Seeds Mobile or Web App)
            </p>
          </div>
        )}
        {targetNotification.includes("language") && (
          <div className="mt-4">
            <MInput<BlastPushFormData>
              label="Language"
              registerName="target_language"
              type="radio"
              data={languageOption}
              select={language}
              setValue={setValue}
              handleSelectChange={handleSelectChange}
              errors={errors}
              register={register}
            />
            <p className="text-sm text-[#3C49D6] font-normal mt-2">
              *Languages Preferences is based on user language preference on
              Seeds Application
            </p>
          </div>
        )}
        {targetNotification.includes("new_user") && (
          <div className="mt-4">
            <label className="font-semibold">User Registration Period</label>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">From</label>
                <Controller
                  control={control}
                  name="target_new_user_start"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">Till</label>
                <Controller
                  control={control}
                  name="target_new_user_end"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
            </div>
            <p className="text-sm text-[#3C49D6] font-normal mt-2">
              *User Registration Period is based on user register on certain
              period
            </p>
          </div>
        )}
        {targetNotification.includes("active_playing_game") && (
          <div className="mt-4">
            <label className="font-semibold">Active Playing Game Period</label>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">From</label>
                <Controller
                  control={control}
                  name="target_active_play_game_start"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-light">Till</label>
                <Controller
                  control={control}
                  name="target_active_play_game_end"
                  render={({ field: { value, onChange } }) => (
                    <CInput
                      type="datetime-local"
                      onChange={onChange}
                      value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                      error={errors.date_started_at}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Choose Intencity</label>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="target_active_play_game_intensity_type"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelect
                      styles={{
                        control: (baseStyle) => ({
                          ...baseStyle,
                          padding: 5,
                          borderColor: "#BDBDBD",
                          borderRadius: "0.5rem",
                        }),
                      }}
                      options={optionIntencity}
                      value={optionIntencity.find(
                        (item) => item.value === value
                      )}
                      onChange={(e) => {
                        onChange(e?.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row mt-4 gap-4">
              <div className="flex flex-col w-1/2 gap-2">
                <label className="font-semibold">Frequency</label>
                <CInput
                  {...register("target_active_play_game_intensity_start")}
                  type="number"
                  error={errors.repeat_intensity}
                />
              </div>
              {gameType === "between" && (
                <div className="flex flex-col w-1/2 gap-2">
                  <label className="font-semibold">Until</label>
                  <CInput
                    {...register("target_active_play_game_intensity_end")}
                    type="number"
                    error={errors.repeat_intensity}
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-[#3C49D6] font-normal mt-2">
              *Active Playing Games is Based on Frequency Playing Game (Any
              Game) in Certain Period.
            </p>
          </div>
        )}
      </form>
    </ContentContainer>
  );
};

export default UpsertBlastNotif;
