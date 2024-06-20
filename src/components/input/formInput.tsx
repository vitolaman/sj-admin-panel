import CInput from "components/input";
import { RadioSelectI } from "hooks/shared/useRadioForm";
import {
  FieldErrors,
  FieldValues,
  Path,
  SetFieldValue,
  UseFormRegister,
} from "react-hook-form";

interface Data {
  label: string;
  value: string | number | boolean | null | undefined;
}

interface Props<T extends FieldValues> {
  label: string;
  registerName: Path<T>;
  errors?: FieldErrors<T>;
  register?: UseFormRegister<T>;
  setValue?: SetFieldValue<T>;
  data?: Data[];
  select?: string | number | boolean | null | undefined;
  handleSelectChange?: (
    field: keyof RadioSelectI,
    value: string | number | boolean | null | undefined
  ) => void;
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
  setValue,
  data,
  select,
  handleSelectChange,
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
        className={`font-semibold font-poppins text-base text-[#262626] ${
          type !== "radio" ? "cursor-pointer" : ""
        }`}
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      {(type === "text" || type === "number"||type==='datetime-local') && register && (
        <CInput
          type={type !== "number" ? type : "text"}
          maxLength={maxLength}
          disabled={disabled}
          inputMode={type !== "number" ? undefined : "numeric"}
          pattern={type !== "number" ? undefined : "[0-9]*"}
          style={{
            fontWeight: "400",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#201B1C",
          }}
          id={`${label} label`}
          placeholder={placeholder}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!/^\d*$/.test(e.key) && type === "number") {
              e.preventDefault();
            }
          }}
          {...register(registerName)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (type === "number") {
              register(registerName).onChange({
                target: {
                  value: /^\d*$/.test(e.target.value) && e.target.value,
                },
                type: e.type,
              });
            }
          }}
        />
      )}
      {type === "radio" && handleSelectChange && setValue && (
        <div className="flex gap-7 flex-wrap">
          {data?.map((value, index) => {
            return (
              <label
                key={index}
                onClick={() => {
                  if (!disabled) {
                    handleSelectChange(registerName, value.value);
                    setValue(registerName, value.value);
                  }
                }}
                htmlFor={value.label}
                className={`flex items-center gap-5 font-normal font-poppins text-base ${
                  disabled
                    ? "text-[#727272] cursor-not-allowed"
                    : select === value.value
                    ? "text-[#3AC4A0] cursor-pointer"
                    : "text-[#262626] cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  name={label}
                  className={`w-3 h-3 appearance-none checked:bg-[#3AC4A0] outline outline-2 outline-offset-2 checked:outline-[#3AC4A0] disabled:checked:outline-[#727272] disabled:checked:!bg-[#727272] outline-[#DADADA] rounded-full ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  id={value.label}
                  disabled={disabled}
                  checked={select === value.value}
                />
                {value.label}
              </label>
            );
          })}
        </div>
      )}
      {extraElement}
      <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
        {errors?.[registerName]?.message as string}
      </p>
    </div>
  );
}
