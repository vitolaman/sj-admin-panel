import { useState } from "react";

export interface SelectI {
  [key: string]: string | number | boolean | undefined | null;
}

const useRNCHelper = () => {
  const [select, setSelect] = useState<SelectI>();
  const handleSelectChange = (
    field: keyof SelectI,
    value: string | number | boolean | undefined |null
  ) => {
    setSelect((prev) => ({ ...prev, [field]: value }));
  };

  return { select, setSelect, handleSelectChange };
};

export default useRNCHelper;
