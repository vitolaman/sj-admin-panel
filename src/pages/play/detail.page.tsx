import classNames from "classnames";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import Select from "components/select";
import { Loader } from "components/spinner/loader";
import { currencyOptions } from "data/currency";
import { availableCategories, subTypeCategories } from "data/play";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { useCancelPlayMutation, usePlayByIdQuery } from "services/modules/play";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { errorHandler } from "services/errorHandler";
import useUpdatePlayForm from "hooks/play/useUpdatePlayForm";
import { Controller } from "react-hook-form";
import CInput from "components/input";
import { PlayI } from "_interfaces/play.interfaces";
import ReactSelect, { GroupBase } from "react-select";
import { OptChild } from "_interfaces/admin-fee.interfaces";
import { useGetPaymentChannelQuery } from "services/modules/admin-fee";
import ValidationError from "components/validation/error";
import CurrencyInput from "components/currency-input";

export const pdRouteName = ":id/detail";
const PlayDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [enableEdit, setEnableEdit] = useState(false);
  const [paymentChannelOpt, setPaymentChannelOpt] = useState<
    GroupBase<OptChild>[]
  >([]);

  const { data, isLoading } = usePlayByIdQuery(params.id ?? "", {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const [cancelPlay, cancelPlayState] = useCancelPlayMutation();
  const { handleUpdate, register, errors, reset, control, setFocus } =
    useUpdatePlayForm(params.id!);
  const paymentChannelState = useGetPaymentChannelQuery(undefined);

  useEffect(() => {
    if (data?.play_time && data?.end_time) {
      const start = moment(data.play_time);
      const end = moment(data.end_time);
      const duration = moment.duration(end.diff(start));
      const days = Math.trunc(duration.asDays());
      const hours = Math.trunc(duration.asHours() - days * 24);
      const minutes = Math.trunc(
        duration.asMinutes() - (days * 24 + hours) * 60,
      );
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
    }
    if (paymentChannelState.data && data) {
      const tempOpt: GroupBase<OptChild>[] = [
        {
          label: "E-Wallet",
          options: paymentChannelState.data.type_ewallet.map((item) => ({
            label: item.payment_method,
            value: item.payment_method,
          })),
        },
        {
          label: "Bank",
          options: paymentChannelState.data.type_va.map((item) => ({
            label: item.payment_method,
            value: item.payment_method,
          })),
        },
        {
          label: "QRIS",
          options: paymentChannelState.data.type_qris.map((item) => ({
            label: item.payment_method,
            value: item.payment_method,
          })),
        },
      ];
      const selectedEWallet = paymentChannelState.data.type_ewallet.map(
        (item) => {
          if (
            (data.payment_method as string[])?.includes(item.payment_method)
          ) {
            return {
              label: item.payment_method,
              value: item.payment_method,
            };
          }
        },
      );
      const selectedBank = paymentChannelState.data.type_va.map((item) => {
        if ((data.payment_method as string[])?.includes(item.payment_method)) {
          return {
            label: item.payment_method,
            value: item.payment_method,
          };
        }
      });
      const selectedQris = paymentChannelState.data.type_qris.map((item) => {
        if ((data.payment_method as string[])?.includes(item.payment_method)) {
          return {
            label: item.payment_method,
            value: item.payment_method,
          };
        }
      });
      setPaymentChannelOpt(tempOpt);
      reset({
        ...data,
        payment_method: [...selectedEWallet, ...selectedBank, ...selectedQris],
        category: data?.all_category,
      });
    }
  }, [data]);

  const cancel = async () => {
    try {
      if (params.id) {
        await cancelPlay(params.id).unwrap();
        navigate(-1);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof PlayI;
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

  return isLoading ? (
    <Loader />
  ) : (
    <ContentContainer>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={cancel}
        alertType="warning"
        title="Are you sure want to cancel this play?"
        subTitle="This game will be cancel"
      />
      <form onSubmit={handleUpdate}>
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Play Arena Details
            </h3>
            <span
              className={classNames(
                data?.status === "ACTIVE"
                  ? "bg-[#DCFCE4] text-[#27A590]"
                  : data?.status === "OPEN"
                  ? "bg-[#FFF7D2] text-[#D89918]"
                  : data?.status === "PAST"
                  ? "bg-[#E9E9E9] text-[#7C7C7C]"
                  : data?.status === "CANCELED"
                  ? "bg-[#FFEBEB] text-[#BB1616]"
                  : "bg-[#EDFCD3] text-[#378D12]",
                "inline-flex items-center rounded px-2 py-1 text-sm",
              )}
            >
              {data?.status === "PUBLISH"
                ? "Published"
                : data?.status === "ACTIVE"
                ? "In Game"
                : data?.status === "PAST"
                ? "Ended"
                : data?.status === "OPEN"
                ? "Waiting"
                : data?.status === "CANCELED"
                ? "Cancelled"
                : "Published"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setIsOpen(true);
              }}
              loading={cancelPlayState.isLoading}
              type="button"
            >
              Cancel
            </Button>
            {enableEdit ? (
              <Button
                type="submit"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
                loading={cancelPlayState.isLoading}
              >
                Save
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
                onClick={() => {
                  setTimeout(() => {
                    setEnableEdit((prev) => !prev);
                  }, 400);
                }}
                loading={cancelPlayState.isLoading}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Type</label>
            <CInput
              {...register("type")}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">ID Play Arena</label>
            <CInput
              {...register("play_id")}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Promo Code</label>
            <CInput
              // value={data?.play_id}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Invitation Code</label>
            <CInput
              {...register("invitation_code")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Link Claim Reward</label>
            <CInput
              {...register("reward_url")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Social Media link</label>
            <CInput
              // value={data?.reward_url}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Play Arena Name</label>
            <CInput
              {...register("name")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-semibold">Category</label>
            <div className="grid grid-cols-6 gap-6">
              {availableCategories.map((category) => (
                <div
                  key={category}
                  className="inline-flex gap-4"
                >
                  <input
                    type="checkbox"
                    className="scale-150"
                    id={category}
                    value={category}
                    color="primary"
                    {...register("category")}
                    disabled={!enableEdit}
                  />
                  <p>{category}</p>
                </div>
              ))}
              {subTypeCategories.map((category) => (
                <div
                  key={category}
                  className="inline-flex gap-4"
                >
                  <input
                    type="checkbox"
                    className="scale-150"
                    id={category}
                    value={category}
                    color="primary"
                    {...register("raw_asset_sub_type")}
                    disabled={!enableEdit}
                  />
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-semibold text-base">Upload Banner</h1>
            <div className="w-full border-[#BDBDBD] border h-[200px] mt-2 rounded-lg flex flex-col text-center items-center justify-center p-10">
              <>
                <img
                  className="flex mx-auto w-[500px] h-[166px] object-fill"
                  src={data?.banner}
                  alt=""
                />
              </>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Sponsor Name</label>
            <CInput
              {...register("sponsorship.name")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Community Name</label>
            <CInput
              {...register("community.name")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Sponsor</label>
            <div className="w-full border-[#BDBDBD] border h-[200px] mt-2 rounded-lg flex flex-col text-center items-center justify-center p-10">
              <img
                className="flex mx-auto w-[150px] h-[150px] object-fill"
                src={data?.sponsorship?.image_url}
                alt="sponsor image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Community</label>
            <div className="w-full border-[#BDBDBD] border h-[200px] mt-2 rounded-lg flex flex-col text-center items-center justify-center p-10">
              <img
                className="flex mx-auto w-[150px] h-[150px] object-fill"
                src={data?.community?.image_url}
                alt="community image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Publish Time</label>
            <Controller
              control={control}
              name="publish_time"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  disabled={!enableEdit}
                  error={errors.publish_time}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Open Registration Time</label>
            <Controller
              control={control}
              name="open_registration_time"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  disabled={!enableEdit}
                  error={errors.open_registration_time}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Play Time</label>
            <Controller
              control={control}
              name="play_time"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  disabled={!enableEdit}
                  error={errors.play_time}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">End Time</label>
            <Controller
              control={control}
              name="end_time"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  disabled={!enableEdit}
                  error={errors.end_time}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Duration</label>
            <div className="grid grid-cols-3 gap-6">
              <CInput
                value={days}
                prefix="Days"
                disabled
              />
              <CInput
                value={hours}
                prefix="Hours"
                disabled
              />
              <CInput
                value={minutes}
                prefix="Minutes"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Admission Fee</label>
            <div className="grid grid-cols-3 gap-4">
              <Controller
                control={control}
                name="currency"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    options={currencyOptions}
                    disabled={!enableEdit}
                    onChange={(e) => onChange(e.value)}
                  />
                )}
              />
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="admission_fee"
                  render={({ field: { value, onChange } }) => (
                    <CurrencyInput
                      value={value}
                      onValueChange={(val) => onChange(val)}
                      disabled={!enableEdit}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Minimum Participant</label>
            <CInput
              {...register("min_participant")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Maximum Participant</label>
            <CInput
              {...register("max_participant")}
              disabled={!enableEdit}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Total Prize</label>
            <Controller
              control={control}
              name="prize_fix_amount"
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  value={value}
                  onValueChange={(val) => onChange(val)}
                  disabled={!enableEdit}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Winners</label>
            <div className="grid grid-cols-5">
              <div />
              <div className="text-center col-span-2">Fix Prize</div>
              <div className="text-center col-span-2">Prize Pool Money</div>
            </div>
            {data?.prize_fix_percentages.map((item, i) => (
              <div className="grid grid-cols-5 items-center gap-4">
                <div className="font-semibold text-sm">Winner {i + 1}</div>
                <div className="text-center col-span-2">
                  <Controller
                    control={control}
                    name={`prize_fix_percentages.${i}`}
                    render={({ field: { value, onChange } }) => (
                      <CurrencyInput
                        value={value}
                        onValueChange={(val) => onChange(val)}
                        disabled={!enableEdit}
                        error={errors.prize_fix_percentages?.[i]}
                      />
                    )}
                  />
                </div>
                <div className="text-center col-span-2">
                  <CInput
                    {...register(`prize_pool_percentages.${i}`)}
                    disabled={!enableEdit}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Payment Channel</label>
            <div className="col-span-2">
              <Controller
                control={control}
                name="payment_method"
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
                    isMulti
                    options={paymentChannelOpt}
                    value={value as GroupBase<OptChild>[]}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div />
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Opening Balance</label>
            <CInput
              {...register("opening_balance")}
              disabled={!enableEdit}
            />
          </div>
          {!enableEdit ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-end">
                <label className="font-semibold">List Participants</label>
                <a
                  onClick={() => {}}
                  className="block leading-6 text-seeds cursor-pointer"
                >
                  See More
                </a>
              </div>
              <div className="flex gap-2">
                {data?.participants?.map((item, index: number) => (
                  <img
                    key={index}
                    className="inline-block h-11 w-11 rounded-full"
                    src={item.photo_url}
                    alt=""
                  />
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}
          <div
            data-color-mode="light"
            className="flex flex-col gap-2"
          >
            <label className="font-semibold">
              Terms and Conditions (Indonesia)
            </label>
            <Controller
              control={control}
              name="tnc.id"
              render={({ field: { value, onChange } }) => (
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview={enableEdit ? "live" : "preview"}
                />
              )}
            />
          </div>
          <div
            data-color-mode="light"
            className="flex flex-col gap-2"
          >
            <label className="font-semibold">
              Terms and Conditions (English)
            </label>
            <Controller
              control={control}
              name="tnc.en"
              render={({ field: { value, onChange } }) => (
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={value}
                  onChange={onChange}
                  highlightEnable={false}
                  preview={enableEdit ? "live" : "preview"}
                />
              )}
            />
          </div>
          {!enableEdit ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Created At</label>
                <CInput
                  disabled
                  type="datetime-local"
                  value={moment(data?.created_at)
                    .utc(true)
                    .format("YYYY-MM-DD HH:mm")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Updated At</label>
                <CInput
                  disabled
                  type="datetime-local"
                  value={moment(data?.updated_at)
                    .utc(true)
                    .format("YYYY-MM-DD HH:mm")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Created By</label>
                <CInput
                  disabled
                  value={data?.created_by}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Updated By</label>
                <CInput
                  disabled
                  value={data?.updated_by}
                />
              </div>
            </>
          ) : null}
        </div>
      </form>
    </ContentContainer>
  );
};

export default PlayDetail;
