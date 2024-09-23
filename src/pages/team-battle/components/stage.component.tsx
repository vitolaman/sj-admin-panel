import { TeamBattleReq } from "_interfaces/team-battle.interface";
import MInput from "components/multi-input";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";

interface Props {
  watch: UseFormWatch<TeamBattleReq>;
  control: Control<TeamBattleReq, any>;
  errors: FieldErrors<TeamBattleReq>;
}

const StageForm = ({ control, watch, errors }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {watch("type") === "UNIKOM" && (
        <MInput<TeamBattleReq>
          label="Semifinal"
          type="number"
          registerName="semifinal_participant"
          placeholder="Amount Participant"
          control={control}
          watch={watch}
          errors={errors}
        />
      )}
      <MInput<TeamBattleReq>
        label="Final"
        type="number"
        registerName="final_participant"
        placeholder="Amount Participant"
        control={control}
        watch={watch}
        errors={errors}
      />
    </div>
  );
};

export default StageForm;
