import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface SearchI {
  text: string;
}
const SearchInput = ({
  onSubmit,
  placeholder,
}: {
  onSubmit: (data: SearchI) => void;
  placeholder: string;
}) => {
  const { handleSubmit, register } = useForm<SearchI>({ mode: "onSubmit" });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border rounded-full items-center p-2"
    >
      <input
        type="text"
        className="outline-none"
        {...register("text")}
        placeholder={placeholder}
      />
      <FaSearch size={20} />
    </form>
  );
};

export default SearchInput;
