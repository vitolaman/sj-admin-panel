import ContentContainer from "components/container";
import Select from "components/select";
import { currencyOptions } from "data/currency";
import { availableCategories, subTypeCategories } from "data/play";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Controller } from "react-hook-form";
import CInput from "components/input";
import useCreatePlayForm from "hooks/play/useCreatePlayForm";
import { usePromoCodeQuery } from "services/modules/play";
import ReactSelect, { GroupBase } from "react-select";
import useDebounce from "hooks/shared/useDebounce";
import { CreatePlayFormI } from "_interfaces/play.interfaces";
import useFilePreview from "hooks/shared/useFilePreview";
import { OptChild } from "_interfaces/admin-fee.interfaces";
import { useGetPaymentChannelQuery } from "services/modules/admin-fee";

export const cpRouteName = "create";
const CreatePlay = () => {
  const navigate = useNavigate();

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [promoCodeList, setPromoCodeList] = useState<
    {
      label: string;
      data: string;
    }[]
  >([]);
  const [paymentChannelOpt, setPaymentChannelOpt] = useState<
    GroupBase<OptChild>[]
  >([]);

  const {
    handleCreate,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
  } = useCreatePlayForm();
  const promoCodeState = usePromoCodeQuery(debouncedSearchTerm);
  const banner = watch("banner");
  const community = watch("community.image_url");
  const sponsor = watch("sponsorship.image_url");
  const [bannerPreview] = useFilePreview(banner);
  const [communityPreview] = useFilePreview(community);
  const [sponsorPreview] = useFilePreview(sponsor);
  const paymentChannelState = useGetPaymentChannelQuery(undefined);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof CreatePlayFormI;
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
    if (promoCodeState.data?.data && promoCodeState.data.data.length > 0) {
      const newPromoCodeList = promoCodeState.data.data.map((item) => ({
        label: `${item.name_promo_code} - ${item.promo_code}`,
        data: item.id,
      }));
      setPromoCodeList(newPromoCodeList);
    }
  }, [promoCodeState.data]);

  useEffect(() => {
    if (paymentChannelState.data) {
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
      setPaymentChannelOpt(tempOpt);
    }
  }, [paymentChannelState.data]);

  return (
    <ContentContainer>
      <form onSubmit={handleCreate}>
        <div className="pb-6 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Play Arena Details
            </h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                navigate(-1);
              }}
              loading={isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={isLoading}
            >
              Save
            </Button>
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
            <label className="font-semibold">Promo Code</label>
            <Controller
              control={control}
              name="promo_id"
              render={({ field: { value, onChange } }) => (
                <ReactSelect
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 5,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                  options={promoCodeList}
                  isSearchable={true}
                  onInputChange={(e) => {
                    setSearch(e);
                  }}
                  isLoading={
                    promoCodeState.isLoading || promoCodeState.isFetching
                  }
                  value={promoCodeList.find((item) => item.data === value)}
                  onChange={(e) => onChange(e?.data)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Invitation Code</label>
            <CInput
              {...register("invitation_code")}
              error={errors.invitation_code}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Link Claim Reward</label>
            <CInput
              {...register("reward_url")}
              error={errors.reward_url}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Social Media link</label>
            <CInput
            // value={data?.reward_url}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Play Arena Name</label>
            <CInput
              {...register("name")}
              error={errors.name}
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
                    {...register("asset_sub_type")}
                  />
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <h1 className="font-semibold text-base">Upload Banner</h1>
            <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
              {bannerPreview ? (
                <img
                  className="flex mx-auto w-[500px] h-[166px] object-fill"
                  src={bannerPreview}
                  alt=""
                />
              ) : (
                <div className="text-seeds">Choose your banner here</div>
              )}
              <FileInput
                {...register("banner")}
                size="sm"
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Sponsor Name</label>
            <CInput
              {...register("sponsorship.name")}
              error={errors.sponsorship?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Community Name</label>
            <CInput
              {...register("community.name")}
              error={errors.community?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Sponsor</label>
            <div className="w-full border-[#BDBDBD] border gap-3 rounded-lg flex flex-col text-center items-center justify-center p-10">
              {sponsorPreview ? (
                <img
                  className="flex mx-auto w-[150px] h-[150px] object-fill"
                  src={sponsorPreview}
                  alt="sponsor image"
                />
              ) : (
                <div className="text-seeds">
                  Choose your sponsorship image here
                </div>
              )}
              <FileInput
                {...register("sponsorship.image_url")}
                size="sm"
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Community</label>
            <div className="w-full border-[#BDBDBD] border gap-3 rounded-lg flex flex-col text-center items-center justify-center p-10">
              {communityPreview ? (
                <img
                  className="flex mx-auto w-[150px] h-[150px] object-fill"
                  src={communityPreview}
                  alt="sponsor image"
                />
              ) : (
                <div className="text-seeds">
                  Choose your community image here
                </div>
              )}
              <FileInput
                {...register("community.image_url")}
                size="sm"
                accept="image/*"
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
                    onChange={(e) => onChange(e.value)}
                  />
                )}
              />
              <div className="col-span-2">
                <CInput
                  {...register("admission_fee")}
                  error={errors.admission_fee}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Minimum Participant</label>
            <CInput
              {...register("min_participant")}
              error={errors.min_participant}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Maximum Participant</label>
            <CInput
              {...register("max_participant")}
              error={errors.max_participant}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Total Prize</label>
            <CInput
              {...register("prize_fix_amount")}
              error={errors.prize_fix_amount}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Winners</label>
            <div className="grid grid-cols-5">
              <div />
              <div className="text-center col-span-2">Fix Prize</div>
              <div className="text-center col-span-2">Prize Pool Money</div>
            </div>
            {[0, 1, 2].map((item, i) => (
              <div className="grid grid-cols-5 items-center gap-4">
                <div className="font-semibold text-sm">Winner {i + 1}</div>
                <div className="text-center col-span-2">
                  <CInput
                    type="number"
                    {...register(`prize_fix_percentages.${i}`)}
                    error={errors.prize_fix_percentages?.[i]}
                  />
                </div>
                <div className="text-center col-span-2">
                  <CInput
                    type="number"
                    {...register(`prize_pool_percentages.${i}`)}
                    error={errors.prize_pool_percentages?.[i]}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Opening Balance</label>
            <CInput
              {...register("opening_balance")}
              error={errors.opening_balance}
            />
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
                  preview="live"
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
                  preview="live"
                />
              )}
            />
          </div>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreatePlay;
