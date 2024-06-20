import React, { useState } from "react";

export interface RadioSelectI {
  [key: string]: string | number | boolean | undefined |null;
}

const useRadioForm = () => {
  const [radioSelect, setRadioSelect] = useState<RadioSelectI>();
  const handleSelectChange = (
    field: keyof RadioSelectI,
    value: string | number | boolean | undefined |null
  ) => {
    setRadioSelect((prev) => ({ ...prev, [field]: value }));
  };

  return { radioSelect, setRadioSelect, handleSelectChange };
};

export default useRadioForm;
