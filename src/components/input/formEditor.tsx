import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T, any>;
  registerName: Path<T>;
  label: string;
  errors: FieldErrors<T>;
}

export default function FormEditor<T extends FieldValues>({
  control,
  registerName,
  label,
  errors,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={`${label} label`}
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={registerName}
        render={({ field: { value, onChange } }) => (
          <div data-color-mode="light">
            <MDEditor
              id={`${label} label`}
              height={200}
              commands={[...commands.getCommands()]}
              value={value}
              onChange={onChange}
              highlightEnable={false}
              preview="live"
            />
          </div>
        )}
      />
      <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
        {errors[registerName]?.message as string}
      </p>
    </div>
  );
}
