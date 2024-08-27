import {
  PromoCodeFormDataI,
  PromoCodeI,
} from "_interfaces/promo-code.interfaces";
import MInput from "components/multi-input/index";
import {
  discountType,
  minTransactionType,
  quotaType,
  redeemType,
} from "data/promo-code";
import { SelectI } from "hooks/shared/useRNCHelper";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  register: UseFormRegister<PromoCodeFormDataI>;
  watch: UseFormWatch<PromoCodeFormDataI>;
  control: Control<PromoCodeFormDataI, any>;
  errors: FieldErrors<PromoCodeFormDataI>;
  promoCodeData?: PromoCodeI;
  select: SelectI | undefined;
  handleSelectChange: (
    field: keyof SelectI,
    value: string | number | boolean | undefined | null
  ) => void;
  setValue: UseFormSetValue<PromoCodeFormDataI>;
}

const LeftFormModal = ({
  register,
  watch,
  control,
  errors,
  promoCodeData,
  select,
  handleSelectChange,
  setValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 w-5/12">
      <MInput<PromoCodeFormDataI>
        label="Title"
        type="text"
        registerName="name_promo_code"
        register={register}
        errors={errors}
        disabled={promoCodeData !== undefined ? true : false}
      />
      <MInput<PromoCodeFormDataI>
        label="Promo Code"
        registerName="promo_code"
        type="text"
        maxLength={20}
        extraElement={
          <p className="font-light font-poppins text-sm text-[#7C7C7C]">
            Max 20 character
          </p>
        }
        register={register}
        errors={errors}
        disabled={promoCodeData !== undefined ? true : false}
      />
      <MInput<PromoCodeFormDataI>
        label="Quota Type"
        registerName="initial_quantity"
        type="radio"
        data={quotaType}
        select={select?.initial_quantity}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {select?.initial_quantity !== 0 && select?.initial_quantity && (
        <MInput<PromoCodeFormDataI>
          label="Limit Quota"
          type="number"
          registerName="quantity"
          control={control}
          watch={watch}
          errors={errors}
        />
      )}
      <MInput<PromoCodeFormDataI>
        label="Discount Type"
        registerName="discount_type"
        type="radio"
        disabled={promoCodeData !== undefined}
        data={discountType}
        select={select?.discount_type}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {select?.discount_type && (
        <div className="flex gap-4 w-full">
          {select?.discount_type === "Percentage" ? (
            <>
              <MInput<PromoCodeFormDataI>
                label="Discount Percentage"
                registerName="discount_percentage"
                type="number"
                disabled={promoCodeData !== undefined}
                placeholder="%"
                control={control}
                watch={watch}
                errors={errors}
              />
              <MInput<PromoCodeFormDataI>
                label="Max Discount"
                registerName="max_discount"
                type="number"
                disabled={promoCodeData !== undefined}
                placeholder="Rp"
                control={control}
                watch={watch}
                errors={errors}
              />
            </>
          ) : select?.discount_type === "Nominal" ? (
            <MInput<PromoCodeFormDataI>
              label="Discount Nominal"
              registerName="discount_amount"
              type="number"
              disabled={promoCodeData !== undefined}
              placeholder="Rp"
              control={control}
              watch={watch}
              errors={errors}
            />
          ) : (
            <></>
          )}
        </div>
      )}
      <MInput<PromoCodeFormDataI>
        label="Redeem Type"
        registerName="max_redeem"
        type="radio"
        data={redeemType}
        select={select?.max_redeem}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {select?.max_redeem !== 0 && select?.max_redeem && (
        <MInput<PromoCodeFormDataI>
          label="Max Redeem"
          type="number"
          registerName="max_redeem"
          control={control}
          watch={watch}
          errors={errors}
        />
      )}
      <MInput<PromoCodeFormDataI>
        label="Minimum Transaction Type"
        registerName="min_transaction"
        type="radio"
        data={minTransactionType}
        select={select?.min_transaction}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {select?.min_transaction !== 0 && select?.min_transaction && (
        <MInput<PromoCodeFormDataI>
          label="Minimum Transaction"
          type="number"
          registerName="min_transaction"
          control={control}
          watch={watch}
          errors={errors}
        />
      )}
    </div>
  );
};

export default LeftFormModal;
