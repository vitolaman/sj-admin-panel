import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

interface SearchI {
  text: string;
}
const SearchInput = ({
  onSubmit,
  placeholder,
  formClassName,
  className,
  disabled
}: {
  onSubmit?: (data: SearchI) => void;
  placeholder: string;
  formClassName?: string;
  className?: string;
  disabled?:boolean
}) => {
  const { handleSubmit, register } = useForm<SearchI>({ mode: "onSubmit" });
  return (
    <form
      onSubmit={() => {
        if (onSubmit !== undefined) {
          handleSubmit(onSubmit);
        }
      }}
      className={`flex border rounded-full items-center p-2 ${formClassName}`}
    >
      <input
        type="text"
        className={`outline-none ${className}`}
        {...register("text")}
        placeholder={placeholder}
        disabled={disabled}
      />
      <MagnifyingGlassIcon
        className="w-6 h-6 text-[#262626] cursor-pointer"
        onClick={() => {
          if (onSubmit !== undefined) {
            handleSubmit(onSubmit);
          }
        }}
      />
    </form>
  );
};

export default SearchInput;
