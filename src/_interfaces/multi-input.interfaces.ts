import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Data {
  label: string;
  value: any
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
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  decimalsLimit?: number;
}

interface CheckboxIProps<T extends FieldValues> extends CommonProps<T> {
  type: "checkbox";
  labelCheckbox: string;
  value: any;
  register: UseFormRegister<T>;
  disabled?: boolean;
}

interface RadioIProps<T extends FieldValues> extends CommonProps<T> {
  type: "radio";
  data: Data[];
  register: UseFormRegister<T>;
  disabled?: boolean;
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
  isCrop?: boolean;
  handleOpen?: () => void;
  register: UseFormRegister<T>;
}

export type MultiProps<T extends FieldValues> =
  | CommonIProps<T>
  | NumberIProps<T>
  | CheckboxIProps<T>
  | RadioIProps<T>
  | MarkdownIProps<T>
  | HtmlIProps<T>
  | ImageIProps<T>;
