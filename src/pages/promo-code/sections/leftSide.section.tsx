import { useState } from "react";
import RadioInput from "./radioInput.section";
import { statusPromo } from "data/promo-code";
import CustomInput from "./customInput.section";
import CustomRichInput from "./customRichInput.section";

const LeftSide = () => {
  const [statusSelect, setStatusSelect] = useState<string>("");
  return (
    <div className="flex flex-col gap-4 w-full">
      <RadioInput
        label="Status"
        name="status"
        mapping={statusPromo}
        select={statusSelect}
        setSelect={setStatusSelect}
      />
      <div className="flex gap-4 w-full">
        <CustomInput label="Discount Percentage" type="datetime-local" />
        <CustomInput label="Max Discount" type="datetime-local" />
      </div>
      <CustomInput label="Description" type="string" />
      <CustomRichInput label="Term & Conditions"/>

    </div>
  );
};

export default LeftSide;
