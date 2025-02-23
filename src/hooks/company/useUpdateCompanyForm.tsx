import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "services/modules/company";
import { toast } from "react-toastify";
import {
  UpdateCompanyForm,
  UpdateCompanyPayload,
} from "_interfaces/company.interfaces";
import { useNavigate } from "react-router-dom";

const useUpdateCompanyForm = (id: string) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateCompany] = useUpdateCompanyMutation();
  const { refetch } = useGetCompanyByIdQuery(id);
  const navigate = useNavigate();

  const dateNow = new Date();
  const schema = yup.object().shape({
    payment: yup.boolean().required("Payment status cannot be empty"),
    withdrawal: yup.boolean().required("Withdrawal status cannot be empty"),
    share: yup.number().required("Share cannot be empty"),
    share_percentage: yup.number().required("Share percentage cannot be empty"),
    plan_expiry_date: yup
      .date()
      .required("Please input ended time")
      .typeError("invalid date")
      .min(dateNow, "Ended time must be greater than now"),
    is_active: yup.boolean().required("Status cannot be empty"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<UpdateCompanyForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      share: 0,
      share_percentage: 0,
    },
  });

  const update = async (data: UpdateCompanyForm) => {
    try {
      setIsLoadingUpdate(true);
      const payload: UpdateCompanyPayload = {
        ...data,
        plan_sandbox_expiry_date: data.plan_expiry_date,
      };
      await updateCompany({ id, body: payload }).unwrap();
      toast("Company setting updated");
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingUpdate(false);
      refetch();
    }
  };

  const handleUpdate = handleSubmit(update);

  return {
    handleUpdate,
    register,
    errors,
    control,
    isLoadingUpdate,
    reset,
    watch
  };
};

export default useUpdateCompanyForm;
