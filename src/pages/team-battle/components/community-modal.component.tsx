import { TeamBattleId, TeamBattleReq } from "_interfaces/team-battle.interface";
import MInput from "components/multi-input";
import { Dispatch, SetStateAction } from "react";
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
import { useGetRegionListQuery } from "services/modules/team-battle";

interface Props {
  data: TeamBattleId;
  register: UseFormRegister<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
  setValue: UseFormSetValue<TeamBattleReq>;
  errors: FieldErrors<TeamBattleReq>;
  control: Control<TeamBattleReq, any>;
  tmpImgArrayUniv: { new: string; cropped: string }[];
  tmpImgArrayCom: { new: string; cropped: string }[];
  setTmpNumber: Dispatch<SetStateAction<number | undefined>>;
  handleOpen: (key: "sponsor" | "university" | "community") => void;
}

const SecondModal = ({
  data,
  register,
  setValue,
  watch,
  errors,
  control,
  tmpImgArrayUniv,
  tmpImgArrayCom,
  setTmpNumber,
  handleOpen,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "university",
  });
  const {
    fields: fieldsCommunity,
    append: appendCommunity,
    remove: removeCommunity,
  } = useFieldArray({
    control,
    name: "community",
  });
  const { data: regionData } = useGetRegionListQuery({});
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10">
      {watch("type") === "UNIKOM" ? (
        <>
          <div className="flex flex-col gap-4 w-full md:w-6/12">
            <div className="flex flex-col gap-3">
              {fields.map((item, index) => {
                return (
                  <div className="flex gap-3" key={item.id}>
                    <div
                      className="flex flex-col gap-3 w-full"
                      onClick={() => {
                        setTmpNumber(index);
                      }}
                    >
                      <MInput<TeamBattleReq>
                        label={`University ${index + 1}`}
                        type="text"
                        registerName={`university.${index}.name`}
                        register={register}
                        placeholder="Input Name"
                        errors={errors}
                      />

                      <MInput<TeamBattleReq>
                        type="image"
                        registerName={`university.${index}.logo`}
                        register={register}
                        isCrop
                        handleOpen={() => handleOpen("university")}
                        imageURLPreview={
                          tmpImgArrayUniv[index]?.cropped ??
                          tmpImgArrayUniv[index]?.new
                        }
                        dataImage={
                          watch("id")
                            ? (data?.groups?.filter(
                                (item) => item.type === "UNIVERSITY"
                              )[index]?.logo as string)
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
                          tmpImgArrayUniv.splice(index, 1);
                        }
                      }}
                    />
                  </div>
                );
              })}
              <Button
                className="self-end w-fit border-none bg-[#3AC4A0] rounded-full text-white hover:bg-[#3AC4A0]"
                onClick={() =>
                  append({ name: "", logo: "", type: "UNIVERSITY" })
                }
              >
                Add other university
              </Button>
            </div>
          </div>
          <div className="hidden md:block border border-[#9B9B9B]"></div>
          <div className="flex flex-col gap-4 md:gap-8 xl:gap-4 w-full md:w-6/12">
            <div className="flex flex-col gap-3">
              {fieldsCommunity.map((item, index) => {
                return (
                  <div className="flex gap-3" key={item.id}>
                    <div
                      className="flex flex-col gap-3 w-full"
                      onClick={() => {
                        setTmpNumber(index);
                      }}
                    >
                      <MInput<TeamBattleReq>
                        label={`Community ${index + 1}`}
                        type="text"
                        registerName={`community.${index}.name`}
                        register={register}
                        placeholder="Input Name"
                        errors={errors}
                      />

                      <MInput<TeamBattleReq>
                        type="image"
                        registerName={`community.${index}.logo`}
                        register={register}
                        isCrop
                        handleOpen={() => handleOpen("community")}
                        imageURLPreview={
                          tmpImgArrayCom[index]?.cropped ??
                          tmpImgArrayCom[index]?.new
                        }
                        dataImage={
                          watch("id")
                            ? (data?.groups?.filter(
                                (item) => item.type === "COMMUNITY"
                              )[index]?.logo as string)
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
                    <FiX
                      size={24}
                      color="#EF5350"
                      className={`${
                        fieldsCommunity.length === 1
                          ? "hidden cursor-not-allowed"
                          : "cursor-pointer"
                      } self-start w-1/12 min-w-[24px]`}
                      onClick={() => {
                        if (fieldsCommunity.length !== 1) {
                          removeCommunity(index);
                          tmpImgArrayCom.splice(index, 1);
                        }
                      }}
                    />
                  </div>
                );
              })}
              <Button
                className="self-end w-fit border-none bg-[#3AC4A0] rounded-full text-white hover:bg-[#3AC4A0]"
                onClick={() =>
                  appendCommunity({ name: "", logo: "", type: "COMMUNITY" })
                }
              >
                Add other community
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold font-poppins text-base text-[#262626]">
              Select Region
            </p>
            <div
              className="bg-[#DCFCE4] text-persian-green border-none font-normal text-sm font-poppins px-2 rounded-full cursor-pointer"
              onClick={() =>
                setValue(
                  "province_ids",
                  regionData?.data.map((item) => item.id)!
                )
              }
            >
              Select All
            </div>
          </div>
          <div className="flex flex-col gap-3 max-h-[250px] overflow-auto px-3">
            {regionData?.data.map((item) => (
              <MInput<TeamBattleReq>
                type="checkbox"
                labelCheckbox={item.name}
                value={item.id}
                registerName="province_ids"
                register={register}
                errors={errors}
              />
            ))}
          </div>
          {errors && (
        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
          {errors.province_ids?.message}
        </p>
      )}
        </div>
      )}
    </div>
  );
};

export default SecondModal;
