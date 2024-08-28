import MDEditor, { commands } from "@uiw/react-md-editor";
import { MultiProps } from "_interfaces/multi-input.interfaces";
import CInput from "components/input";
import { quilFormats, quilModules } from "data/quil";
import CurrencyInput from "react-currency-input-field";
import { FileInput } from "react-daisyui";
import { Controller, FieldValues } from "react-hook-form";

import ReactQuill from "react-quill";

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
};

export default function MInput<T extends FieldValues>(props: MultiProps<T>) {
  const { label, registerName, errors, extraElement } = props;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          className={`font-semibold font-poppins text-base text-[#262626] ${
            props.type === "radio" || props.type === "checkbox"
              ? ""
              : "cursor-pointer"
          }`}
          htmlFor={`${label} label`}
        >
          {label}
        </label>
      )}
      <CommonInput {...props} />
      <NumberInput {...props} />
      <RadioInput {...props} />
      <MarkdownInput {...props} />
      <HtmlInput {...props} />
      <ImageInput {...props} />
      {extraElement}
      {errors && getNestedValue(errors, registerName) && (
        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
          {getNestedValue(errors, registerName)?.message}
        </p>
      )}
    </div>
  );
}

// List of component input

const CommonInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "text" || props.type === "datetime-local" ? (
    <CInput
      type={props.type}
      maxLength={props.maxLength}
      disabled={props.disabled}
      style={{
        fontWeight: "400",
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#201B1C",
      }}
      id={`${props.label} label`}
      placeholder={props.placeholder}
      className={props.className}
      {...props.register(props.registerName)}
    />
  ) : null;

const NumberInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "number" ? (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <CurrencyInput
          className="w-full font-poppins font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg px-4 py-[11px] disabled:cursor-not-allowed"
          intlConfig={{ locale: "id-ID" }}
          decimalsLimit={props.decimalsLimit ? props.decimalsLimit : 0}
          disableAbbreviations
          prefix={props.prefix}
          suffix={props.suffix}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={props.watch(props.registerName) ? value : ""}
          onValueChange={(val) => onChange(val)}
        />
      )}
    />
  ) : null;

const RadioInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "radio" || props.type === "checkbox" ? (
    <div className="flex gap-7 flex-wrap">
      {props.data?.map((value, index) => {
        const handleClick = () => {
          if (!props.disabled) {
            props.handleSelectChange(
              props.registerName,
              props.type === "radio"
                ? value.value
                : props.select === value.value
                ? value.falseValue
                : value.value
            );
            props.setValue(
              props.registerName,
              props.type === "radio"
                ? value.value
                : props.select === value.value
                ? value.falseValue
                : value.value
            );
          }
        };
        return (
          <div
            className={`flex items-center ${
              props.type === "radio" ? "gap-5" : "gap-3"
            }`}
            onClick={handleClick}
          >
            <input
              type={props.type}
              name={props.label}
              className={`${
                props.type === "radio"
                  ? "w-3 h-3 appearance-none checked:bg-[#3AC4A0] outline outline-2 outline-offset-2 checked:outline-[#3AC4A0] disabled:checked:outline-[#727272] disabled:checked:!bg-[#727272] outline-[#DADADA] rounded-full"
                  : "w-5 h-5 appearance-none rounded-md border-2 checked:border-none checked:bg-[#3AC4A0] disabled:checked:!bg-[#727272] relative after:checked:content-[' '] after:checked:absolute after:checked:w-2 after:checked:h-3 after:checked:border after:checked:border-white after:checked:border-t-0 after:checked:border-e-[3px] after:checked:border-b-[3px] after:checked:border-s-0 after:checked:rotate-45 after:checked:top-0.5 after:checked:left-1/2 after:checked:-translate-x-1/2 cursor-pointer"
              } ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={props.disabled}
              checked={props.select === value.value}
            />
            <label
              key={index}
              className={`font-normal font-poppins text-base ${
                props.disabled
                  ? "text-[#727272] cursor-not-allowed"
                  : props.select === value.value
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
  ) : null;

const MarkdownInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "md-rich-text" ? (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <div data-color-mode="light">
          <MDEditor
            id={`${props.label} label`}
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
  ) : null;

const HtmlInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "html-rich-text" ? (
    <div className="h-[200px]">
      <Controller
        control={props.control}
        name={props.registerName}
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
  ) : null;

const ImageInput = <T extends FieldValues>(props: MultiProps<T>) =>
  props.type === "image" ? (
    <>
      <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
        {props.imageURLPreview ? (
          <img
            className="flex mx-auto w-[500px] h-[166px] object-contain"
            src={props.imageURLPreview}
            alt="imageURLPreview"
            onClick={() => {
              if (props.isCrop && props.handleOpen) {
                props.handleOpen();
              }
            }}
          />
        ) : props.dataImage !== undefined ? (
          <img
            className="flex mx-auto w-[500px] h-[166px] object-contain"
            src={props.dataImage}
            alt=""
          />
        ) : (
          <div className="text-seeds">Choose your image here</div>
        )}
        <FileInput
          {...props.register(props.registerName)}
          size="sm"
          accept="image/*"
          className="w-full sm:w-fit"
        />
      </div>
    </>
  ) : null;
