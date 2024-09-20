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
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  register: UseFormRegister<PromoCodeFormDataI>;
  watch: UseFormWatch<PromoCodeFormDataI>;
  control: Control<PromoCodeFormDataI, any>;
  errors: FieldErrors<PromoCodeFormDataI>;
  promoCodeData?: PromoCodeI;
}

const LeftFormModal = ({
  register,
  watch,
  control,
  errors,
  promoCodeData,
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
        registerName="is_quota"
        type="radio"
        data={quotaType}
        register={register}
        errors={errors}
      />

      {watch("is_quota")==="true" && (
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
        register={register}
        errors={errors}
      />
      {watch("discount_type") && (
        <div className="flex gap-4 w-full">
          {watch("discount_type") === "Percentage" ? (
            <>
              <MInput<PromoCodeFormDataI>
                label="Discount Percentage"
                registerName="discount_percentage"
                type="number"
                disabled={promoCodeData !== undefined}
                suffix="%"
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
                prefix="Rp "
                placeholder="Rp"
                control={control}
                watch={watch}
                errors={errors}
              />
            </>
          ) : watch("discount_type") === "Nominal" ? (
            <MInput<PromoCodeFormDataI>
              label="Discount Nominal"
              registerName="discount_amount"
              type="number"
              disabled={promoCodeData !== undefined}
              prefix="Rp "
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
        registerName="is_redeem"
        type="radio"
        data={redeemType}
        register={register}
        errors={errors}
      />
      {watch("is_redeem")==="true" && (
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
        registerName="is_transaction"
        type="radio"
        data={minTransactionType}
        register={register}
        errors={errors}
      />
      {watch("is_transaction")==="true" && (
        <MInput<PromoCodeFormDataI>
          label="Minimum Transaction"
          type="number"
          registerName="min_transaction"
          prefix="Rp "
          control={control}
          watch={watch}
          errors={errors}
        />
      )}
    </div>
  );
};

export default LeftFormModal;
