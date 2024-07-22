import {
  BannerList,
  ChangeStatusBannerReq,
  CreateBannerReq,
} from "_interfaces/banner.interface";
import {
  BlastPushPayload,
  NotificationListReq,
  NotificationListRes,
  PushNotificationList,
} from "_interfaces/push-notif.interfaces";
import { Api } from "services/api";

export const bannerApi = Api.injectEndpoints({
  endpoints: (build) => ({
    PushNotifList: build.query<NotificationListRes, NotificationListReq>({
      query: (param) =>
        `admin-portal/v1/notif_blast?limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    PushNotifDetail: build.query<PushNotificationList, { id: string }>({
      query: (param) => `/admin-portal/v1/notif_blast/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    changeStatusBanner: build.mutation<string, ChangeStatusBannerReq>({
      query(body) {
        return {
          url: `admin-portal/v1/banner/${body.id}/status`,
          method: "PATCH",
          body: {
            ...body,
          },
        };
      },
    }),
    deleteBanner: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `admin-portal/v1/banner/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    updateBlastPushNotif: build.mutation<
      string,
      { id: string; body: BlastPushPayload }
    >({
      query({ id, body }) {
        return {
          url: `/admin-portal/v1/notif_blast/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    createBlastPushNotif: build.mutation<string, BlastPushPayload>({
      query(body) {
        return {
          url: `/admin-portal/v1/notif_blast/create`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  usePushNotifListQuery,
  useCreateBlastPushNotifMutation,
  useUpdateBlastPushNotifMutation,
  usePushNotifDetailQuery,
} = bannerApi;
