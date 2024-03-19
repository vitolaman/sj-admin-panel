import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { ExclussiveBannerFormData } from "_interfaces/banner.interface";
import { useUpdateBannerMutation } from "services/modules/banner";
import { uploadFile } from "services/modules/file";

const useUpdateExclusiveBannerForm = (id: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [updateBanner] = useUpdateBannerMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Banner name cannot empty")
      .max(30, "Name cannot more than 30 char"),
    external_url: yup
      .string()
      .required("External URL cannot empty")
      .max(200, "External URL cannot more than 200 char"),
    banner: yup.object().required("Please input banner"),
    title: yup
      .string()
      .required("Title cannot empty")
      .max(30, "Title cannot more than 30 char"),
    description: yup
      .string()
      .required("Description cannot empty")
      .max(30, "Description cannot more than 200 char"),
    tnc: yup
      .string()
      .required("Terms and Condition cannot empty")
      .max(30, "Terms and Condition cannot more than 200 char"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
  } = useForm<ExclussiveBannerFormData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      banner: {
        image_link: "",
        image_url: "",
      },
    },
  });

  const create = async (data: ExclussiveBannerFormData) => {
    try {
      setIsLoading(true);
      const payload = {
        name: data.name,
        image_url: data.banner.image_url,
        external_url: data.external_url,
        is_active: "",
        type: "exclusive",
        title: data.title,
        description: data.description,
        tnc: data.tnc,
        created_at: data.created_at,
        updated_at: new Date().toISOString(),
      };
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.image_url = banner;
      }
      await updateBanner({ id, body: payload }).unwrap();
      navigate(-1);
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
    isLoadingUpdate: isLoading,
    watch,
    reset,
  };
};

export default useUpdateExclusiveBannerForm;
