import { yupResolver } from "@hookform/resolvers/yup";
import { EventsFormDataI } from "_interfaces/events.interface";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import {
  useCreateEventsMutation,
  useUpdateEventsMutation,
} from "services/modules/events";
import { uploadFile } from "services/modules/file";
import { useAppSelector } from "store";
import { useNavigate } from "react-router-dom";

const useUpsertEvents = (id?: string) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [updateEvents, updateState] = useUpdateEventsMutation();
  const [createEvents, createState] = useCreateEventsMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const schema = yup.object().shape({
    name: yup.string().required("Name cannot empty"),
    external_url: yup
      .string()
      .required("Link cannot empty")
      .matches(/^https:\/\//, "Link must start with https://"),
    description: yup.string().required("Description cannot empty"),
    event_date: yup
      .date()
      .required("Please input event date")
      .typeError("invalid date"),
  });
  const defaultValues = {
    name: "",
    external_url: "",
    description: "",
    event_date: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch,
    reset
  } = useForm<EventsFormDataI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async (data: EventsFormDataI) => {
    try {
      const eventDateUtc = new Date(data?.event_date!).toISOString();
      const payload: EventsFormDataI = { ...data, event_date: eventDateUtc };
      if (data.image_url && data.image_url[0]) {
        const image_url = await uploadFile(
          accessToken!,
          data.image_url[0] as File
        );
        payload.image_url = image_url;
      } else {
        payload.image_url = "";
      }
      await createEvents(payload).unwrap();
      toast.success("Creating a event was successful");
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const update = async (data: EventsFormDataI) => {
    try {
      const eventDateUtc = new Date(data?.event_date!).toISOString();
      const payload: EventsFormDataI = { ...data, event_date: eventDateUtc };
      if (data.image_url && data.image_url[0]) {
        const image_url = await uploadFile(
          accessToken!,
          data.image_url[0] as File
        );
        payload.image_url = image_url;
      } else {
        payload.image_url = "";
      }
      if (id !== undefined) {
        await updateEvents({ id: id, body: payload }).unwrap();
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
    setValue,
    trigger,
    watch,
    reset
  };
};

export default useUpsertEvents;
