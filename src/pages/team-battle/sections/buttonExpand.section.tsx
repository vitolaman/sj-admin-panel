import { FiChevronDown } from "react-icons/fi";

interface Props{
    status:boolean;
    onClick:()=>void;
}

const ButtonExpand = ({status,onClick}:Props) => {
  return (
    <div className="border w-fit h-fit p-3 border-[#BDBDBD] rounded-lg cursor-pointer" onClick={onClick}>
      <FiChevronDown
        size={22}
        className={`transition-all ${status ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );
};

export default ButtonExpand;
