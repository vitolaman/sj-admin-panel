import MDEditor, { commands } from "@uiw/react-md-editor";
import { OptChild, PaymentChannelOpt } from "_interfaces/admin-fee.interfaces";
import { CreateQuizPayload } from "_interfaces/quiz.interfaces";
import ContentContainer from "components/container";
import CurrencyInput from "components/currency-input";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { optionQuestion } from "data/quiz";
import useCreateQuizForm from "hooks/quiz/useCreateQuizForm";
import useDebounce from "hooks/shared/useDebounce";
import useFilePreview from "hooks/shared/useFilePreview";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, FileInput } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactSelect, { GroupBase } from "react-select";
import { useGetPaymentChannelQuery } from "services/modules/admin-fee";
import { usePromoCodeQuery } from "services/modules/play";
import { useGetQuizCategoriesQuery } from "services/modules/quiz";

export const cqRouteName = "create";
const CreateQuiz = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [promoCodeList, setPromoCodeList] = useState<
    {
      label: string;
      data: string;
    }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [paymentChannelOpt, setPaymentChannelOpt] = useState<
    GroupBase<OptChild>[]
  >([]);
  const [optionCategory, setOptionCategory] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);

  const debouncedSearchTerm = useDebounce(search, 500);
  const promoCodeState = usePromoCodeQuery(debouncedSearchTerm);
  const paymentChannelState = useGetPaymentChannelQuery(undefined);
  const quizCategoryState = useGetQuizCategoriesQuery(undefined);

  const {
    handleCreate,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
  } = useCreateQuizForm();

  const banner = watch("banner.image_link");
  const community = watch("communities.image_link");
  const sponsor = watch("sponsors.image_link");
  const startTime = watch("started_at");
  const endTime = watch("ended_at");
  const [bannerPreview] = useFilePreview(banner as FileList);
  const [communityPreview] = useFilePreview(community as FileList);
  const [sponsorPreview] = useFilePreview(sponsor as FileList);

  useEffect(() => {
    if (quizCategoryState.data) {
      const tempOpt = quizCategoryState.data.data.map((item, i) => ({
        key: i,
        label: item.category_id,
        value: item.category_id,
      }));
      setOptionCategory(tempOpt);
    }
  }, [quizCategoryState.data]);

  useEffect(() => {
    const start = moment(startTime);
    const end = moment(endTime);
    const duration = moment.duration(end.diff(start));
    const d = Math.trunc(duration.asDays());
    const m = duration.asMinutes() - (d * 24 + hours) * 60;
    setDays(d);
    setHours(Math.trunc(duration.asHours() - d * 24));
    setMinutes(Math.ceil(m));
  }, [startTime, endTime]);

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
    const firstError = Object.keys(errors)[0] as keyof CreateQuizPayload;
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
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Category Quiz</label>
            <Controller
              control={control}
              name="category"
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
                  options={optionCategory}
                  value={optionCategory.find((item) => item.value === value)}
                  onChange={(e) => onChange(e?.value)}
                />
              )}
            />
            <ValidationError error={errors?.category} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">ID Quiz</label>
            <CInput disabled />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Quiz Name *</label>
            <CInput
              {...register("name")}
              error={errors.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Share Play Quiz Link</label>
            <CInput />
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
            <label className="font-semibold">Invitation Code Quiz</label>
            <CInput
              {...register("invitation_code")}
              error={errors.invitation_code}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Total Questions *</label>
            <Controller
              control={control}
              name="total_questions"
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
                  options={optionQuestion}
                  value={optionQuestion.find(
                    (item) => Number(item.value) === value,
                  )}
                  onChange={(e) => onChange(Number(e?.value))}
                />
              )}
            />
          </div>
          <div />
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
                {...register("banner.image_link")}
                size="sm"
                accept="image/*"
              />
            </div>
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
                {...register("sponsors.image_link")}
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
                {...register("communities.image_link")}
                size="sm"
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Publish Time</label>
            <Controller
              control={control}
              name="published_at"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  error={errors.published_at}
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
            <label className="font-semibold">Started Time</label>
            <Controller
              control={control}
              name="started_at"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  error={errors.started_at}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">End Time</label>
            <Controller
              control={control}
              name="ended_at"
              render={({ field: { value, onChange } }) => (
                <CInput
                  type="datetime-local"
                  onChange={onChange}
                  value={moment(value).utc(true).format("YYYY-MM-DD HH:mm")}
                  error={errors.ended_at}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Minimum Participant</label>
            <CInput
              type="number"
              {...register("min_participant")}
              error={errors.min_participant}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Maximum Participant</label>
            <CInput
              type="number"
              {...register("max_participant")}
              error={errors.max_participant}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Entrance Fee</label>
            <div className="col-span-2">
              <Controller
                control={control}
                name="admission_fee"
                render={({ field: { onChange, value } }) => (
                  <CurrencyInput
                    value={value}
                    onValueChange={(value) => onChange(value)}
                  />
                )}
              />
            </div>
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Lifeline</label>
            {[0, 1, 2].map((item, i) => (
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-semibold text-sm">Lifelines {i + 1}</div>
                <div className="text-center col-span-2">
                  <Controller
                    control={control}
                    name={
                      i === 0
                        ? `lifelines.0.price`
                        : i === 1
                        ? `lifelines.1.price`
                        : `lifelines.2.price`
                    }
                    render={({ field: { onChange, value } }) => (
                      <CurrencyInput
                        value={value}
                        onValueChange={(value) => onChange(value)}
                      />
                    )}
                  />
                  <ValidationError error={errors?.lifelines?.[i]?.price} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Winner</label>
            {[0, 1, 2].map((item, i) => (
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-semibold text-sm">Rank {i + 1}</div>
                <div className="text-center col-span-2">
                  <Controller
                    control={control}
                    name={`prizes.${i}`}
                    render={({ field: { onChange, value } }) => (
                      <CurrencyInput
                        value={value}
                        onValueChange={(value) => onChange(value)}
                      />
                    )}
                  />
                  <ValidationError error={errors?.prizes?.[i]} />
                </div>
              </div>
            ))}
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
            <ValidationError error={errors?.tnc?.id} />
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
            <ValidationError error={errors?.tnc?.en} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
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
      </form>
    </ContentContainer>
  );
};

export default CreateQuiz;
