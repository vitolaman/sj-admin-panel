import { yupResolver } from "@hookform/resolvers/yup";
import { EventsFormDataI } from "_interfaces/events.interface";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { uploadFile } from "services/modules/file";
import { useAppSelector } from "store";
import { useNavigate } from "react-router-dom";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "services/modules/banner";
import { OpenAccountFromData } from "_interfaces/banner.interface";

const useUpsertOpenAccount = (id?: string) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [updateOpenAccount, updateState] = useUpdateBannerMutation();
  const [createOpenAccount, createState] = useCreateBannerMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const schema = yup.object().shape({
    name: yup.string().required("Name cannot empty"),
    external_url: yup
      .string()
      .required("Link cannot empty")
      .matches(/^https:\/\//, "Link must start with https://"),
    description: yup
      .string()
      .required("Description cannot empty")
      .max(1500, "Description cannot be more than 1500 characters"),
  });

  const defaultValues = {
    name: "",
    external_url: "",
    type: "open_account",
    title: "",
    description: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    trigger,
    watch,
    reset,
    setValue,
  } = useForm<OpenAccountFromData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async (data: OpenAccountFromData) => {
    try {
      const payload = {
        ...data,
        is_active: "",
        tnc: "",
        image_url: data.banner.image_url,
      };
      if (data.banner.image_link !== "") {
        const image_url = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.image_url = image_url;
      }
      await createOpenAccount(payload).unwrap();
      toast.success("Creating a event was successful");
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const update = async (data: OpenAccountFromData) => {
    try {
      const payload = {
        name: data.name,
        title: data.title,
        external_url: data.external_url,
        type: "open_account",
        description: data.description,
        is_active: "",
        tnc: "",
        image_url: data.banner.image_url,
        created_at: data.created_at,
        updated_at: new Date().toISOString(),
      };

      if (data.banner.image_link !== "") {
        const image_url = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.image_url = image_url;
      }
      if (id !== undefined) {
        await updateOpenAccount({ id: id, body: payload }).unwrap();
        toast.success("Updating a event was successful");
        navigate(-1);
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleUpdate = handleSubmit(update);
  const handleCreate = handleSubmit(create);
  return {
    handleCreate,
    handleUpdate,
    register,
    errors,
    control,
    loadingUpsert,
    trigger,
    watch,
    reset,
    setValue,
  };
};

export default useUpsertOpenAccount;
