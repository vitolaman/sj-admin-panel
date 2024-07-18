import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "services/modules/file";
import { useState } from "react";
import { useAppSelector } from "store";
import {
  BlastPushFormData,
  BlastPushPayload,
} from "_interfaces/push-notif.interfaces";
import {
  useCreateBlastPushNotifMutation,
  useUpdateBlastPushNotifMutation,
} from "services/modules/push-notif";
import moment from "moment";

const useUpsertBlastPushForm = (id: string | undefined) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createBlastPush] = useCreateBlastPushNotifMutation();
  const [updateBlastPush] = useUpdateBlastPushNotifMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    campaign_name: yup
      .string()
      .required("Notification Name cannot empty")
      .max(50, "Notification Name cannot more than 50 char"),
    notification_title: yup
      .string()
      .required("Notification Title cannot empty")
      .max(50, "Notification Title cannot more than 50 char"),
    notification_body: yup
      .string()
      .required("Notification Body cannot empty")
      .max(250, "Notification Body cannot more than 250 char"),
    notification_image_url: yup.object().required("Please Add Image"),
    type: yup.string().required("Type cannot empty"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    setFocus,
    watch,
    reset,
  } = useForm<BlastPushFormData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      notification_image_url: {
        image_link: "",
        image_url: "",
      },
      campaign_name: "",
      notification_title: "",
      notification_body: "",
      type: "",
      schedule_type: "",
      target_notifications: [],
      date_started_at: "",
      date_ended_at: "",
      recurring_days: [],
      repeat_every: "",
      repeat_intensity: 0,
    },
  });

  const create = async (data: BlastPushFormData) => {
    try {
      setIsLoading(true);
      const payload: BlastPushPayload = {
        ...data,
        notification_image_url: "",
      };
      if (data.notification_image_url.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.notification_image_url.image_link[0] as File
        );
        payload.notification_image_url = banner;
      } else {
        payload.notification_image_url = "";
      }
      if (data.date_started_at === "" || data.date_ended_at === "") {
        payload.date_ended_at = moment(new Date())
          .utc(true)
          .format("YYYY-MM-DD");
        payload.date_started_at = moment(new Date())
          .utc(true)
          .format("YYYY-MM-DD");
      }
      if (data.target_new_user_start) {
        payload.target_new_user_start = moment(data.target_new_user_start)
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_new_user_end) {
        payload.target_new_user_end = moment(data.target_new_user_end)
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_active_play_game_start) {
        payload.target_active_play_game_start = moment(
          data.target_active_play_game_start
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_active_play_game_end) {
        payload.target_active_play_game_end = moment(
          data.target_active_play_game_end
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_last_app_engagement_start) {
        payload.target_last_app_engagement_start = moment(
          data.target_last_app_engagement_start
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_last_app_engagement_end) {
        payload.target_last_app_engagement_end = moment(
          data.target_last_app_engagement_end
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.repeat_intensity) {
        payload.repeat_intensity = Number(payload.repeat_intensity);
      }
      if (data.target_active_play_game_intensity_start) {
        payload.target_active_play_game_intensity_start = Number(
          payload.target_active_play_game_intensity_start
        );
      }
      if (data.target_active_play_game_intensity_end) {
        payload.target_active_play_game_intensity_end = Number(
          payload.target_active_play_game_intensity_end
        );
      }
      if (!Array.isArray(data.target_country)) {
        payload.target_country = [];
      }
      if (!Array.isArray(data.recurring_days)) {
        payload.recurring_days = [];
      }
      await createBlastPush(payload).unwrap();
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data: BlastPushFormData) => {
    try {
      setIsLoading(true);
      const payload: BlastPushPayload = {
        ...data,
        notification_image_url: "",
        target_notifications: data.target_notifications.filter((e) => e),
        target_country: data.target_country === null ? [] : data.target_country,
      };
      if (data.notification_image_url.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.notification_image_url.image_link[0] as File
        );
        payload.notification_image_url = banner;
      }
      if (data.target_new_user_start) {
        payload.target_new_user_start = moment(data.target_new_user_start)
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_new_user_end) {
        payload.target_new_user_end = moment(data.target_new_user_end)
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_active_play_game_start) {
        payload.target_active_play_game_start = moment(
          data.target_active_play_game_start
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_active_play_game_end) {
        payload.target_active_play_game_end = moment(
          data.target_active_play_game_end
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_last_app_engagement_start) {
        payload.target_last_app_engagement_start = moment(
          data.target_last_app_engagement_start
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.target_last_app_engagement_end) {
        payload.target_last_app_engagement_end = moment(
          data.target_last_app_engagement_end
        )
          .utc(true)
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
      if (data.repeat_intensity) {
        payload.repeat_intensity = Number(payload.repeat_intensity);
      }
      if (data.target_active_play_game_intensity_start) {
        payload.target_active_play_game_intensity_start = Number(
          payload.target_active_play_game_intensity_start
        );
      }
      if (data.target_active_play_game_intensity_end) {
        payload.target_active_play_game_intensity_end = Number(
          payload.target_active_play_game_intensity_end
        );
      }
      if (id) {
        await updateBlastPush({ id: id, body: payload }).unwrap();
      }
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpsert = handleSubmit(id ? update : create);

  return {
    handleUpsert,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
    setValue,
    reset,
  };
};

export default useUpsertBlastPushForm;
