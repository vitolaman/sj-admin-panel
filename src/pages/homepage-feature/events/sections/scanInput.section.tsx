import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "react-daisyui";
import { useForm } from "react-hook-form";

interface ScanI {
  text: string;
}
const ScanInput = ({
  onSubmit,
  placeholder,
  formClassName,
  className,
  disabled,
  value
}: {
  onSubmit?: (data: ScanI) => void;
  placeholder: string;
  formClassName?: string;
  className?: string;
  disabled?: boolean;
  value:string
}) => {
  const { handleSubmit, register } = useForm<ScanI>({ mode: "onSubmit" });
  return (
    <>
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
          value={value}
        />
      </form>
      <Button
        className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full lg:px-10 font-semibold font-poppins md:text-base text-sm"
        onClick={() => {
          if (onSubmit !== undefined) {
            handleSubmit(onSubmit);
          }
        }}
      >
        Enter
      </Button>
    </>
  );
};

export default ScanInput;
