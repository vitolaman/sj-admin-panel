import CInput from "components/input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  extraElement?: React.ReactNode;
}

export default function FormInput<T extends FieldValues>({
  label,
  registerName,
  register,
  type,
  maxLength,
  placeholder,
  extraElement,
  errors,
  disabled,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      <CInput
        onWheel={(e) => {
          const target = e.target as HTMLInputElement;
          target.blur();
          e.stopPropagation();
          setTimeout(() => {
            target.focus();
          }, 0);
        }}
        type={type}
        maxLength={maxLength}
        min={0}
        disabled={disabled}
        style={{
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#201B1C",
        }}
        id={`${label} label`}
        placeholder={placeholder}
        {...register(registerName)}
      />
      {extraElement}
      <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
        {errors[registerName]?.message as string}
      </p>
    </div>
  );
}