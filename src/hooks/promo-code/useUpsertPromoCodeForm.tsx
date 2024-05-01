import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { PromoCodeFormDataI } from "_interfaces/promo-code.interfaces";
import {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} from "services/modules/promo-code";
import { toast } from "react-toastify";

const useUpsertCodeForm = () => {
  const [updatePromoCode, updateState] = useUpdatePromoCodeMutation();
  const [createPromoCode, createState] = useCreatePromoCodeMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const isSuccess = createState.isSuccess || updateState.isSuccess;
  const dateNow = new Date();
  const schema = yup.object().shape({
    name_promo_code: yup.string().required("Quiz arena name cannot empty"),
    promo_code: yup.string().required("Promo Code name cannot empty"),
    start_date: yup
      .date()
      .min(dateNow, "Start Date must be greater than now")
      .required("Please input start date")
      .typeError("invalid date"),
    end_date: yup
      .date()
      .min(dateNow, "End Date must be greater than now")
      .required("Please input end date")
      .typeError("invalid date"),
    expired_date: yup.string().notRequired(),
    discount_amount: yup
      .number()
      .max(9000000000000000000, "Discount Amount value over max limit")
      .notRequired(),
    discount_percentage: yup
      .number()
      .max(9000000000000000000, "Discount Percentage value over max limit")
      .notRequired(),
    min_transaction: yup.number().min(1, "Min Transaction cannot empty"),
    max_discount: yup
      .number()
      .max(9000000000000000000, "Max Discount value over max limit")
      .notRequired(),
    quantity: yup
      .number()
      .max(9000000000000000000, "Quantity value over max limit")
      .required("Quota cannot empty"),
    type: yup.string().notRequired(),
    institution: yup.string().notRequired(),
    segment_user: yup.string().required("Segment User cannot empty"),
    ref_code: yup.string().notRequired(),
    discount_type: yup.string().required("Discount Type cannot empty"),
    description: yup.string().required("Description name cannot empty"),
    category: yup.string().notRequired(),
    min_exp: yup.number().notRequired(),
  });
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
    type: "",
    institution: "",
    segment_user: "",
    ref_code: "",
    feature_ids: [],
    discount_type: "",
    description: "",
    category: "",
    min_exp: 0,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setFocus,
    setValue,
    trigger,
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
        name_promo_code: data?.name_promo_code,
        promo_code: data?.name_promo_code,
        start_date: startDateUtc,
        end_date: endDateUtc,
        expired_date: endDateUtc,
        discount_amount:
          typeof data?.discount_amount === "string"
            ? Number(data?.discount_amount)
            : data?.discount_amount,
        discount_percentage:
          typeof data?.discount_percentage === "string"
            ? Number(data?.discount_percentage)
            : data?.discount_percentage,
        min_transaction:
          typeof data?.min_transaction === "string"
            ? Number(data?.min_transaction)
            : data?.min_transaction,
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
        ref_code: data?.ref_code,
        feature_ids: data?.feature_ids,
        discount_type: data?.discount_type,
        description: data?.description,
        category: data?.category,
        min_exp:
          typeof data?.min_exp === "string"
            ? Number(data?.min_exp)
            : data?.min_exp,
      };
      await updatePromoCode(payload).unwrap();
      toast.success("Updating a promo code was successful");
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
        discount_amount:
          typeof data?.discount_amount === "string"
            ? Number(data?.discount_amount)
            : data?.discount_amount,
        discount_percentage:
          typeof data?.discount_percentage === "string"
            ? Number(data?.discount_percentage)
            : data?.discount_percentage,
        min_transaction:
          typeof data?.min_transaction === "string"
            ? Number(data?.min_transaction)
            : data?.min_transaction,
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
        discount_type: data.discount_type,
        description: data.description,
        category: data.category,
        min_exp:
          typeof data?.min_exp === "string"
            ? Number(data?.min_exp)
            : data?.min_exp,
      };
      await createPromoCode(payload).unwrap();
      toast.success("Creating a promo code was successful");
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
    setValue,
    trigger,
    isSuccess,
  };
};

export default useUpsertCodeForm;
