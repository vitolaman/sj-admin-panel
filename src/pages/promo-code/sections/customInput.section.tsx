import { PromoCodeInput } from "_interfaces/promo-code.interfaces";
import CInput from "components/input";

const CustomInput = ({
  label,
  type,
  maxLength,
  placeholder,
  extraElement,
}: PromoCodeInput) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      <CInput
        type={type}
        maxLength={maxLength}
        min={0}
        style={{
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#201B1C",
        }}
        id={`${label} label`}
        placeholder={placeholder}
      />
      {extraElement}
    </div>
  );
};

export default CustomInput;
