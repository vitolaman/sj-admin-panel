import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import {
  useCreateQuizCategoryMutation,
  useUpdateQuizCategoryMutation,
} from "services/modules/quiz";
import { CreateQuizCategoryI } from "_interfaces/quiz-category.interfaces";

const useUpsertQuizCategoryForm = () => {
  const [upsertLoading, setIsLoading] = useState(false);
  const [createQuizCategory] = useCreateQuizCategoryMutation();
  const [updateQuizCategory] = useUpdateQuizCategoryMutation();

  const schema = yup.object().shape({
    category_id: yup.string().required("Quiz category id cannot empty"),
    name: yup.string().required("Quiz category name cannot empty"),
    description: yup.object().shape({
      id: yup
        .string()
        .required("Indonesian quiz category description cannot empty"),
      en: yup
        .string()
        .required("English quiz category description cannot empty"),
    }),
  });

  const defaultValues = {
    name: "",
    category_id: "",
    description: {
      id: "",
      en: "",
    },
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateQuizCategoryI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async (data: CreateQuizCategoryI) => {
    try {
      setIsLoading(true);
      await createQuizCategory(data).unwrap();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data: CreateQuizCategoryI) => {
    try {
      setIsLoading(true);
      await updateQuizCategory({
        id: data.category_id,
        description: data.description,
      }).unwrap();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = handleSubmit(create);
  const handleUpdate = handleSubmit(update);

  return {
    handleCreate,
    handleUpdate,
    register,
    errors,
    control,
    upsertLoading,
    defaultValues,
    reset,
  };
};

export default useUpsertQuizCategoryForm;
