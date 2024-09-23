import { TeamBattleReq } from "_interfaces/team-battle.interface";
import MInput from "components/multi-input";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  register: UseFormRegister<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
  control: Control<TeamBattleReq, any>;
  errors: FieldErrors<TeamBattleReq>;
}

const ParticipantForm = ({ register, control, watch, errors }: Props) => {
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
      )}
    </>
  );
};

export default ParticipantForm;
