import {
  PromoCodeFormDataI,
  PromoCodeI,
} from "_interfaces/promo-code.interfaces";
import FormInput from "components/input/formInput";
import {
  discountType,
  minTransactionType,
  quotaType,
  redeemType,
} from "data/promo-code";
import { SelectI } from "hooks/shared/useRNCHelper";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
  register: UseFormRegister<PromoCodeFormDataI>;
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
  errors,
  promoCodeData,
  select,
  handleSelectChange,
  setValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 w-5/12">
      <FormInput<PromoCodeFormDataI>
        label="Title"
        type="text"
        registerName="name_promo_code"
        register={register}
        errors={errors}
        disabled={promoCodeData !== undefined ? true : false}
      />
      <FormInput<PromoCodeFormDataI>
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
      <FormInput<PromoCodeFormDataI>
        label="Quota Type"
        registerName="quantity"
        type="radio"
        data={quotaType}
        select={select?.quantity}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {select?.quantity !== 0 && select?.quantity && (
        <FormInput<PromoCodeFormDataI>
          label="Limit Quota"
          type="number"
          registerName="quantity"
          register={register}
          errors={errors}
        />
      )}
      <FormInput<PromoCodeFormDataI>
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
              <FormInput<PromoCodeFormDataI>
                label="Discount Percentage"
                registerName="discount_percentage"
                type="number"
                disabled={promoCodeData !== undefined}
                placeholder="%"
                register={register}
                errors={errors}
              />
              <FormInput<PromoCodeFormDataI>
                label="Max Discount"
                registerName="max_discount"
                type="number"
                disabled={promoCodeData !== undefined}
                placeholder="Rp"
                register={register}
                errors={errors}
              />
            </>
          ) : select?.discount_type === "Nominal" ? (
            <FormInput<PromoCodeFormDataI>
              label="Discount Nominal"
              registerName="discount_amount"
              type="number"
              disabled={promoCodeData !== undefined}
              placeholder="Rp"
              register={register}
              errors={errors}
            />
          ) : (
            <></>
          )}
        </div>
      )}
      <FormInput<PromoCodeFormDataI>
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
        <FormInput<PromoCodeFormDataI>
          label="Max Redeem"
          type="number"
          registerName="max_redeem"
          register={register}
          errors={errors}
        />
      )}
      <FormInput<PromoCodeFormDataI>
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
        <FormInput<PromoCodeFormDataI>
          label="Minimum Transaction"
          type="number"
          registerName="min_transaction"
          register={register}
          errors={errors}
        />
      )}
    </div>
  );
};

export default LeftFormModal;
