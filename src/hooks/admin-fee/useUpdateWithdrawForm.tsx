import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useUpdateWithdrawalListMutation } from "services/modules/admin-fee";
import { AdminFeePayloadI } from "_interfaces/admin-fee.interfaces";

const useUpdateWithdrawForm = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateWithdrawFee, updateWithdrawFeeState] = useUpdateWithdrawalListMutation();

  const schema = yup.object().shape({
    id: yup.string().required(),
    admin_fee: yup.number().min(0).required(),
    promo_price: yup.number().min(0).required(),
    service_fee: yup.number().min(0).required(),
    is_priority: yup.bool(),
    is_promo_active: yup.bool(),
    status: yup.string(),
    promo_start_date: yup.string(),
    promo_end_date: yup.string(),
    max_promo_usage_per_month: yup.number().min(0),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
    setValue,
  } = useForm<AdminFeePayloadI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      admin_fee: 0,
      promo_price: 0,
      service_fee: 0,
      is_priority: true,
      is_promo_active: true,
      status: "displayed",
      promo_start_date: "",
      promo_end_date: "",
      max_promo_usage_per_month: 100,
    },
  });

  const update = async (data: AdminFeePayloadI) => {
    try {
      setIsLoadingUpdate(true);
      await updateWithdrawFee(data).unwrap();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleUpdate = handleSubmit(update);

  return {
    handleUpdate,
    register,
    errors,
    setFocus,
    control,
    isLoadingUpdate,
    watch,
    reset,
    setValue,
    updateWithdrawFeeState,
  };
};

export default useUpdateWithdrawForm;
