import { TeamBattleReq } from "_interfaces/team-battle.interface";
import ReactSelect from "react-select";
import MInput from "components/multi-input";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { useLazyGetRegionListQuery } from "services/modules/team-battle";

interface Props {
  register: UseFormRegister<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
  control: Control<TeamBattleReq, any>;
  errors: FieldErrors<TeamBattleReq>;
}

const ParticipantForm = ({ register, control, watch, errors }: Props) => {
  const [getRegion, regionState] = useLazyGetRegionListQuery();
  const [regionList, setRegionList] = useState<
    { label: string; value: string }[]
  >([]);
  useEffect(() => {
    if (regionState.data) {
      setRegionList(
        regionState.data?.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  }, [regionState.data]);
  return (
    <>
      <MInput<TeamBattleReq>
        label="Public"
        type="number"
        registerName="public_max_participant"
        control={control}
        watch={watch}
        errors={errors}
        placeholder="Amount Participant"
      />
      {watch("type") === "UNIKOM" ? (
        <>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <MInput<TeamBattleReq>
              label="Community"
              type="number"
              registerName="community_max_participant"
              control={control}
              watch={watch}
              errors={errors}
              placeholder="Amount Participant"
            />
            <MInput<TeamBattleReq>
              label="Invitation Code"
              type="text"
              registerName="community_invitation_code"
              register={register}
              errors={errors}
              placeholder="Invitation Code"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <MInput<TeamBattleReq>
              label="University"
              type="number"
              registerName="university_max_participant"
              control={control}
              watch={watch}
              errors={errors}
              placeholder="Amount Participant"
            />
            <MInput<TeamBattleReq>
              label="Invitation Code"
              type="text"
              registerName="university_invitation_code"
              register={register}
              errors={errors}
              placeholder="Invitation Code"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <MInput<TeamBattleReq>
              label="Region"
              type="number"
              registerName="province_max_participant"
              control={control}
              watch={watch}
              errors={errors}
              placeholder="Amount Participant"
            />
            <MInput<TeamBattleReq>
              label="Invitation Code"
              type="text"
              registerName="province_invitation_code"
              register={register}
              errors={errors}
              placeholder="Invitation Code"
            />
          </div>
          <Controller
            control={control}
            name="province_ids"
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                  Select Region
                </label>
                <ReactSelect
                  isMulti
                  isClearable
                  isSearchable
                  options={regionList}
                  onInputChange={(value) => {
                    getRegion({ page: 1, limit: 10, search: value });
                  }}
                  value={value as any}
                  onChange={onChange}
                  styles={{
                    control: (baseStyle) => ({
                      ...baseStyle,
                      padding: 5,
                      borderColor: "#BDBDBD",
                      borderRadius: "0.5rem",
                    }),
                  }}
                />
                <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
                  {errors.province_ids?.message}
                </p>
              </div>
            )}
          />
        </>
      )}
    </>
  );
};

export default ParticipantForm;
