import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateSubcriptionPayload } from "_interfaces/seeds-academy.interfaces";
import { useEditSubscriptionMutation } from "services/modules/seeds-academy";

interface UseCreateSubcriptionFormProps {
  onSuccess: () => void;
  id: string;
}
const useUpdateSubcriptionForm = ({
  onSuccess,
  id,
}: UseCreateSubcriptionFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editSubcription] = useEditSubscriptionMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dateNow = new Date();
  const schema = yup.object().shape({
    price: yup.number().required("Category name cannot be empty"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    setValue,
    watch,
    reset,
  } = useForm<CreateSubcriptionPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateSubcriptionPayload) => {
    try {
      setIsLoading(true);
      const response = await editSubcription({ id, body: data }).unwrap();
      onSuccess();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    setValue,
    watch,
    reset,
  };
};

export default useUpdateSubcriptionForm;
