import { PromoCodeFormDataI, PromoCodeI } from "_interfaces/promo-code.interfaces";
import FormInput from "components/input/formInput";
import FormRadio from "components/input/formRadio";
import { discountType } from "data/promo-code";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
  register: UseFormRegister<PromoCodeFormDataI>;
  errors: FieldErrors<PromoCodeFormDataI>;
  promoCodeData?: PromoCodeI;
  discountSelect: string | number | boolean | undefined;
  setDiscountSelect: React.Dispatch<
    React.SetStateAction<string | number | boolean | undefined>
  >;
  setValue: UseFormSetValue<PromoCodeFormDataI>;
}

const LeftFormModal = ({
  register,
  errors,
  promoCodeData,
  discountSelect,
  setDiscountSelect,
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
        disabled={promoCodeData !==undefined ? true : false}
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
        disabled={promoCodeData !==undefined ? true : false}
      />
      <FormInput<PromoCodeFormDataI>
        label="Quota"
        type="number"
        registerName="quantity"
        register={register}
        errors={errors}
      />
      <FormRadio<PromoCodeFormDataI>
        label="Discount Type"
        registerName="discount_type"
        disabled={promoCodeData !==undefined}
        data={discountType}
        select={discountSelect}
        setSelect={setDiscountSelect}
        setValue={setValue}
        errors={errors}
      />
      <div className="flex gap-4 w-full">
        {discountSelect === "Percentage" ? (
          <>
            <FormInput<PromoCodeFormDataI>
              label="Discount Percentage"
              registerName="discount_percentage"
              type="number"
              disabled={promoCodeData !==undefined}
              placeholder="%"
              register={register}
              errors={errors}
            />
            <FormInput<PromoCodeFormDataI>
              label="Max Discount"
              registerName="max_discount"
              type="number"
              disabled={promoCodeData !==undefined}
              placeholder="Rp"
              register={register}
              errors={errors}
            />
          </>
        ) : discountSelect === "Nominal" ? (
          <FormInput<PromoCodeFormDataI>
            label="Discount Nominal"
            registerName="discount_amount"
            type="number"
            disabled={promoCodeData !==undefined}
            placeholder="Rp"
            register={register}
            errors={errors}
          />
        ) : (
          <></>
        )}
      </div>
      <FormInput<PromoCodeFormDataI>
        label="Max Redeem"
        type="number"
        registerName="max_redeem"
        register={register}
        errors={errors}
      />
      <FormInput<PromoCodeFormDataI>
        label="Min Transaction"
        type="number"
        registerName="min_transaction"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default LeftFormModal;
