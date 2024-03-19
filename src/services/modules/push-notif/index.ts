import {
  BannerList,
  ChangeStatusBannerReq,
  CreateBannerReq,
} from "_interfaces/banner.interface";
import {
  NotificationListReq,
  NotificationListRes,
} from "_interfaces/push-notif.interfaces";
import { Api } from "services/api";

export const bannerApi = Api.injectEndpoints({
  endpoints: (build) => ({
    PushNotifList: build.query<NotificationListRes, NotificationListReq>({
      query: (param) =>
        `admin-portal/v1/notif_blast?limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    BannerDetail: build.query<BannerList, { id: string }>({
      query: (param) => `admin-portal/v1/banner/${param.id}`,
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
    updateBanner: build.mutation<string, { id: string; body: CreateBannerReq }>(
      {
        query({ id, body }) {
          return {
            url: `admin-portal/v1/banner/${id}`,
            method: "PATCH",
            body,
          };
        },
      }
    ),
    createBanner: build.mutation<string, CreateBannerReq>({
      query(body) {
        return {
          url: `/admin-portal/v1/banner/create`,
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

export const { usePushNotifListQuery } = bannerApi;
