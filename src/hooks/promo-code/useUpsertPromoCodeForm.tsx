import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { PromoCodeFormDataI } from "_interfaces/promo-code.interfaces";
import {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} from "services/modules/promo-code";

const useUpsertPromoCodeForm = () => {
  const [udpatePromoCode, updateState] = useUpdatePromoCodeMutation();
  const [createPromoCode, createState] = useCreatePromoCodeMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const schema = yup.object({}).required();

  const defaultValues = {
    name_promo_code: "",
    promo_code: "",
    start_date: "",
    end_date: "",
    expired_date: "",
    discount_amount: 0,
    discount_percentage: 0,
    min_transaction: 0,
    max_discount: 0,
    quantity: 0,
    type: "all",
    institution: "",
    segment_user: "",
    ref_code: "",
    feature_ids: [],
    spot: [],
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setFocus,
  } = useForm<PromoCodeFormDataI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const update = async (data: PromoCodeFormDataI) => {
    try {
      const startDateUtc = new Date(data?.start_date!).toISOString();
      const endDateUtc = new Date(data?.end_date!).toISOString();
      const payload: PromoCodeFormDataI = {
        id: data?.id,
        promo_code: data?.name_promo_code,
        name_promo_code: data?.name_promo_code,
        start_date: startDateUtc,
        end_date: endDateUtc,
        expired_date: endDateUtc,
        discount_amount: data?.discount_amount,
        discount_percentage:
          typeof data?.discount_percentage === "string"
            ? Number(data?.discount_percentage)
            : data?.discount_percentage,
        min_transaction: data?.min_transaction,
        max_discount:
          typeof data?.max_discount === "string"
            ? Number(data?.max_discount)
            : data?.max_discount,
        quantity:
          typeof data?.quantity === "string"
            ? Number(data?.quantity)
            : data?.quantity,
        type: data?.type,
        institution: data?.institution,
        segment_user: data?.segment_user,
        spot: data.spot,
      };
      await udpatePromoCode(payload);
    } catch (error) {
      errorHandler(error);
    }
  };

  const create = async (data: PromoCodeFormDataI) => {
    try {
      const startDateUtc = new Date(data?.start_date!).toISOString();
      const endDateUtc = new Date(data?.end_date!).toISOString();
      const payload: PromoCodeFormDataI = {
        name_promo_code: data.name_promo_code,
        promo_code: data.name_promo_code,
        start_date: startDateUtc,
        end_date: endDateUtc,
        expired_date: endDateUtc,
        discount_amount: data.discount_amount,
        discount_percentage:
          typeof data?.discount_percentage === "string"
            ? Number(data?.discount_percentage)
            : data?.discount_percentage,
        min_transaction: data.min_transaction,
        max_discount:
          typeof data?.max_discount === "string"
            ? Number(data?.max_discount)
            : data?.max_discount,
        quantity:
          typeof data?.quantity === "string"
            ? Number(data?.quantity)
            : data?.quantity,
        type: data.type,
        institution: data.institution,
        segment_user: data.segment_user,
        ref_code: data.ref_code,
        feature_ids: data.feature_ids,
        spot: data.spot,
      };
      await createPromoCode(payload);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdate = handleSubmit(update);
  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
    handleUpdate,
    register,
    errors,
    setFocus,
    reset,
    control,
    loadingUpsert,
    defaultValues,
  };
};

export default useUpsertPromoCodeForm;
