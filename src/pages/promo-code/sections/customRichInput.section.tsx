import { PromoCodeInput } from "_interfaces/promo-code.interfaces";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomRichInput = ({ label }: PromoCodeInput) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
        htmlFor={`${label} label`}
      >
        {label}
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        id={`${label} label`}
      />
    </div>
  );
};

export default CustomRichInput;
