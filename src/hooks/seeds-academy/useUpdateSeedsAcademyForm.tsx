import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import {
  CreateCategoryPayload,
  CreateCategoryReq,
} from "_interfaces/seeds-academy.interfaces";
import { useUpdateCategoryMutation } from "services/modules/seeds-academy";
import { uploadFile } from "services/modules/file";

const useUpdateSeedsAcademyForm = (id: string) => {
  const navigate = useNavigate();
  const [updateCategory] = useUpdateCategoryMutation();
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
    reset,
    setFocus,
    watch,
  } = useForm<CreateCategoryPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      banner: {
        image_link: "",
        image_url: "",
      },
    },
  });

  const create = async (data: CreateCategoryPayload) => {
    try {
      const payload = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "DRAFTED",
        banner: data.banner.image_url,
      };
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = banner;
      } else {
        payload.banner = "";
      }
      await updateCategory({ id, body: payload }).unwrap();
      navigate(
        `/seeds-academy/seeds-academy-list/create-class?id=${id}`
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  const draft = async (data: CreateCategoryPayload) => {
    try {
      const payload = {
        ...data,
        published_at: dateNow.toISOString(),
        status: "DRAFTED",
        banner: data.banner.image_url,
      };
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = banner;
      } else {
        payload.banner = "";
      }
      await updateCategory({ id, body: payload }).unwrap();
      navigate(
        `/seeds-academy/seeds-academy-list/create-class?id=${id}`
      );
    } catch (error) {
      errorHandler(error);
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
    watch,
  };
};

export default useUpdateSeedsAcademyForm;
