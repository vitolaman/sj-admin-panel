import ValidationError from "components/validation/error";
import { FieldError } from "react-hook-form/dist/types";
import Input from "react-currency-input-field";

type InputProps = {
  value?: string | number | readonly string[];
  onValueChange?: (value?: string) => void;
  error?: FieldError;
  disabled?: boolean;
  placeholder?: string;
};

const PercentageInput = ({
  value,
  onValueChange,
  error,
  disabled = false,
  placeholder,
}: InputProps) => {
  return (
    <div className="w-full">
      <Input
        className="input w-full input-bordered focus:outline-offset-0"
        decimalsLimit={2}
        suffix="%"
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        placeholder={placeholder ?? ""}
      />
      <ValidationError error={error} />
    </div>
  );
};

export default PercentageInput;
