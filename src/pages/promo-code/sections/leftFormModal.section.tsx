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
import { RadioSelectI } from "hooks/shared/useRadioForm";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
  register: UseFormRegister<PromoCodeFormDataI>;
  errors: FieldErrors<PromoCodeFormDataI>;
  promoCodeData?: PromoCodeI;
  radioSelect: RadioSelectI | undefined;
  handleSelectChange: (
    field: keyof RadioSelectI,
    value: string | number | boolean | undefined | null
  ) => void;
  setValue: UseFormSetValue<PromoCodeFormDataI>;
}

const LeftFormModal = ({
  register,
  errors,
  promoCodeData,
  radioSelect,
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
        select={radioSelect?.quantity}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {radioSelect?.quantity !== 0 && radioSelect?.quantity && (
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
        select={radioSelect?.discount_type}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {radioSelect?.discount_type && (
        <div className="flex gap-4 w-full">
          {radioSelect?.discount_type === "Percentage" ? (
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
          ) : radioSelect?.discount_type === "Nominal" ? (
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
        select={radioSelect?.max_redeem}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {radioSelect?.max_redeem !== 0 && radioSelect?.max_redeem && (
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
        select={radioSelect?.min_transaction}
        setValue={setValue}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      {radioSelect?.min_transaction !== 0 && radioSelect?.min_transaction && (
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
