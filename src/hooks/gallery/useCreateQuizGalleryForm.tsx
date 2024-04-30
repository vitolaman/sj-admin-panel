import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateQuizGalleryPayload } from "_interfaces/quiz-gallery.interfaces";
import { useCreateQuizGalleryMutation } from "services/modules/gallery";
import { uploadFileGallery } from "services/modules/file-gallery";

const useCreateQuizGalleryForm = () => {
  const [upsertLoading, setIsLoading] = useState(false);
  const [createQuizGallery] = useCreateQuizGalleryMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    type: yup
      .string()
      .oneOf(["video", "image"], "Invalid type file")
      .required("Type is required"),
    gallery: yup.object().required("Please input file to gallery"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
  } = useForm<CreateQuizGalleryPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      type: "",
      url: "",
      gallery: {
        file_link: "",
        file_url: "",
      },
    },
  });

  const create = async (data: CreateQuizGalleryPayload) => {
    try {
      setIsLoading(true);
      const payload = {
        title: data.title,
        type: data.type,
        url: data.url,
        gallery: {
          file_link: data.gallery.file_link,
          file_url: data.gallery.file_url,
        },
      };

      if (data.gallery.file_link !== "") {
        try {
          const gallery = await uploadFileGallery(
            accessToken!,
            data.gallery.file_link[0] as File
          );
          payload.url = gallery;
        } catch (error) {
          errorHandler(error)
        }
      } else {
        throw new Error('URL is required.')
      }
      await createQuizGallery(payload).unwrap();
      reset();
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
    watch,
    setFocus,
    reset,
  };
};

export default useCreateQuizGalleryForm;
