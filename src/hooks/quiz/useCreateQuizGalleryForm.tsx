import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAppSelector } from "store";
import { CreateQuizGalleryPayload } from "_interfaces/quiz-gallery.interfaces";
import { useCreateQuizGalleryMutation } from "services/modules/quiz";
// import { uploadFile } from "services/modules/file";

const useCreateQuizGalleryForm = () => {
  const [upsertLoading, setIsLoading] = useState(false);
  const [createQuizGallery] = useCreateQuizGalleryMutation();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    type: yup
      .string()
      .oneOf(["video", "image"], "Invalid type file")
      .required("Type is required"),
    url: yup.string().required("Please input file url"),
  });

  const defaultValues = {
    title: "",
    type: "",
    url:""
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<CreateQuizGalleryPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  })

  const create = async (data: CreateQuizGalleryPayload) => {
    try {
      setIsLoading(true);
      await createQuizGallery(data).unwrap();
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
    control,
    upsertLoading,
    defaultValues,
    reset,
    watch
  };
};

export default useCreateQuizGalleryForm;
