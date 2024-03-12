import {
  BannerList,
  MainBannerReq,
  MainBannerRes,
} from "_interfaces/banner.interface";
import {
  CircleWithdraw,
  WithdrawChangeStatusReq,
} from "_interfaces/circle.interface";
import { Api } from "services/api";

export const bannerApi = Api.injectEndpoints({
  endpoints: (build) => ({
    BannerList: build.query<MainBannerRes, MainBannerReq>({
      query: (param) =>
        `/admin-portal/v1/banner?search=${param.search}&status=${param.status}&type=${param.type}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    changeAdminFee: build.mutation<string, { admin_fee: number; id: string }>({
      query(body) {
        return {
          url: `/admin-portal/v1/circle/admin-fee/${body.id}`,
          method: "PUT",
          body: {
            ...body,
          },
        };
      },
    }),
    changeStatusWithdraw: build.mutation<
      CircleWithdraw,
      WithdrawChangeStatusReq
    >({
      query(body) {
        return {
          url: `/admin-circle/v1/withdraws`,
          method: "PATCH",
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
  useBannerListQuery,
  useChangeAdminFeeMutation,
  useChangeStatusWithdrawMutation,
} = bannerApi;
