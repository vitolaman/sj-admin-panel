import MDEditor, { commands } from "@uiw/react-md-editor";
import CInput from "components/input";
import { quilFormats, quilModules } from "data/quil";
import { SelectI } from "hooks/shared/useRNCHelper";
import { FileInput } from "react-daisyui";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  SetFieldValue,
  UseFormRegister,
} from "react-hook-form";
import ReactQuill from "react-quill";

interface Data {
  label: string;
  value: string | number | boolean | null | undefined;
  falseValue?: string | number | boolean | null | undefined;
}

interface Props<T extends FieldValues> {
  registerName: Path<T>;
  type: string;
  label?: string;
  errors?: FieldErrors<T>;
  register?: UseFormRegister<T>;
  setValue?: SetFieldValue<T>;
  control?: Control<T, any>;
  imageURLPreview?: string | undefined;
  dataImage?: string;
  data?: Data[];
  select?: string | number | boolean | null | undefined;
  handleSelectChange?: (
    field: keyof SelectI,
    value: string | number | boolean | null | undefined
  ) => void;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  extraElement?: React.ReactNode;
  className?: string;
}

export default function MInput<T extends FieldValues>({
  label,
  registerName,
  register,
  setValue,
  control,
  imageURLPreview,
  dataImage,
  data,
  select,
  handleSelectChange,
  type,
  maxLength,
  placeholder,
  extraElement,
  errors,
  disabled,
  className,
}: Props<T>) {
  const radioStyling =
    "w-3 h-3 appearance-none checked:bg-[#3AC4A0] outline outline-2 outline-offset-2 checked:outline-[#3AC4A0] disabled:checked:outline-[#727272] disabled:checked:!bg-[#727272] outline-[#DADADA] rounded-full";
  const checkboxStyling =
    "w-5 h-5 appearance-none rounded-md border-2 checked:border-none checked:bg-[#3AC4A0] relative after:checked:content-[' '] after:checked:absolute after:checked:w-2 after:checked:h-3 after:checked:border after:checked:border-white after:checked:border-t-0 after:checked:border-e-[3px] after:checked:border-b-[3px] after:checked:border-s-0 after:checked:rotate-45 after:checked:top-0.5 after:checked:left-1/2 after:checked:-translate-x-1/2 cursor-pointer";
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          className={`font-semibold font-poppins text-base text-[#262626] ${
            type === "radio" || type === "checkbox" ? "" : "cursor-pointer"
          }`}
          htmlFor={`${label} label`}
        >
          {label}
        </label>
      )}
      {(type === "text" || type === "number" || type === "datetime-local") &&
        register && (
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
            className={className}
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
      {(type === "radio" || type === "checkbox") &&
        handleSelectChange &&
        setValue && (
          <div className="flex gap-7 flex-wrap">
            {data?.map((value, index) => {
              const handleClick = () => {
                if (!disabled) {
                  handleSelectChange(
                    registerName,
                    type === "radio"
                      ? value.value
                      : select === value.value
                      ? value.falseValue
                      : value.value
                  );
                  setValue(
                    registerName,
                    type === "radio"
                      ? value.value
                      : select === value.value
                      ? value.falseValue
                      : value.value
                  );
                }
              };
              return (
                <div
                  className={`flex items-center ${
                    type === "radio" ? "gap-5" : "gap-3"
                  }`}
                  onClick={handleClick}
                >
                  <input
                    type={type}
                    name={label}
                    className={`${
                      type === "radio" ? radioStyling : checkboxStyling
                    } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={disabled}
                    checked={select === value.value}
                  />
                  <label
                    key={index}
                    className={`font-normal font-poppins text-base ${
                      disabled
                        ? "text-[#727272] cursor-not-allowed"
                        : select === value.value
                        ? "text-[#3AC4A0] cursor-pointer"
                        : "text-[#262626] cursor-pointer"
                    }`}
                  >
                    {value.label}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      {type === "md-rich-text" && (
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
      )}
      {type === "html-rich-text" && (
        <div className="h-[200px]">
          <Controller
            control={control}
            name={registerName}
            render={({ field: { value, onChange } }) => (
              <ReactQuill
                className="h-[109px] sm:h-[134px] md:h-[159px]"
                formats={quilFormats}
                modules={quilModules}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      )}
      {type === "image" && register && (
        <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
          {imageURLPreview ? (
            <img
              className="flex mx-auto w-[500px] h-[166px] object-fill"
              src={imageURLPreview}
              alt="imageURLPreview"
            />
          ) : data !== undefined ? (
            <img
              className="flex mx-auto w-[500px] h-[166px] object-fill"
              src={dataImage}
              alt=""
            />
          ) : (
            <div className="text-seeds">Choose your banner here</div>
          )}
          <FileInput
            {...register(registerName)}
            size="sm"
            accept="image/*"
            className="w-full sm:w-fit"
          />
        </div>
      )}
      {extraElement}
      {errors?.[registerName]?.message && (
        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
          {errors?.[registerName]?.message as string}
        </p>
      )}
    </div>
  );
}
