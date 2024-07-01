import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateCategoryPayload } from "_interfaces/seeds-academy.interfaces";
import { useUpdateCategoryMutation } from "services/modules/seeds-academy";
import { uploadFile } from "services/modules/file";

const useUpdateSeedsAcademyForm = (id: string) => {
  const navigate = useNavigate();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateCategory] = useUpdateCategoryMutation();
  const { accessToken } = useAppSelector((state) => state.auth);


  const dateNow = new Date();
  const schema = yup.object().shape({
    title: yup.string().required("Category name cannot be empty"),
    banner: yup.string().required("Please input banner"),
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
    reset,
    setFocus,
    watch,
  } = useForm<CreateCategoryPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateCategoryPayload) => {
    try {
      setIsLoadingUpdate(true);
      const payload = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "PUBLISHED",
      };
      if (data.banner !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = banner;
      }
      await updateCategory({ id, body: payload }).unwrap();
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const draft = async (data: CreateCategoryPayload) => {
    try {
      setIsLoadingUpdate(true);
      const payload = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "DRAFTED",
      };
      if (data.banner !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = banner;
      }
      await updateCategory({ id, body: payload }).unwrap();
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleCreate = handleSubmit(create);
  const handleDraft = handleSubmit(draft);

  return {
    handleCreate,
    handleDraft,
    register,
    reset,
    errors,
    setFocus,
    control,
    isLoadingUpdate,
    watch,
  };
};

export default useUpdateSeedsAcademyForm;
