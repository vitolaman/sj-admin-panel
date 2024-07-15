import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { UpdateClassPayload } from "_interfaces/seeds-academy.interfaces";
import updateClass from "services/modules/seeds-academy/update";
import { uploadFile } from "services/modules/file";

interface UseCreateClassFormProps {
  levelName: string;
  categoryId: string | undefined;
  id: string;
  onSuccess: () => void;
}

const useUpdateClassForm = ({
  levelName,
  categoryId,
  id,
  onSuccess,
}: UseCreateClassFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    reset,
    watch,
    setValue,
  } = useForm<UpdateClassPayload>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      banner: {
        image_link: "",
        image_url: "",
      },
      module: {
        file_link: "",
        file_url: "",
      },
      quiz: {
        file_link: "",
        file_url: "",
      },
    },
  });

  const create = async (data: UpdateClassPayload) => {
    try {
      setIsLoading(true);
      let bannerReq = "";
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        bannerReq = banner;
      } else {
        bannerReq = "";
      }

      let moduleReq = "";
      if (data.module.file_link !== "") {
        const module = await uploadFile(
          accessToken!,
          data.module.file_link[0] as File
        );
        moduleReq = module;
      } else {
        moduleReq = "";
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description[id]", data.description.id);
      formData.append("description[en]", data.description.en);
      formData.append("module", moduleReq);
      formData.append("price", data.price);
      formData.append("level", levelName);
      formData.append("category_id", categoryId || "");
      formData.append("banner", bannerReq);
      formData.append("video", data.video);
      formData.append("quiz", data.quiz.file_link[0]);

      const response = await updateClass(accessToken!, id!, formData);
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
    reset,
    isLoading,
    watch,
    setValue,
  };
};

export default useUpdateClassForm;
