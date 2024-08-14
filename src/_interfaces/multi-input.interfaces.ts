import { SelectI } from "hooks/shared/useRNCHelper";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Data {
  label: string;
  value: string | number | boolean | null | undefined;
  falseValue?: string | number | boolean | null | undefined;
}

interface CommonProps<T extends FieldValues> {
  registerName: Path<T>;
  label?: string;
  errors?: FieldErrors<T>;
  extraElement?: React.ReactNode;
}

interface CommonIProps<T extends FieldValues> extends CommonProps<T> {
  type: "text" | "datetime-local";
  register: UseFormRegister<T>;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

interface NumberIProps<T extends FieldValues> extends CommonProps<T> {
  type: "number";
  watch: UseFormWatch<T>;
  control: Control<T, any>;
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  decimalsLimit?: number;
}

interface RadioIProps<T extends FieldValues> extends CommonProps<T> {
  type: "radio" | "checkbox";

  setValue: SetFieldValue<T>;
  handleSelectChange: (
    field: keyof SelectI,
    value: string | number | boolean | null | undefined
  ) => void;
  data: Data[];
  disabled?: boolean;
  select: string | number | boolean | null | undefined;
}
interface MarkdownIProps<T extends FieldValues> extends CommonProps<T> {
  type: "md-rich-text";
  control: Control<T, any>;
}
interface HtmlIProps<T extends FieldValues> extends CommonProps<T> {
  type: "html-rich-text";
  control: Control<T, any>;
}
interface ImageIProps<T extends FieldValues> extends CommonProps<T> {
  type: "image";
  imageURLPreview: string | undefined;
  dataImage?: string;
  isCrop?:boolean;
  handleOpen?:()=>void
  register: UseFormRegister<T>;
}

export type MultiProps<T extends FieldValues> =
  | CommonIProps<T>
  | NumberIProps<T>
  | RadioIProps<T>
  | MarkdownIProps<T>
  | HtmlIProps<T>
  | ImageIProps<T>;
