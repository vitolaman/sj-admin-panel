import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateClassPayload } from "_interfaces/seeds-academy.interfaces";
import { useCreateClassMutation } from "services/modules/seeds-academy";
import { uploadFile } from "services/modules/file";

interface UseCreateClassFormProps {
  levelName: string;
  categoryId: string | undefined;
  onSuccess: any
}

const useCreateClassForm = ({
  levelName,
  categoryId,
  onSuccess,
}: UseCreateClassFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createClass] = useCreateClassMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    title: yup.string().required("Title name cannot be empty"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    setValue,
  } = useForm<CreateClassPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const create = async (data: CreateClassPayload) => {
    try {
      setIsLoading(true);
      let banner = ''
      if (data.banner) {
         banner = await uploadFile(accessToken!, data.banner[0] as File);
      }
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description[id]", data.description.id);
      formData.append("description[en]", data.description.en);
      formData.append("module", data.module);
      formData.append("price[idr]", data.price.idr);
      formData.append("level", levelName);
      formData.append("category_id", categoryId || "");
      formData.append("banner", banner);
      formData.append("video", data.video);
      formData.append("quiz", data.quiz instanceof File ? data.quiz : "");

      const response = await fetch(
        `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/class`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
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
    watch,
    setValue,
  };
};

export default useCreateClassForm;
