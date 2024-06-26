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
import { RootState, useAppSelector } from "store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatusState } from "store/events/statusSlice";
import { useEffect } from "react";

const useUpsertEvents = (id?: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [updateEvents, updateState] = useUpdateEventsMutation();
  const [createEvents, createState] = useCreateEventsMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const { isPaidEvent } = useSelector((state: RootState) => state?.isPaid ?? {});
  const { isStatusEvent } = useSelector((state: RootState) => state?.isStatus ?? {});
  const schema = (
    yup.object().shape({
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
      event_status: yup.string().required("Status cannot empty"),
      location_name: yup.string().required("Location cannot empty"),
      ended_at: yup
        .date()
        .when('event_status', {
          is: 'ONLINE',
          then: yup
            .date()
            .required("Please input event date")
            .typeError("Invalid date")
            .test(
              "is-same-date",
              "End date must be on the same day as start date",
              function (value) {
                const { event_date } = this.parent;
                if (!event_date || !value) return true;
                return (
                  event_date.getFullYear() === value.getFullYear() &&
                  event_date.getMonth() === value.getMonth() &&
                  event_date.getDate() === value.getDate()
                );
              }
            )
            .test(
              "is-after-start-date",
              "End date must be after start date",
              function (value) {
                const { event_date } = this.parent;
                if (!event_date || !value) return true;
                return value > event_date;
              }
            ),
          otherwise: yup.date().nullable().notRequired(),
        })
    })
  );
  const defaultValues = {
    name: "",
    external_url: "",
    description: "",
    event_date: "",
    // ended_at: "",
    location_name: "",
    event_status: isStatusEvent ?? "OFFLINE"
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm<EventsFormDataI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    setValue('event_status', isStatusEvent)
    if (isStatusEvent === "OFFLINE") {
      setValue('ended_at', null)
    }
  }, [isStatusEvent])

  const create = async (data: EventsFormDataI) => {
    try {
      const eventDateUtc = new Date(data?.event_date!).toISOString();
      const payload: EventsFormDataI = { 
        ...data, 
        event_status: isStatusEvent, 
        event_date: eventDateUtc
      };
      if (data.ended_at && (isStatusEvent === "ONLINE")) {
        const endedAtUtc = new Date(data?.ended_at!).toISOString();
        payload.ended_at = endedAtUtc;
      } else {
        delete payload.ended_at;
      }
      if (isPaidEvent) {
        payload.event_price = parseFloat(payload.id as string)
      }
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
    } finally {
      dispatch(setStatusState("OFFLINE"))
    }
  };

  const update = async (data: EventsFormDataI) => {
    try {
      const eventDateUtc = new Date(data?.event_date!).toISOString();
      const payload: EventsFormDataI = {
        ...data,
        event_status: isStatusEvent,
        event_date: eventDateUtc
      };
      if (data.ended_at && isStatusEvent === "ONLINE") {
        const endedAtUtc = new Date(data?.ended_at!).toISOString();
        payload.ended_at = endedAtUtc;
      } else {
        payload.ended_at = null;
      }
      if (isPaidEvent) {
        payload.event_price = parseFloat(payload.event_price as unknown as string);
      } else {
        payload.event_price = 0;
        delete payload.currency;
      }
      if (data.image_url && data.image_url[0]) {
        const image_url = await uploadFile(
          accessToken!,
          data.image_url[0] as File
        );
        payload.image_url = image_url;
        if (data.image_url[0] === 'h') {
          payload.image_url = data.image_url
        }
      }
      if (id !== undefined) {
        await updateEvents({ id: id, body: payload }).unwrap();
        toast.success("Updating a event was successful");
        navigate(-1);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      dispatch(setStatusState("OFFLINE"))
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
    reset,
  };
};

export default useUpsertEvents;
