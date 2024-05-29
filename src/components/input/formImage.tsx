import { FileInput } from "react-daisyui";
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
  imageURLPreview: string | undefined;
  data?:string
}
export default function FormImage<T extends FieldValues>({
  label,
  registerName,
  register,
  errors,
  imageURLPreview,
  data
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
        {imageURLPreview ? (
          <img
            className="flex mx-auto w-[500px] h-[166px] object-fill"
            src={imageURLPreview}
            alt="imageURLPreview"
          />
        ) :data !== undefined ? (
          <img
            className="flex mx-auto w-[500px] h-[166px] object-fill"
            src={data}
            alt=""
          />
        ): (
          <div className="text-seeds">Choose your banner here</div>
        )}
        <FileInput {...register(registerName)} size="sm" accept="image/*" className="w-full sm:w-fit" />
      </div>
      <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
        {errors[registerName]?.message as string}
      </p>
    </div>
  );
}
