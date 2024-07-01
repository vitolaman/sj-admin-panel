import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateCategoryPayload } from "_interfaces/seeds-academy.interfaces";
import { useCreateCategoryMutation } from "services/modules/seeds-academy";
import { uploadFile } from "services/modules/file";

const useCreateSeedsAcademyForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dateNow = new Date();
  const schema = yup.object().shape({
    title: yup.string().required("Category name cannot be empty"),
    level: yup
      .array()
      .of(yup.string().required("Please input level"))
      .required("Levels are required"),
    about: yup.object().shape({
      id: yup
        .string()
        .min(10, "Min 10 characters")
        .required("Please input About"),
      en: yup
        .string()
        .min(10, "Min 10 characters")
        .required("Please input About"),
    }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
  } = useForm<CreateCategoryPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateCategoryPayload) => {
    try {
      console.log(data.banner, "abc");
      setIsLoading(true);
      const payload: any = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "PUBLISHED",
      };
      if (data.banner) {
        const banner = await uploadFile(accessToken!, data.banner[0] as File);
        payload.banner = banner;
      } else {
        payload.banner = "";
      }
      const response = await createCategory(payload).unwrap();
      navigate(
        `/seeds-academy/seeds-academy-list/create-class?id=${response.id}`
      );
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const draft = async (data: CreateCategoryPayload) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "DRAFTED",
      };
      const response = await createCategory(payload).unwrap();
      navigate(
        `/seeds-academy/seeds-academy-list/create-class?id=${response.id}`
      );
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = handleSubmit(create);
  const handleDraft = handleSubmit(draft);

  return {
    handleCreate,
    handleDraft,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
  };
};

export default useCreateSeedsAcademyForm;
