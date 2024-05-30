import {
  FieldErrors,
  FieldValues,
  Path,
  SetFieldValue,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  registerName: Path<T>;
  setValue: SetFieldValue<T>;
  errors: FieldErrors<T>;
  extraElement?: React.ReactNode;
  setLogic: React.Dispatch<React.SetStateAction<boolean>>;
  logic: boolean;
}

export default function FormCheckbox<T extends FieldValues>({
  label,
  registerName,
  setValue,
  extraElement,
  errors,
  logic,
  setLogic,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      <input type="checkbox" className="w-fit scale-150 m-2" onClick={()=>{setLogic(!logic)}} checked={logic} />
      {extraElement}
      <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
        {errors[registerName]?.message as string}
      </p>
    </div>
  );
}
