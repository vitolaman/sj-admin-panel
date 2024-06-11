import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useUpdatePaymentListMutation } from "services/modules/admin-fee";
import { AdminFeePayloadI } from "_interfaces/admin-fee.interfaces";
import { useUpdateExpiryDateMutation } from "services/modules/company";
import { toast } from "react-toastify";

const useUpdateCompanyForm = (id?: string) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateExpiry, updateExpiryState] = useUpdateExpiryDateMutation();

  const schema = yup.object().shape({
    sandbox_expiration_date: yup.string().required(),
    production_expiration_date: yup.string().required(),
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
  } = useForm<{
    sandbox_expiration_date: string;
    production_expiration_date: string;
  }>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      sandbox_expiration_date: "",
      production_expiration_date: "",
    },
  });

  const update = async (data: {
    sandbox_expiration_date: string;
    production_expiration_date: string;
  }) => {
    try {
      setIsLoadingUpdate(true);
      await updateExpiry({
        sandbox_expiration_date: new Date(data.sandbox_expiration_date),
        production_expiration_date: new Date(data.production_expiration_date),
        id: id!,
      }).unwrap();
      toast("Expiration date updated");
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
    updateExpiryState,
  };
};

export default useUpdateCompanyForm;

