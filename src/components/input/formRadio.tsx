import { FieldValues, Path, SetFieldValue } from "react-hook-form";

interface Data {
  label: string;
  value: string | number | boolean | undefined;
}

interface Props<T extends FieldValues> {
  label: string;
  registerName: Path<T>;
  setValue: SetFieldValue<T>;
  disabled?: boolean;
  data: Data[];
  select: string | number | boolean | undefined;
  setSelect: React.Dispatch<React.SetStateAction<string | number | boolean | undefined>>;
}

export default function RadioInput<T extends FieldValues>({
  label,
  registerName,
  setValue,
  disabled,
  data,
  select,
  setSelect,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold font-poppins text-base text-[#262626]">
        {label}
      </label>
      <div className="flex gap-7 flex-wrap">
        {data.map((value, index) => {
          return (
            <label
              key={index}
              onClick={() => {
                if (!disabled) {
                  setSelect(value.value);
                  setValue(registerName, value.value);
                }
              }}
              htmlFor={value.label}
              className={`flex gap-5 font-normal font-poppins text-base ${
                disabled
                  ? "text-[#727272] cursor-not-allowed"
                  : select === value.value
                  ? "text-[#007bff] cursor-pointer"
                  : "text-[#262626] cursor-pointer"
              }`}
            >
              <input
                type="radio"
                name={label}
                className={`w-6 h-6 ${
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
    </div>
  );
}
