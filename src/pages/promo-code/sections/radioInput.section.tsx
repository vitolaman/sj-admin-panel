import { PromoCodeRadio } from "_interfaces/promo-code.interfaces";

const RadioInput = ({
  label,
  name,
  mapping,
  select,
  setSelect,
}: PromoCodeRadio) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold font-poppins text-base text-[#262626]">
        {label}
      </label>
      <div className="flex gap-7">
        {mapping.map((value: string, index: number) => {
          return (
            <label
              onClick={() => {
                if (setSelect !== undefined) {
                  setSelect(value);
                }
              }}
              htmlFor={value}
              className={`flex gap-4 cursor-pointer font-normal font-poppins text-base ${
                select === value ? "text-[#007bff]" : "text-[#262626]"
              }`}
            >
              <input
                type="radio"
                name={name}
                className="w-6 h-6 cursor-pointer"
                id={value}
              />
              {value}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioInput;
