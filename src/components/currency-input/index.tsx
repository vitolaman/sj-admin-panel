import ValidationError from "components/validation/error";
import { FieldError } from "react-hook-form/dist/types";
import Input from "react-currency-input-field";

type InputProps = {
  value?: string | number | readonly string[];
  onValueChange?: (value?: string) => void;
  error?: FieldError;
  disabled?: boolean;
};

const CurrencyInput = ({
  value,
  onValueChange,
  error,
  disabled = false,
}: InputProps) => {
  return (
    <div className="w-full">
      <Input
        className="input w-full input-bordered focus:outline-offset-0"
        decimalsLimit={0}
        prefix="Rp "
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
      <ValidationError error={error} />
    </div>
  );
};

export default CurrencyInput;
