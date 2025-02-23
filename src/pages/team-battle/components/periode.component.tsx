import { TeamBattleReq } from "_interfaces/team-battle.interface";
import MInput from "components/multi-input";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface Props {
  register: UseFormRegister<TeamBattleReq>;
  errors: FieldErrors<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
}

const PeriodeForm = ({ register, errors, watch }: Props) => {
  const dateValidation =
    watch("id") &&
    (watch("status") === "ENDED" || watch("status") === "CANCELED")
      ? true
      : false;
  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        <MInput<TeamBattleReq>
          label="Registration Start Date"
          type="datetime-local"
          registerName="registration_start"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
        <MInput<TeamBattleReq>
          label="Registration End Date"
          type="datetime-local"
          registerName="registration_end"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        <MInput<TeamBattleReq>
          label="Elimination Start Date"
          type="datetime-local"
          registerName="elimination_start"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
        <MInput<TeamBattleReq>
          label="Elimination End Date"
          type="datetime-local"
          registerName="elimination_end"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
      </div>
      {watch("type") === "UNIKOM" && (
        <div className="flex flex-col xl:flex-row gap-4 w-full">
          <MInput<TeamBattleReq>
            label="Semifinal Start Date"
            type="datetime-local"
            registerName="semifinal_start"
            register={register}
            errors={errors}
            disabled={dateValidation}
          />
          <MInput<TeamBattleReq>
            label="Semifinal End Date"
            type="datetime-local"
            registerName="semifinal_end"
            register={register}
            errors={errors}
            disabled={dateValidation}
          />
        </div>
      )}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        <MInput<TeamBattleReq>
          label="Final Start Date"
          type="datetime-local"
          registerName="final_start"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
        <MInput<TeamBattleReq>
          label="Final End Date"
          type="datetime-local"
          registerName="final_end"
          register={register}
          errors={errors}
          disabled={dateValidation}
        />
      </div>
    </>
  );
};

export default PeriodeForm;
