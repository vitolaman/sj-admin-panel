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
  const schema = yup.object().shape({
    name_promo_code: yup.string().required("Quiz arena name cannot empty"),
    promo_code: yup
      .string()
      .matches(
        /^[A-Z0-9]+$/,
        "Promo code cannot contain lowercase letters or spaces"
      )
      .required("Promo Code name cannot empty"),
    start_date: yup
      .date()
      .required("Please input start date")
      .typeError("invalid date"),
    end_date: yup
      .date()
      .nullable()
      .min(yup.ref("start_date"), "End date must be after start date")
      .notRequired(),
    expired_date: yup.string().notRequired(),
    discount_amount: yup.number().when("discount_type", {
      is: "Nominal",
      then: yup.number().min(1, "Discount Amount cannot be zero").notRequired(),
      otherwise: yup
        .number()
        .max(9000000000000000000, "Discount Amount value over max limit")
        .notRequired(),
    }),
    discount_percentage: yup.number().when("discount_type", {
      is: "Percentage",
      then: yup
        .number()
        .min(1, "Discount Percentage cannot be zero")
        .notRequired(),
      otherwise: yup
        .number()
        .max(9000000000000000000, "Discount Percentage value over max limit")
        .notRequired(),
    }),
    min_transaction: yup
      .number()
      .max(9000000000000000000, "Min Transaction value over max limit")
      .required("Min Transaction cannot empty"),
    max_discount: yup.number().when("discount_type", {
      is: "Percentage",
      then: yup.number().min(1, "Max Discount cannot be zero").notRequired(),
      otherwise: yup
        .number()
        .max(9000000000000000000, "Max Discount value over max limit")
        .notRequired(),
    }),
    quantity: yup
      .number()
      .max(9000000000000000000, "Quota value over max limit")
      .required("Quota cannot empty"),
    type: yup.string().notRequired(),
    institution: yup.string().notRequired(),
    segment_user: yup.string().required("Segment User cannot empty"),
    ref_code: yup.string().notRequired(),
    discount_type: yup.string().required("Discount Type cannot empty"),
    description: yup.string().required("Description name cannot empty"),
    category: yup.string().notRequired(),
    min_exp: yup.number().notRequired(),
    tnc: yup
      .string()
      .matches(/^(?!<p><br><\/p>$).*/, "T&C cannot empty")
      .required("T&C cannot empty"),
    max_redeem: yup
      .number()
      .max(9000000000000000000, "Max Redeem value over max limit")
      .required("Max Redeem cannot empty"),
    is_active: yup.boolean().required("Status cannot empty"),
  });
  const defaultValues = {
    name_promo_code: "",
    promo_code: "",
    start_date: "",
    end_date: "",
    expired_date: "",
    type: "",
    institution: "",
    segment_user: "",
    ref_code: "",
    feature_ids: [],
    discount_type: "",
    description: "",
    category: "",
    min_exp: 0,
    max_redeem: 0,
    min_transaction: 0,
    tnc: "",
    is_active: "",
    is_expired: "",
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
    watch,
  } = useForm<PromoCodeFormDataI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const convertNumber = (value: string | number): number => {
    if (typeof value === "string") {
      return Number(value);
    } else {
      return value;
    }
  };
  const upsert = async (data: PromoCodeFormDataI) => {
    const startDateUtc = new Date(data?.start_date!).toISOString();
    const endDateUtc =
      data?.is_expired === "true"
        ? new Date(data?.end_date!).toISOString()
        : null;

    try {
      const payload: PromoCodeFormDataI = {
        ...data,
        start_date: startDateUtc,
        end_date: endDateUtc,
        expired_date: endDateUtc,
        discount_amount: convertNumber(data?.discount_amount!),
        discount_percentage: convertNumber(data?.discount_percentage!),
        min_transaction:
          data.is_transaction === "true"
            ? convertNumber(data?.min_transaction!)
            : 0,
        max_discount: convertNumber(data?.max_discount!),
        quantity: data.is_quota === "true" ? convertNumber(data?.quantity!) : 0,
        initial_quantity:
          data.is_quota === "true" ? convertNumber(data?.quantity!) : 0,
        min_exp: convertNumber(data?.min_exp!),
        max_redeem:
          data.is_redeem === "true" ? convertNumber(data?.max_redeem!) : 0,
      };
      delete payload.is_expired;
      delete payload.is_quota;
      delete payload.is_redeem;
      delete payload.is_transaction;
      if (data.id) {
        await updatePromoCode(payload).unwrap();
        toast.success("Updating a promo code was successful");
      } else {
        await createPromoCode(payload).unwrap();
        toast.success("Creating a promo code was successful");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpsert = handleSubmit(upsert);

  return {
    handleUpsert,
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
    watch,
  };
};

export default useUpsertCodeForm;
