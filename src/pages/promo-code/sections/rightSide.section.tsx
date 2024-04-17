import { discountType } from "data/promo-code";
import { useState } from "react";
import CustomInput from "./customInput.section";
import RadioInput from "./radioInput.section";

const RightSide = () => {
  const [discountSelect, setDiscountSelect] = useState<string>("");
  return (
    <div className="flex flex-col gap-4 w-full">
      <CustomInput label="Title" type="string" />
      <CustomInput
        label="Promo Code"
        type="string"
        maxLength={10}
        extraElement={
          <p className="font-light font-poppins text-sm text-[#7C7C7C]">
            Max 10 character
          </p>
        }
      />
      <CustomInput label="Quota" type="number" />
      <RadioInput
        label="Discount Type"
        name="discount"
        mapping={discountType}
        select={discountSelect}
        setSelect={setDiscountSelect}
      />
      <div className="flex gap-4 w-full">
        {discountSelect === "Percentage" ? (
          <>
            <CustomInput
              label="Discount Percentage"
              type="number"
              placeholder="%"
            />
            <CustomInput label="Max Discount" type="number" placeholder="Rp" />
          </>
        ) : (
          <CustomInput
            label="Discount Nominal"
            type="number"
            placeholder="Rp"
          />
        )}
      </div>
      <CustomInput label="Max Redeem" type="number" />
      <CustomInput label="Min Transaction" type="number" />
    </div>
  );
};

export default RightSide;
