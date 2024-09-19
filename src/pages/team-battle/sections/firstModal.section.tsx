import {
  TeamBattleId,
  TeamBattleReq,
} from "_interfaces/team-battle.interface";
import MInput from "components/multi-input";
import { Dispatch, SetStateAction, useEffect } from "react";
import ButtonExpand from "./buttonExpand.section";
import { Dependency, useDisplay } from "../../../hooks/team-battle/useDisplay";
import ParticipantForm from "./participantForm.section";
import StageForm from "./stageForm.section";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Button } from "react-daisyui";
import PeriodeForm from "./periodeForm.section";
import useFilePreview from "hooks/shared/useFilePreview";

interface Props {
  data: TeamBattleId;
  register: UseFormRegister<TeamBattleReq>;
  errors: FieldErrors<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
  setValue: UseFormSetValue<TeamBattleReq>;
  control: Control<TeamBattleReq, any>;
  tmpImgArray: { new: string; cropped: string }[];
  setTmpNumber: Dispatch<SetStateAction<number | undefined>>;
  openInput: {
    participant: boolean;
    stage: boolean;
    sponsor: boolean;
    periode: boolean;
  };
  setOpenInput: Dispatch<
    SetStateAction<{
      participant: boolean;
      stage: boolean;
      sponsor: boolean;
      periode: boolean;
    }>
  >;
  handleOpen: (key: "sponsor" | "university" | "community") => void;
}

const FirstModal = ({
  data,
  register,
  errors,
  watch,
  setValue,
  control,
  tmpImgArray,
  setTmpNumber,
  openInput,
  setOpenInput,
  handleOpen,
}: Props) => {
  const imageURL = watch("banner");
  const [imageURLPreview] = useFilePreview(
    typeof imageURL === "string" ? undefined : (imageURL as FileList)
  );
  const {
    watchDependencies,
    participantDependencies,
    periodeDependencies,
    stageDependencies,
  } = Dependency(watch, errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sponsors",
  });
  const {
    fields: fieldsPrize,
    append: appendPrize,
    remove: removePrize,
  } = useFieldArray({
    control,
    name: "prize",
  });

  const handleExpand = (key: string, status: boolean) => {
    setOpenInput((prev) => ({
      ...prev,
      [key]: !status,
    }));
  };

  useEffect(() => {
    useDisplay(watch, setValue);
  }, watchDependencies);

  useEffect(() => {
    if (participantDependencies.some((error) => error !== undefined)) {
      handleExpand("participant", false);
    }
  }, participantDependencies);

  useEffect(() => {
    if (periodeDependencies.some((error) => error !== undefined)) {
      handleExpand("periode", false);
    }
  }, periodeDependencies);

  useEffect(() => {
    if (stageDependencies.some((error) => error !== undefined)) {
      handleExpand("stage", false);
    }
  }, stageDependencies);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10">
        <div className="flex flex-col gap-4 w-full md:w-6/12">
          <MInput<TeamBattleReq>
            label="Title"
            type="text"
            registerName="title"
            register={register}
            errors={errors}
            placeholder="Input Title"
            disabled={watch("id") === undefined ? false : true}
          />
          <MInput<TeamBattleReq>
            label="Open Balance"
            type="number"
            registerName="initial_balance"
            watch={watch}
            control={control}
            errors={errors}
            placeholder="Input Open Balance"
            prefix="Rp "
          />
          <MInput<TeamBattleReq>
            label="Min Participant"
            type="number"
            registerName="min_participant"
            control={control}
            watch={watch}
            errors={errors}
            placeholder="Input Min Participant"
          />
          <div className="flex gap-3 items-end">
            <MInput<TeamBattleReq>
              label="Participant"
              type="number"
              registerName="participant"
              control={control}
              watch={watch}
              errors={errors}
              disabled
            />
            <ButtonExpand
              status={openInput.participant}
              onClick={() => {
                handleExpand("participant", openInput.participant);
              }}
            />
          </div>
          {openInput.participant && (
            <ParticipantForm
              control={control}
              watch={watch}
              register={register}
              errors={errors}
            />
          )}
          <div className="flex gap-3">
            <MInput<TeamBattleReq>
              label="Stage Qualification"
              type="text"
              registerName="stage"
              register={register}
              errors={errors}
              disabled
            />
            <div className="mt-8">
              <ButtonExpand
                status={openInput.stage}
                onClick={() => {
                  handleExpand("stage", openInput.stage);
                }}
              />
            </div>
          </div>
          {openInput.stage && (
            <StageForm control={control} watch={watch} errors={errors} />
          )}
          <div className="flex gap-3 items-end">
            <MInput<TeamBattleReq>
              label="Sponsor Detail"
              type="text"
              registerName="sponsor"
              register={register}
              disabled
            />
            <ButtonExpand
              status={openInput.sponsor}
              onClick={() => {
                handleExpand("sponsor", openInput.sponsor);
              }}
            />
          </div>
          {openInput.sponsor && (
            <div className="flex flex-col gap-3">
              {fields.map((item, index) => {
                return (
                  <div className="flex gap-3" key={item.id}>
                    <div className="flex flex-col gap-3 w-full">
                      <MInput<TeamBattleReq>
                        label={`Sponsor ${index + 1}`}
                        type="text"
                        registerName={`sponsors.${index}.name`}
                        register={register}
                        errors={errors}
                        placeholder="Input Name"
                      />
                      <div
                        onClick={() => {
                          setTmpNumber(index);
                        }}
                      >
                        <MInput<TeamBattleReq>
                          type="image"
                          registerName={`sponsors.${index}.logo`}
                          register={register}
                          isCrop
                          handleOpen={() => handleOpen("sponsor")}
                          imageURLPreview={
                            tmpImgArray[index]?.cropped ??
                            tmpImgArray[index]?.new
                          }
                          dataImage={
                            watch("id")
                              ? (data?.sponsors?.[index]?.logo as string)
                              : undefined
                          }
                          extraElement={
                            <p className="font-poppins font-normal text-base text-[#201B1C]">
                              {watch("id")
                                ? "Upload image first then click to crop"
                                : "Click the image to crop"}
                            </p>
                          }
                          errors={errors}
                        />
                      </div>
                    </div>
                    <FiX
                      size={24}
                      color="#EF5350"
                      className={`${
                        fields.length === 1
                          ? "hidden cursor-not-allowed"
                          : "cursor-pointer"
                      } self-start w-1/12 min-w-[24px]`}
                      onClick={() => {
                        if (fields.length !== 1) {
                          remove(index);
                          tmpImgArray.splice(index, 1);
                        }
                      }}
                    />
                  </div>
                );
              })}
              <Button
                className="self-end w-fit border-none bg-[#3AC4A0] rounded-full text-white hover:bg-[#3AC4A0]"
                onClick={() => append({ name: "", logo: "" })}
              >
                Add other sponsor
              </Button>
            </div>
          )}
          <div className="flex gap-3 items-end">
            <MInput<TeamBattleReq>
              label="Periode Game"
              type="text"
              registerName="periode"
              register={register}
              disabled
            />
            <ButtonExpand
              status={openInput.periode}
              onClick={() => {
                handleExpand("periode", openInput.periode);
              }}
            />
          </div>
          {openInput.periode && (
            <PeriodeForm register={register} errors={errors} watch={watch} />
          )}
          <MInput<TeamBattleReq>
            label="Upload Banner"
            registerName="banner"
            type="image"
            register={register}
            imageURLPreview={imageURLPreview}
            dataImage={
              watch("id")
                ? (data?.banner as string) !== ""
                  ? (data?.banner as string)
                  : undefined
                : undefined
            }
            errors={errors}
          />
        </div>
        <div className="hidden md:block border border-[#9B9B9B]"></div>
        <div className="flex flex-col gap-4 md:gap-8 xl:gap-4 w-full md:w-6/12">
          <div className="flex flex-col gap-3">
            <p className="font-semibold font-poppins text-base text-[#262626]">
              Prize
            </p>
            {fieldsPrize.map((item, index) => {
              const numberWinner = index + 1;
              return (
                <div className="flex gap-3" key={item.id}>
                  <MInput<TeamBattleReq>
                    label={`${numberWinner}${
                      (numberWinner % 100 >= 11 && numberWinner % 100 <= 13) ||
                      numberWinner % 10 > 3
                        ? "th"
                        : numberWinner % 10 === 1
                        ? "st"
                        : numberWinner % 10 === 2
                        ? "nd"
                        : numberWinner % 10 === 3
                        ? "rd"
                        : "th"
                    }
                  Winner`}
                    type="number"
                    prefix="Rp "
                    registerName={`prize.${index}.amount`}
                    control={control}
                    watch={watch}
                    placeholder="Input Amount"
                    errors={errors}
                  />
                  <MInput<TeamBattleReq>
                    label="Description"
                    type="text"
                    registerName={`prize.${index}.description`}
                    register={register}
                    placeholder="Input detail prize"
                    errors={errors}
                  />
                  <FiX
                    size={24}
                    color="#EF5350"
                    className={`${
                      fieldsPrize.length <= 3
                        ? "hidden cursor-not-allowed"
                        : "cursor-pointer"
                    } self-start w-1/12 min-w-[24px]`}
                    onClick={() => {
                      if (fieldsPrize.length > 3) {
                        removePrize(index);
                      }
                    }}
                  />
                </div>
              );
            })}
            <Button
              className="self-end w-fit border-none bg-[#3AC4A0] rounded-full text-white hover:bg-[#3AC4A0]"
              onClick={() => appendPrize({ amount: 0, description: "" })}
            >
              Add other winners
            </Button>
          </div>

          <MInput<TeamBattleReq>
            registerName="tnc.id"
            label="Term and Condition (Indonesia)"
            type="html-rich-text"
            control={control}
            errors={errors}
          />
          <MInput<TeamBattleReq>
            registerName="tnc.en"
            label="Term and Condition (English)"
            type="html-rich-text"
            control={control}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
};

export default FirstModal;
